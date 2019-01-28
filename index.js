var css = require('sheetify')
var choo = require('choo')
var root = require('window-or-global')

css('tachyons')

var app = choo()
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
} else {
  app.use(require('choo-service-worker')())
}

app.use((state, emitter) => {
  emitter.on('DOMContentLoaded', function () {
    root.emitter = emitter
  })
})

app.route('/', require('./views/main'))
app.route('/about', require('./views/about'))
app.route('/*', require('./views/404'))

module.exports = app.mount('body')
