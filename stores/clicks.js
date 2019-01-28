module.exports = store

function store (state, emitter) {
  state.main = {}
  state.about = {a:1}
  state.totalClicks = 0
  console.log(emitter)

  emitter.on('DOMContentLoaded', function () {
    emitter.on('clicks:add', function (count) {
      state.totalClicks += count
      emitter.emit(state.events.RENDER)
    })
  })
}
