/*
 * 首页
 */
const html      = require('choo/html')
const request   = require('../utils/request')
const dayjs     = require('dayjs')
const dom       = require('dom')
const root      = require('window-or-global')
const form2json = require('htmlform2json').default
const validator = require('../utils/validator')
const flatten   = require('lodash/fp/flatten')
const Modal     = require('../components/Modal')
const Dialog     = require('../components/Dialog')
const NavBar    = require('../components/NavBar')
const TabBar      = require('../components/TabBar')

// state
const pageState = {
  users: '', //just for test
  planList: [
    {name: '七点起床', scores: [1, 1, 0, -1, 0, 0, 0]},
    {name: '洗脸刷牙', scores: [-1, 0, 0, -1, 0, 0, 1]},
    {name: '去学校',   scores: [0, 0, 1, 0, 0, 0, 0]},
    {name: '九点上床', scores: [0, 0, 0, 1, 1, 0, -1]},
  ],
}

// actions
function getUsers (){
  return request
    .get('user')
    .then(res => res.text.slice(0,100))
}

// Header
function Header () {
  const today = dayjs().format('YYYY年MM月DD日')

  return html/*syntax:html*/`
    <div class="w-100 pa1 tc f4 bb b--black-30">
      ${today}
    </div >
  `
}

// 表头
function TableHeader () {
  const dateArr = ['09', '10', '11', '12', '13', '14', '15']
  const weekArr = ['一', '二', '三', '四', '五', '六', '日']

  return html/*syntax:html*/`
    <section class="flex ma1 mt3">

      <!-- 左边 -->
      <div class="w-20 ">
        <img class="br-100" src="./assets/avatar.jpg">
      </div>

      <!-- 右边 -->
      <div class="w-80 flex flex-column">
        <!-- 星期 -->
        <div class="w-100 flex justify-between">
          ${weekArr.map(week => html/*syntax:html*/`
            <span class="">
              ${week}
            </span>
          `)}
        </div>
        <!-- 日期 -->
        <div class="w-100 flex justify-between">
          ${dateArr.map(date => html/*syntax:html*/`
            <span class="">
              ${date}
            </span>
          `)}
        </div>
      </div>

    </section>
  `
}

// 表格
function TableGrid () {

  const localState = {
    choosedPlanIdx: null,
    choosedDateIdx: null,
    choosedScore: null,
  }

  function score2flower (score) {
    if(score === null || score === undefined) return ' '
    const iconId = score === 1 ? 1 : score === 0 ? 2 : 3
    return html`<img width="24px" height="24px" src="./assets/md-flower-${iconId}.png"/>`
  }

  function handleGridClick(planIdx, dateIdx){
    localState.choosedPlanIdx = planIdx
    localState.choosedDateIdx = dateIdx
  }

  // changeScoreModal
  function changeScoreModal (props) {

    function handleChooseScore (score) {
      localState.choosedScore = score
    }

    function handleChangeScore(){
      pageState.planList[localState.choosedPlanIdx].scores[localState.choosedDateIdx] = localState.choosedScore
      emitter.emit('render')
    }

    const form$ = html`
    <div class="flex justify-between">
      <img width="24px" height="24px" src="./assets/md-flower-1.png" onclick=${() => handleChooseScore(1)}/>
        <img width="24px" height="24px" src="./assets/md-flower-2.png" onclick=${() => handleChooseScore(0)}/>
        <img width="24px" height="24px" src="./assets/md-flower-3.png" onclick=${() => handleChooseScore(-1)}/>
      </div>
    `

    return Modal({
      size:      'sm',
      activeEl:  `.table-grid`,
      title:     '请选择分数',
      contentEl: form$,
      onOk:      handleChangeScore,
    })
  }

  return html/*syntax:html*/`
    <section class="">

      ${pageState.planList.map((plan, planIdx) => {
        return html/*syntax:html*/`
          <div class="flex mh2 mv3">

            <!-- 左边 -->
            <div class="w-20 " style="font-size: 14px">
              <span>${plan.name}</span>
            </div>

            <!-- 右部 -->
            <div class="w-80 flex flex-column">
              <!-- 日期 -->
              <div class="w-100 flex justify-between">
                ${plan.scores.map((score, dateIdx) => html/*syntax:html*/`
                  <span class="table-grid bb b--black-20 " onclick=${_ => handleGridClick(planIdx, dateIdx)}>
                    ${score2flower(score)}
                  </span>
                `)}
              </div>

            </div>
          </div>
        `
      })}
      ${changeScoreModal()}
    </section>
  `
}


// 元件A
const SomeComponent = (_ => {

	let localState = {
		count: 0
	}
	return function SomeComponent () {

	  if(!pageState.users) getUsers().then(data => {
		  pageState.users = data
		  emitter.emit('render')
		})

	  function handleClick () {
		localState.count += 1
		emitter.emit('render')
	  }

	  return html/*syntax:html*/`
		<style type="text/css">
		  .someStyle {
			padding: 5px;
		  }
		</style>

		<section class="pa3">
		  <p>${pageState.users}</p>
		  <p>Number of clicks stored: ${localState.count}</p>

		  <button class="btn btn-primary"onclick=${handleClick}>
			Emit a click event
		  </button>

		  <a href="/about">关于我们</a>
		</section>
	  `
	}

})(root)



// 统计
function Statistics () {

	function scoreWeekCountBy(num) {
		const arr = flatten(pageState.planList.map(i => i.scores))
		return arr.filter(i => i === num).length
	}

	function scoreTodayCountBy(num) {
		const day = new Date().getDay()
		const dayIdx = day === 0 ? 6 : day - 1
		const arr = pageState.planList.map(i => i.scores[dayIdx])
		return arr.filter(i => i === num).length
	}

  return html/*syntax:html*/`
    <section class="mv3 ">

      <!-- 花朵 -->
      <div class="flex w-100 pa1 justify-between tc">
        <span class="w-25"> </span>
        <div class="w-25"><img width="50px" height="50px" src="./assets/md-flower-1.png"/></div>
        <div class="w-25"><img width="50px" height="50px" src="./assets/md-flower-2.png"/></div>
        <div class="w-25"><img width="50px" height="50px" src="./assets/md-flower-3.png"/></div>
      </div>

      <!-- 当日统计 -->
      <div class="flex w-100 pa1 justify-between tc">
        <span class="w-25">当日统计</span>
        <span class="w-25">${scoreTodayCountBy(1)}</span>
        <span class="w-25">${scoreTodayCountBy(0)}</span>
        <span class="w-25">${scoreTodayCountBy(-1)}</span>
      </div>

      <!-- 本周统计 -->
      <div class="flex w-100 pa1 justify-between tc">
        <span class="w-25">本周统计</span>
        <span class="w-25">${scoreWeekCountBy(1)}</span>
        <span class="w-25">${scoreWeekCountBy(0)}</span>
        <span class="w-25">${scoreWeekCountBy(-1)}</span>
      </div>

    </section>
  `
}

// 新增计划按钮
function AddMore () {

  return html/*syntax:html*/`
    <section class="">
      <button type="text" id="show-add-plan-modal-btn" class="btn btn-primary btn-lg btn-block">增加新的计划</button>
	    ${AddPlanModal()}
    </section>
  `
}

function AddPlanModal () {
	function handleAddPlanFormSubmit(){
		const body = form2json(document.querySelector('#add-plan-form'))
		validator.notNull(body['plan-name'], '计划名称')
		pageState.planList.push({ name: body['plan-name'], scores: [0,0,1,1,0,-1,1] })
		emitter.emit('render')
	}

  const form$ = html /*syntax:html*/`
    <form id="add-plan-form" class="form-horizontal">

      <div class="form-group">
        <div class="col-3 col-sm-12">
          <label class="form-label" for="input-example-1">计划名称</label>
        </div>
        <div class="col-9 col-sm-12">
          <input class="form-input" type="text" name="plan-name" placeholder="请输入计划名称">
        </div>
      </div>

      <div class="form-group">
        <div class="col-3 col-sm-12">
          <label class="form-label" for="plan-stime">开始时间</label>
        </div>
        <div class="col-9 col-sm-12">
          <input class="form-input" type="time" step="5" name="plan-stime" placeholder="Name">
        </div>
      </div>

      <div class="form-group">
        <div class="col-3 col-sm-12">
          <label class="form-label" for="plan-etime">结束时间</label>
        </div>
        <div class="col-9 col-sm-12">
          <input class="form-input" type="time" step="5" name="plan-etime" placeholder="Name">
        </div>
      </div>
    </form>
`
  // return Modal({
  //   activeEl:  '#show-add-plan-modal-btn',
  //   title:     '添加新计划',
  //   contentEl: form$,
  //   onOk:      handleAddPlanFormSubmit,
  // })
  return Dialog({
    activeEl:  '#show-add-plan-modal-btn',
    title:     '添加新计划',
    // contentEl: form$,
    onOk:      handleAddPlanFormSubmit,
  })

}

// 脚
function Footer () {

  return html/*syntax:html*/`
    <section class="mt3 tr">
      <a href="/login">去登录</a>
    </section>
  `
}

// 主View
function Main (/*globalState*/) {

  console.log('home mounted!')
  emitter.emit('DOMTitleChange', '首页')

  return html/*syntax:html*/`
    <body class="code lh-copy">
      ${NavBar({ title: '首页'})}
      <main class="pa1 cf center" style="margin-bottom:50px">
        ${Header()}
        ${TableHeader()}
        ${TableGrid()}
        ${Statistics()}
        ${AddMore()}
        ${Footer()}
      </main>
      ${TabBar({ currentTab: 'home'})}
    </body>
  `
}

module.exports = Main
