/*
 * 注册
 */

const html = require('choo/html')
const request = require('superagent')
const form2json = require('htmlform2json').default
const validator = require('../utils/validator')

// 头
function Header () {

  return html/*syntax:html*/`
    <section class="container tc">
      <h1>注册</h1>
    </section>
  `
}

// 表单
function RegisterForm () {

  function handleRegisterFormSubmit (e) {
    e.preventDefault()
    const body = form2json(e.target)
    // const body = form2json(document.querySelector('#register'))
    // console.log('body', body)
    validator.match(body.username, /.{4,25}/, '用户名', '限制4-25位英文、数字、下划线')
    validator.notNull(body.password, '密码')
    validator.equal(body.password, body.repassword, '重复密码')
    request
      .post('/register')
      .send(body)
      .then(res => {
        console.log(res)
        emitter.emit('pushState', '/')
      })
  }

  return html/*syntax:html*/`
    <form id="register" onsubmit=${handleRegisterFormSubmit}>
      <div class="form-group">
        <label for="username">用户名</label>
        <input class="form-control" id="username" name="username" placeholder="输入用户名">
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <input type="password" class="form-control" id="password" name="password" placeholder="输入密码">
      </div>
      <div class="form-group">
        <label for="repassword">重复密码</label>
        <input type="password" class="form-control" id="repassword" name="repassword" placeholder="再次输入密码">
      </div>
      <button type="submit" class="btn btn-primary btn-lg btn-block">提交</button>
    </form>
  `
}

// 脚
function Footer () {

  return html/*syntax:html*/`
    <section class="mt3 tr">
      <a href="/login">去登录</a>
    </section>
  `
}

// 主入口
function View () {

  emitter.emit('DOMTitleChange', '注册')

  return html/*syntax:html*/`
    <body>
      <main class="pa3 cf center">
        ${Header()}
        ${RegisterForm()}
        ${Footer()}
      </main>
    </body>
  `
}

module.exports = View