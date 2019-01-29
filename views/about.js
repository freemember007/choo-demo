const html = require('choo/html')
const ready = require('document-ready')

function a (state) {
  state.about_attr1 = 'attr1'
  return html`
    <section class="mw6 w-50-m w-third-l pa3">
      <div> 
        ${state.about_attr1}
      </div>
      <a class="" href="/">回首页 ${state.n}</a>
    </section>
  `
}
function b (state) {
  state.about_attr2 = 'attr2'
  return html`
    <section class="mw6 w-50-m w-third-l pa3">
      ${state.about_attr2}
    </section>
  `
}

function view (state) {
  // 类似mounted事件
  typeof window !== 'undefined' && ready(()=> {
    console.log('about mounted!') 
  })

  return html`
    <body>
      <main class="pa3 cf center">
        ${a(state)}
        ${b(state)}
      </main>
    </body>
  `
}

module.exports = view