const css = require('sheetify')
const choo = require('choo')
const root = require('window-or-global')
const reload = require('choo-reload')
//const WebConsole = require('@whinc/web-console')

// const async = require('choo-async') //es6
// require('babel-polyfill')


// css
css('tachyons')
//css('./assets/base.styl')
//css('./node_modules/bootstrap/dist/css/bootstrap.min.css')
css('./node_modules/spectre.css/dist/spectre.css')


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
	  //const webConsole = new WebConsole()
	  //@todo: change alert to toast 
	  window.onerror = (msg, url, line) => {
		//alert(JSON.stringify({msg, url, line})) 
		alert(msg)
	  }
  })
})
root.emitter = app.emitter //@todo: 各页面自己require
// app.use(reload())

// route
app.route('/', require('./pages/home'))
app.route('/about', require('./pages/about'))
app.route('/login', require('./pages/login'))
app.route('/signup', require('./pages/signup'))
app.route('/*', require('./pages/404'))

// mount
module.exports = app.mount('body')
