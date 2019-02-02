/*
 * 首页
 */
const html = require('choo/html')
const request = require('../utils/request')
const dayjs = require('dayjs')
const dom = require('dom')
const root = require('window-or-global')
const form2json = require('htmlform2json').default
const validator = require('../utils/validator')

// state
const pageState = {
  count: 0,
  users: '',
  planArr: ['七点起床', '洗脸刷牙', '去学校', '九点上床'],
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
    <div class="w-100 pa3 tc f4 bb b--black-30">
      ${today}
    </div >
<!--     <button class="btn badge" data-badge="8">
      Button
    </button>
 -->  `
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

  return html/*syntax:html*/`
    <section class="">

      ${pageState.planArr.map(name => {
        return html/*syntax:html*/`
          <div class="flex mh2 mv3">
          
            <!-- 左边 -->
            <div class="w-20 mr1" style="font-size: 14px">
              <span>${name}</span>
            </div>
        
            <!-- 右部 -->
            <div class="w-80 flex flex-column">
              <!-- 日期 -->
              <div class="w-100 flex justify-between">
                ${[1,2,3,4,5,6,7].map(i => html/*syntax:html*/`
                  <span class="bb b--black-20 pa2">
                    ${''}
                  </span>
                `)}
              </div>

            </div>
          </div>
        `
      })}
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

  return html/*syntax:html*/`
    <section class="mv3 ">

      <!-- 花朵 -->
      <div class="flex w-100 pa1 justify-between tc">
        <span class="w-25"> </span>
        <div class="w-25"><img width="50px" height="50px" src="./assets/md-flower.png"/></div>
        <div class="w-25"><img width="50px" height="50px" src="./assets/md-flower-2.png"/></div>
        <div class="w-25"><img width="50px" height="50px" src="./assets/md-flower-3.png"/></div>
      </div>

      <!-- 当日统计 -->
      <div class="flex w-100 pa1 justify-between tc">
        <span class="w-25">当日统计</span>
        <span class="w-25">0</span>
        <span class="w-25">0</span>
        <span class="w-25">0</span>
      </div>

      <!-- 本周统计 -->
      <div class="flex w-100 pa1 justify-between tc">
        <span class="w-25">本周统计</span>
        <span class="w-25">1</span>
        <span class="w-25">1</span>
        <span class="w-25">1</span>
      </div>
      
    </section>
  `
}

// 新增计划按钮
function AddMoreBtn () {

  function toggleModalShow (e) {
    e.preventDefault()
    dom('#add-more-modal').toggleClass('active')
  }

  return html/*syntax:html*/`
    <section class="">

      <!-- button -->
      <button type="text" onclick=${toggleModalShow} class="btn btn-primary btn-lg btn-block">增加新的计划</button>
	  ${AddPlanModal({ toggleModalShow })}
    </section>
  `
}

function AddPlanModal (props) {
	function handleAddPlanFormSubmit(){
		const body = form2json(document.querySelector('#add-plan-form'))
		//alert(body['plan-name'])
		validator.notNull(body['plan-name'], '计划名称')
		pageState.planArr.push(body['plan-name'])
		emitter.emit('render')
	}
	return html`	
      <!-- modal -->
	  <section class="modal" id="add-more-modal">
        <a href="#close" class="modal-overlay" aria-label="Close" onclick=${props.toggleModalShow}></a>
        <div class="modal-container">
          <div class="modal-header">
            <a href="#close" class="btn btn-clear float-right" onclick=${props.toggleModalShow} aria-label="Close"></a>
            <div class="modal-title f5">添加新计划</div>
          </div>
          <div class="modal-body">
            <div class="content">
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
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn mr2" onclick=${props.toggleModalShow}>取消</button>
            <button class="btn btn-primary" onclick=${handleAddPlanFormSubmit}>确定</button>
          </div>
        </div>
      </section>
	`
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
      <main class="pa1 cf center">
        ${Header()}
        ${TableHeader()}
        ${TableGrid()}
        ${Statistics()}
        ${AddMoreBtn()}
        ${Footer()}
      </main>
    </body>
  `
}

module.exports = Main
