/*
 * my
 */

const html = require('choo/html')
const Tabs = require('../components/Tabs')

function Main () {

  emitter.emit('DOMTitleChange', '我的')

  return html/*syntax:html*/`
    <body>
      <main class="pa3 cf center">
        <p>测试文字1</p>
        <p>测试文字2</p>
        <p>测试文字3</p>
        <a href="/">[回首页]</a>
        ${Tabs({ currentTab: 'my'})}
      </main>
    </body>
  `
}

module.exports = Main
