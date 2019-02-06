/*
 * my
 */

const html = require('choo/html')
const Tabs = require('../components/Tabs')

function Main () {

  emitter.emit('DOMTitleChange', '愿望')

  return html/*syntax:html*/`
    <body>
      <main class="pa3 cf center">
        <p>测试文字1</p>
        <p>测试文字2</p>
        <p>测试文字3</p>
        <a href="/">[回首页]</a>
      </main>
      ${Tabs({ currentTab: 'wish'})}
    </body>
  `
}

module.exports = Main
