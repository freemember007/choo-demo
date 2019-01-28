module.exports = store

store.storeName = 'aaa'
function store (state, emitter) {
  emitter.on('DOMContentLoaded', function () {
  })
}