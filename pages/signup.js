/*
 * 注册
 */
const html = require('choo/html')
const request = require('../utils/request')
const form2json = require('htmlform2json').default
const validator = require('../utils/validator')
const isLoading = require('is-loading')

// 头
function Header () {

  return html/*syntax:html*/`
    <section class="container tc">
      <h1>注册</h1>
    </section>
  `
}

// 表单
function SignupForm () {

  function handleSignupFormSubmit (e) {
    e.preventDefault()

    // 验证
    const body = form2json(document.querySelector('#signup-form'))
    // const body = form2json(e.target) //or
    validator.match(body.username, /.{4,25}/, '用户名', '限制4-25位英文、数字、下划线')
    validator.notNull(body.password, '密码')
    validator.equal(body.password, body.repassword, '重复密码')

    // 提交中...
    const button$ = document.querySelector('#signup-button')
    const loader$ = isLoading(button$, { 
      text: '提交中...',
      disableList: [document.querySelector('#username')] //@todo: 一次选取多个
    })
    loader$.loading()
    setTimeout(_ => loader$.remove(), 1000)

    // 提交
    request
      .post('signup')
      .send(body)
      .then(res => {
        console.log(res)
        setTimeout(_ => emitter.emit('pushState', '/'), 1000)
      })
  }

  return html/*syntax:html*/`
    <form id="signup-form" onsubmit=${handleSignupFormSubmit}>
      <div class="form-group">
        <label class="form-label" for="username">用户名</label>
        <input class="form-input form-control" id="username" name="username" placeholder="输入用户名">
      </div>
      <div class="form-group">
        <label class="form-label" for="password">密码</label>
        <input type="password" class="form-input form-control" id="password" name="password" placeholder="输入密码">
      </div>
      <div class="form-group">
        <label class="form-label" for="repassword">重复密码</label>
        <input type="password" class="form-input form-control" id="repassword" name="repassword" placeholder="再次输入密码">
      </div>
   <button type="submit" id="signup-button"class="btn btn-primary btn-lg btn-block">提交</button>
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
function Main () {

  emitter.emit('DOMTitleChange', '注册')

  return html/*syntax:html*/`
    <body>
      <main class="pa3 cf center">
        ${Header()}
        ${SignupForm()}
        ${Footer()}
      </main>
    </body>
  `
}

module.exports = Main