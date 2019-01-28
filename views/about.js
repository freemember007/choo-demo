var html = require('choo/html')

function a (state) {
  state.ccc = [1,2]
  return html`
    <div>
        ${state.ccc}
        ${state.aaaaaaaaa}
        ${state.totalClicks}

    aaa
    </div>
  `
}
function b (state) {
  return html`
    <div>
    bbb
    </div>
  `
}
function view (state) {
  state.about = 999
  return html`
    <body>
    ${state.about}
    ${state.query.id}
    ${a(state)}
    ${b(state)}
    aaa
    </body>
  `
}

module.exports = view