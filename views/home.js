/*
 * 首页
 */

const html = require('choo/html')
const request = require('superagent')

// state
const pageState = {
  count: 0,
  users: '',
}

// 元件A
function A() {

  typeof window !== 'undefined' && getUsers()

  function getUsers(){
    request.get('https://localhost:8080/about')
     .then(function(res){
        const _users = res.text.slice(0,100)
        pageState.users != _users
        && (pageState.users = _users) //为对象的情况下要深度比较
        && emitter.emit('render') // 不完美，其他小组件更新时每次都会重新请求，要引入async
      })
  }

  function handleClick () {
    pageState.count += 1
    emitter.emit('render') 
  }

  return html/*syntax:html*/`
    <style type="text/css">
      #a {
        padding: 5px;
        margin: 10px;
        font-size: 16px;
      }
    </style>
    <section id="a" class="pa3">
      <h2>4.</h2>
      <p>${pageState.users}</p>
      <a href="/about">关于我们</a>

      <p>Number of clicks stored: ${pageState.count}</p>

      <button class="btn btn-primary dim ph3 ba bw1 pv2 b--black pointer bg-white"
        onclick=${handleClick}>
        Emit a click event
      </button>

      <br><br>
    </section>
  `
}

// 主View
function View (/*globalState*/) {

  console.log('home mounted!') 

  emitter.emit('DOMTitleChange', '首页')

  return html/*syntax:html*/`
    <body class="code lh-copy">
      <main class="pa3 cf center">
        ${A()}
        <a href="/login" class="btn btn-primary block ml3">去登录</a>
      </main>
    </body>
  `
}

module.exports = View
