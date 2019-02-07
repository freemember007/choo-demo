const html = require('choo/html')

function NavBar (props) {

  function back () {
    emitter.emit('popState')
    history.go(-1)
    }

  return html`

    <section class="van-nav-bar van-hairline--bottom" style=z-index:1>

      ${props.hasBack && html`
        <div class=van-nav-bar__left onclick=${back}>
          <i class="van-icon van-icon-arrow-left van-nav-bar__arrow"></i>
          <span class=van-nav-bar__text>返回</span>
        </div>`}

      <div class="van-nav-bar__title van-ellipsis">
        ${props.title}
      </div>

      <div class=van-nav-bar__right>
        ${props.rightBtn}
      </div>

    </section>
	`
}

module.exports = NavBar

