const html = require('choo/html')
const ready = require('document-ready')
const request = require('superagent')
const form2json = require('htmlform2json').default
const validator = require('../utils/validator').default


// 头
function Header () {

  return html`
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
    validator.notNull(body.username)
    validator.notNull(body.password)
    request
      .post('/some-api')
      .send(body)
      .then(res => {
        console.log(res)
        emitter.emit('pushState', '/')
      })
  }

  return html`
    <form id="login" onsubmit=${handleLoginFormSubmit}>
      <div class="form-group">
        <label for="username">用户名</label>
        <input class="form-control" id="username" name="username" placeholder="输入用户名">
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <input type="password" class="form-control" id="password" name="password" placeholder="输入密码">
      </div>
      <button type="submit" class="btn btn-primary btn-lg btn-block">提交</button>
    </form>
  `
}


// 主入口
function View (globalState) {

  // 类似mounted事件
  typeof window !== 'undefined' && ready(()=> {
    console.log('about mounted!') 
  })

  return html`
    <body>
      <main class="pa3 cf center">
        ${Header()}
        ${LoignForm()}
      </main>
    </body>
  `
}

module.exports = View