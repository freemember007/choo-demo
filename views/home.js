const html = require('choo/html')
const ready = require('document-ready')
const agent = require('superagent')

// state
const pageState = {
  count: 0,
  users: '',
}

// 元件A
function A(globalState) {

  typeof window !== 'undefined' && ready(()=> {
    getText()
  })

  function getText(){
    agent.get('https://localhost:8080/about')
     .then(function(res){
        const _user = res.text.slice(0,100)
        pageState.users != _user
        && (pageState.users = _user)
        && emitter.emit(globalState.events.RENDER) // 不完美，其他小组件更新时每次都会重新请求，要引入async
      })
  }

  function handleClick () {
    pageState.count += 1
    emitter.emit(globalState.events.RENDER) 
  }

  return html`
    <section id="a" class="fl mw6 w-50-m w-third-l pa3">
      <h2>4.</h2>
      <p>${pageState.users}</p>
      <a href="/about">关于我们</a>

      <p>Number of clicks stored: ${pageState.count}</p>

      <button class="dim ph3 ba bw1 pv2 b--black pointer bg-white"
        onclick=${handleClick}>
        Emit a click event
      </button>

      <br><br>
    </section>
  `
}

// 主View
function View (globalState) {
  // 类似mounted事件
  typeof window !== 'undefined' && ready(()=> {
    console.log('home mounted!') 
  })

  var TITLE = 'choo-demo - main2'
  if (globalState.title !== TITLE) emitter.emit(globalState.events.DOMTITLECHANGE, TITLE)

  return html`
    <body class="code lh-copy">
      <main class="pa3 cf center">
        ${A(globalState)}
      </main>
    </body>
  `
}

module.exports = View
