/*
 * my
 */
const html = require('choo/html')
const Tabs = require('../components/Tabs')
const NavBar = require('../components/NavBar')

function Main () {

  emitter.emit('DOMTitleChange', '我的')

  return html/*syntax:html*/`
    <body>
      ${NavBar()}
      <main class="pa1 cf center" style="margin:55px 0">
        <p>测试文字1</p>
        <p>测试文字2</p>
        <p>测试文字3</p>
        <a href="/">[回首页]</a>
      </main>
      ${Tabs({ currentTab: 'my'})}
    </body>
  `
}

module.exports = Main
