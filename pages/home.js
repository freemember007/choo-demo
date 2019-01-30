/*
 * 首页
 */
const html = require('choo/html')
const request = require('superagent')
const dayjs = require('dayjs')
const dom = require('dom')

// state
const pageState = {
  count: 0,
  users: '',
}

// actions
function getUsers (){
  return request
    .get('https://localhost:8080/user')
    .then(res => res.text.slice(0,100))
}

// Header
function Header () {
  const today = dayjs().format('YYYY年MM月DD日')

  return html/*syntax:html*/`
    <div class="w-100 pa3 tc f4 bb">
      ${today}
    </div >
    <button class="btn badge" data-badge="8">
      Button
    </button>
  `
}

// 表头
function TableHeader () {
  const dateArr = ['09', '10', '11', '12', '13', '14', '15']
  const weekArr = ['一', '二', '三', '四', '五', '六', '日']
  
  return html/*syntax:html*/`
    <section class="flex ma3">

      <!-- 左边 -->
      <div class="w-10 mr3 ">
        <img class="br-100" src="./assets/avatar.jpg">
      </div>
  
      <!-- 右边 -->
      <div class="w-90 flex flex-column">
        <!-- 星期 -->
        <div class="w-100 flex justify-between">
          ${weekArr.map(week => html/*syntax:html*/`
            <span class="b">
              ${week}
            </span>
          `)}
        </div>
        <!-- 日期 -->
        <div class="w-100 flex justify-between">
          ${dateArr.map(date => html/*syntax:html*/`
            <span class="b">
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
  const habitArr = ['七点起床', '洗脸刷牙', '去学校', '九点上床']

  return html/*syntax:html*/`
    <section class="flex flex-column">

      ${habitArr.map(name => {
        return html/*syntax:html*/`
          <div class="flex ma3">
          
            <!-- 左边 -->
            <div class="w-10 mr3 ">
              <span>${name}</span>
            </div>
        
            <!-- 右部 -->
            <div class="w-90 flex flex-column">
              <!-- 日期 -->
              <div class="w-100 flex justify-between">
                ${[1,2,3,4,5,6,7].map(i => html/*syntax:html*/`
                  <span class="bb pa2">
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
function SomeComponent () {

  if(!pageState.users) getUsers().then(data => {
      pageState.users = data
      emitter.emit('render')
    })

  function handleClick () {
    pageState.count += 1
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
      <p>Number of clicks stored: ${pageState.count}</p>

      <button class="btn btn-primary"onclick=${handleClick}>
        Emit a click event
      </button>

      <a href="/about">关于我们</a>
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
    <section class="flex ">

      <!-- button -->
      <button type="text" onclick=${toggleModalShow} class="btn btn-primary btn-lg btn-block">增加新的计划</button>

      <!-- modal -->
      <div class="modal" id="add-more-modal">
        <a href="#close" class="modal-overlay" aria-label="Close" onclick=${toggleModalShow}></a>
        <div class="modal-container">
          <div class="modal-header">
            <a href="#close" class="btn btn-clear float-right" onclick=${toggleModalShow} aria-label="Close"></a>
            <div class="modal-title h5">Modal title</div>
          </div>
          <div class="modal-body">
            <div class="content">
              <!-- content here -->
            </div>
          </div>
          <div class="modal-footer">
            ...
          </div>
        </div>
      </div>

    </section>
  `
}

// 统计
function Statistics () {

  return html/*syntax:html*/`
    <section class="ma4 ">

      <!-- 花朵 -->
      <div class="flex w-100 pa3 justify-between tc">
        <span class="w-25"> </span>
        <div class="w-25"><img width="50px" height="50px" src="./assets/md-flower.png"/></div>
        <div class="w-25"><img width="50px" height="50px" src="./assets/md-flower-2.png"/></div>
        <div class="w-25"><img width="50px" height="50px" src="./assets/md-flower-3.png"/></div>
      </div>

      <!-- 当日统计 -->
      <div class="flex w-100 pa3 justify-between tc">
        <span class="w-25">当日统计</span>
        <span class="w-25">0</span>
        <span class="w-25">0</span>
        <span class="w-25">0</span>
      </div>

      <!-- 本周统计 -->
      <div class="flex w-100 pa3 justify-between tc">
        <span class="w-25">本周统计</span>
        <span class="w-25">1</span>
        <span class="w-25">1</span>
        <span class="w-25">1</span>
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
      <main class="pa3 cf center">
        ${Header()}
        ${TableHeader()}
        ${SomeComponent()}
        ${TableGrid()}
        ${Statistics()}
        ${AddMoreBtn()}
        ${Footer()}
      </main>
    </body>
  `
}

module.exports = Main
