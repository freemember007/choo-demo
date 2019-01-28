var root = require('window-or-global')

function store (state, emitter) {

  emitter.on('DOMContentLoaded', function () {
    root.emitter = emitter
  })
}

module.exports = store
