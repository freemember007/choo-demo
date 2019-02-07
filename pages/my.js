/*
 * my
 */
const html = require('choo/html')
const TabBar = require('../components/TabBar')
const NavBar = require('../components/NavBar')

function Main () {

  emitter.emit('DOMTitleChange', '我的')

  return html/*syntax:html*/`
    <body>
      ${NavBar({title:'我的'})}
      <main class="pa1 cf center" style="margin-bottom:50px">
        <p>测试文字1</p>
        <p>测试文字2</p>
        <p>测试文字3</p>
        <a href="/">[回首页]</a>
      </main>
      ${TabBar({ currentTab: 'my'})}
    </body>
  `
}

module.exports = Main
