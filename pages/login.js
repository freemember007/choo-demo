/*
 * 登录
 */

const html = require('choo/html')
const request = require('superagent')
const form2json = require('htmlform2json').default
const validator = require('../utils/validator')


// 头
function Header () {

  return html/*syntax:html*/`
    <section class="container tc">
      <h1>登录</h1>
    </section>
  `
}

// 表单
function LoignForm () {

  function handleLoginFormSubmit (e) {
    e.preventDefault()
    const body = form2json(e.target)
    // const body = form2json(document.querySelector('#login'))
    // console.log('body', body)
    validator.notNull(body.username, '用户名')
    validator.notNull(body.password, '密码')
    request
      .post('/some-api')
      .send(body)
      .then(res => {
        console.log(res)
        emitter.emit('pushState', '/')
      })
  }

  return html/*syntax:html*/`
    <form id="login" onsubmit=${handleLoginFormSubmit}>
      <div class="form-group">
        <label class="form-label" for="username">用户名</label>
        <input class="form-input form-control" id="username" name="username" placeholder="输入用户名">
      </div>
      <div class="form-group">
        <label class="form-label" for="password">密码</label>
        <input type="password" class="form-input form-control" id="password" name="password" placeholder="输入密码">
      </div>
      <button type="submit" class="btn btn-primary btn-lg btn-block">提交</button>
    </form>
  `
}


// 脚
function Footer () {

  return html/*syntax:html*/`
    <section class="mt3 tr">
      <a href="/register">去注册</a>
    </section>
  `
}


// 主入口
function Main (/*globalState*/) {

  emitter.emit('DOMTitleChange', '登录')

  return html/*syntax:html*/`
    <body>
      <main class="pa3 cf center">
        ${Header()}
        ${LoignForm()}
        ${Footer()}
      </main>
    </body>
  `
}

module.exports = Main