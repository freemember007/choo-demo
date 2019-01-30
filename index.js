const css = require('sheetify')
const choo = require('choo')
const root = require('window-or-global')
const reload = require('choo-reload')
// const async = require('choo-async') //es6
// require('babel-polyfill')


// css
css('tachyons')
css('./node_modules/bootstrap/dist/css/bootstrap.min.css')


const app = choo()

// 开发工具
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
} else {
  app.use(require('choo-service-worker')())
}

// wrapper
app.use((globalState, emitter) => {
  globalState.someAttr = 'someAttr' 
  emitter.on('DOMContentLoaded', function () {
  })
})
root.emitter = app.emitter //@todo: 各页面自己require

// app.use(reload())

// route
app.route('/', require('./views/home'))
app.route('/about', require('./views/about'))
app.route('/login', require('./views/login'))
app.route('/register', require('./views/register'))
app.route('/*', require('./views/404'))

// mount
module.exports = app.mount('body')
