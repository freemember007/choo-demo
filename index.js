var css = require('sheetify')
var choo = require('choo')
var root = require('window-or-global')
// const async = require('choo-async') //es6

css('tachyons')
css('bootstrap')

var app = choo()

if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
} else {
  app.use(require('choo-service-worker')())
}
app.use(require('choo-asyncify'))
app.use(require('choo-reload')())
app.use((state, emitter) => {
  state.global_attr1 = 'global_attr1'
  root.emitter = emitter
  emitter.on('DOMContentLoaded', function () {
  })
})

app.use(require('./views/home').store)
app.route('/', require('./views/home').view)
app.route('/about', require('./views/about'))
app.route('/*', require('./views/404'))

module.exports = app.mount('body')
