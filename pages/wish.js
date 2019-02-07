/*
 * wish
 */

const html = require('choo/html')
const TabBar = require('../components/TabBar')
const NavBar = require('../components/NavBar')

function Main () {
  emitter.emit('DOMTitleChange', '心愿')

  return html/*syntax:html*/`
    <body>
      ${NavBar({title:'心愿'})}
      <main class="pa1 cf center" style="margin-bottom:50px">
        <p>测试文字1</p>
        <p>测试文字2</p>
        <p>测试文字3</p>
        <a href="/">[回首页]</a>
      </main>
      ${TabBar({ currentTab: 'wish'})}
    </body>
  `
}

module.exports = Main
