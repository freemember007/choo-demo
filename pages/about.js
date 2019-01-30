/*
 * 关于
 */

const html = require('choo/html')


function Main () {

  emitter.emit('DOMTitleChange', '关于')

  return html/*syntax:html*/`
    <body>
      <main class="pa3 cf center">
        <p>测试文字1</p>
        <p>测试文字2</p>
        <p>测试文字3</p>
        <a href="/">[回首页]</a>
      </main>
    </body>
  `
}

module.exports = Main