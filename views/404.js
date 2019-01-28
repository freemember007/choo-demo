var html = require('choo/html')


function view (state) {

  var TITLE = 'choo-demo - route not found'
  if (state.title !== TITLE) emitter.emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body class="sans-serif pa3">
      <h1>Route not found.</h1>
      <a class="pt2" href="/">Back to main.</a>
    </body>
  `
}

module.exports = view
