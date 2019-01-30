/**
 * superagent
 */
const request = require('superagent-use')(require('superagent'))
const isLoading = require('is-loading')

request
  /**
   * 请求改写
   */
  .use(request => {
    request.url = 'https://localhost:8080/' + request.url
    return request
  })

  // on request
  .use(request => {
    request.on('request', request => {
      isLoading({type: 'overlay'}).loading() //似乎没作用
    })
  })

  /**
   * on response
   */
  .use(request => {
    request.on('response', response => {
      // isLoading().remove()
      return response
    })
  })

module.exports = request
