var html = require('choo/html')
var ready = require('document-ready')

function a (state) {
  state.home_count = state.home_count || 100

  function handleClick () {
    state.home_count += 1
    emitter.emit(state.events.RENDER) 
  }

  return html`
    <section id="a" class="fl mw6 w-50-m w-third-l pa3">
      <h2>4.</h2>

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
  ready(()=> {
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
