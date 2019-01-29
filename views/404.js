const html = require('choo/html')


function view () {

  emitter.emit('DOMTitleChange', '404')

  return html/*syntax:html*/`
    <body class="sans-serif pa3">
      <h1>Route not found.</h1>
      <a class="pt2" href="/">Back to main.</a>
    </body>
  `
}

module.exports = view



