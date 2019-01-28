const html = require('choo/html')
const ready = require('document-ready')
const agent = require('superagent')

function a (state) {
  state.home_count = state.home_count || 100

  function getText(){
    console.log('onload')
    agent.get('https://localhost:8080/about')
     .then(function(res){
        // console.log(res.text)
        state.home_text = res.text
        emitter.emit(state.events.RENDER) 
      })
  }

  function handleClick () {
    state.home_count += 1
    emitter.emit(state.events.RENDER) 
  }

  return html`
    <section onload=${getText()} id="a" class="fl mw6 w-50-m w-third-l pa3">
      <h2>4.</h2>
      <p>${state.home_text}</p>
      <a href="/about">关于我们</a>

      <p>Number of clicks stored: ${state.home_count}</p>

      <button class="dim ph3 ba bw1 pv2 b--black pointer bg-white"
        onclick=${handleClick}>
        Emit a click event
      </button>

      <br><br>
    </section>
  `
}

function view (state) {
  // 类似mounted事件
  window && ready(()=> {
    console.log('home mounted!') 
  })

  var TITLE = 'choo-demo - main2'
  if (state.title !== TITLE) emitter.emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body class="code lh-copy">
      <main class="pa3 cf center">
        ${a(state)}
      </main>
    </body>
  `
}

module.exports = view
