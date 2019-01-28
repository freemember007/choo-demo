var root = require('window-or-global')

function store (state, emitter) {
  state.main = {}
  state.about = {a:1}
  state.totalClicks = 0
  console.log(emitter)
  root.emitter = emitter

  emitter.on('DOMContentLoaded', function () {
    emitter.on('clicks:add', function (count) {
      state.totalClicks += count
      emitter.emit(state.events.RENDER)
    })
  })
}

module.exports = store
