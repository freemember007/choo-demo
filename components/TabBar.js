const html = require('choo/html')

function TabBar () {
  return html`
    <div class="van-hairline--top-bottom van-tabbar van-tabbar--fixed" style=z-index:1>
      <div class="van-tabbar-item van-tabbar-item--active">
        <div class=van-tabbar-item__icon>
          <i class="van-icon van-icon-home-o"></i>
        </div>
        <div class=van-tabbar-item__text>
          标签
        </div>
      </div>

      <div class=van-tabbar-item>
        <div class="van-tabbar-item__icon van-tabbar-item__icon--dot">
          <i class="van-icon van-icon-search"></i>
        </div>
        <div class=van-tabbar-item__text>
          标签
        </div>
      </div>

      <div class=van-tabbar-item>
        <div class="van-tabbar-item__icon">
          <i class="van-icon van-icon-friends-o"></i>
          <div class="van-info">5</div>
        </div>
        <div class=van-tabbar-item__text>
          标签
        </div>
      </div>

      <div class=van-tabbar-item>
        <div class="van-tabbar-item__icon van-tabbar-item__icon--dot">
          <i class="van-icon van-icon-setting-o"></i>
        </div>
        <div class=van-tabbar-item__text>
          标签
        </div>
      </div>

    </div>
  `
}

module.exports = TabBar
