/*
 * 登录
 */

const html = require('choo/html')
const request = require('superagent')
const form2json = require('htmlform2json').default
const validator = require('../utils/validator')
const isLoading = require('is-loading')
const dom = require('dom')
const NavBar = require('../components/NavBar')


// 表单
function LoignForm () {

  function handleLoginFormSubmit (e) {
    e.preventDefault()
    const body = form2json(e.target)

    // 验证
    validator.notNull(body.username, '用户名')
    validator.notNull(body.password, '密码')

    // 提交中...
    const button$ = document.querySelector('#login-button')
    const loader$ = isLoading(button$, {
      text: '提交中...',
      disableList: [
        document.querySelector('#username'),
        document.querySelector('#password')
      ] //@todo: 一次选取多个
    })
    loader$.loading()
    setTimeout(_ => loader$.remove(), 1000)

    // 提交
    request
      .post('/some-api')
      .send(body)
      .then(res => {
        console.log(res)
        setTimeout(_ => emitter.emit('pushState', '/'), 1000)
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
      <button type="submit" id="login-button" class="btn btn-primary btn-lg btn-block">提交</button>
    </form>
  `
}


// 脚
function Footer () {

  return html/*syntax:html*/`
    <section class="mt3 tr">
      <a href="/signup">去注册</a>
    </section>
  `
}


// 主入口
function Main (/*globalState*/) {

  emitter.emit('DOMTitleChange', '登录')

  return html/*syntax:html*/`
    <body>
      ${NavBar({ title: '登录', hasBack: true})}
      <main class="pa3 cf center" style="margin:55px 0">
        ${LoignForm()}
        ${Footer()}
      </main>
    </body>
  `
}

module.exports = Main
