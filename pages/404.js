const html = require('choo/html')


function Main () {

  emitter.emit('DOMTitleChange', '404')

  return html`
    <body class="sans-serif pa3">
      <h1>Route not found.</h1>
      <a class="pt2" href="/">Back to main.</a>
    </body>
  `
}

module.exports = Main



