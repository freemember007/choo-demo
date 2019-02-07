/*
 * TabBar
 */
const html = require('choo/html')

function TabBar (props) {

  function jumpTo (path) {
    emitter.emit('pushState', path)
  }

  return html`
    <div class="van-hairline--top-bottom van-tabbar van-tabbar--fixed" style=z-index:1 >
      <div class="van-tabbar-item ${props.currentTab==='home' && 'van-tabbar-item--active'}" onclick=${_=>jumpTo('/')}>
        <div class=van-tabbar-item__icon>
          <i class="van-icon van-icon-home-o"></i>
        </div>
        <div class="van-tabbar-item__text">
          首页
        </div>
      </div>

      <div class="van-tabbar-item ${props.currentTab==='wish' && 'van-tabbar-item--active'}" onclick=${_=>jumpTo('/wish')}>
        <div class="van-tabbar-item__icon van-tabbar-item__icon--dot">
          <i class="van-icon van-icon-like-o"></i>
        </div>
        <div class="van-tabbar-item__text">
          心愿
        </div>
      </div>

      <div class="van-tabbar-item ${props.currentTab==='my' && 'van-tabbar-item--active'}" onclick=${_=>jumpTo('/my')}>
        <div class="van-tabbar-item__icon">
          <i class="van-icon van-icon-user-o"></i>
          <div class="van-info">5</div>
        </div>
        <div class="van-tabbar-item__text">
          我的
        </div>
      </div>

    </div>
  `
}

module.exports = TabBar
