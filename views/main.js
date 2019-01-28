var html = require('choo/html')


function aaa (state) {

  state.totalClicks = state.totalClicks || 100

  function handleClick () {
    state.totalClicks += 1
    emitter.emit(state.events.RENDER) 
  }

  return html`

        <section class="fl mw6 w-50-m w-third-l pa3">
          <h2>4.</h2>

          <p>
            So far we've provided you with one base view, 
            <a href="/oh-no">one fallback view</a>,
             and one store. This serves
            as an example. A place to start from. It's your project now, so
            go ahead and delete them once you know how they work.
          </p>

          <p>Number of clicks stored: ${state.totalClicks}</p>

          <button class="dim ph3 ba bw1 pv2 b--black pointer bg-white"
            onclick=${handleClick}>
            Emit a click event
          </button>

          <br><br>
        </section>
  `

}


function view (state) {

  var TITLE = 'choo-demo - main2'

  if (state.title !== TITLE) emitter.emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
        <body class="code lh-copy">
          <main class="pa3 cf center">
          ${aaa(state)}
          bbb
          </main>
        </body>
  `
}

module.exports = view
