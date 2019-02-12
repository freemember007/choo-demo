/*
 * my
 */
const html = require('choo/html')
const TabBar = require('../components/TabBar')
const NavBar = require('../components/NavBar')
const CheckBox = require('../components/CheckBox')

const pageState = {
  babies: [{
    name: '芬芬', daysOfLogin:36,  flowerCountToday: 7, coinCount: 8
  }]
}

function Cover () {
  return html`
    <section class="h4 bg-light-blue flex flex-column justify-center items-center">
      <img class="br-100" src="./assets/avatar.jpg">
      <div class="mt1 f7">萧江平</div>
    </section>
  `
}

function BabyList () {
  return html`
    <section>
      <div class="flex justify-between b">
        <span>宝宝档案</span>
        <a>添加</a>
      </div>
      <div class="mt2">
        ${pageState.babies.map(baby => _BabyItem(baby))}
      </div>
    </section>
  `
}

function _BabyItem (baby) {
  return html`
    <section class="mv2 bb b--black-10">

      <div class="flex justify-between gray" style="font-size:12px">
        ${CheckBox({ title: '显示计划', color: '#07c160' })}
        <span>+管理员</span>
      </div>

      <div class="flex justify-between pv1">
        <div class="w-25 flex flex-column justify-center items-center br b--black-10">
          <img width=48 height=48 class="br-100" src="./assets/avatar.jpg">
          <span class="mt1 f7">${baby.name}</span>
        </div>

        <div class="w-25 flex flex-column justify-center items-center">
          <img width=32 height=32 class="br-100" src="./assets/avatar.jpg">
          <div class="mt1 f7">已记录${baby.daysOfLogin}天</div>
        </div>

        <div class="w-25 flex flex-column justify-center items-center">
          <img width=32 height=32 class="br-100" src="./assets/avatar.jpg">
          <div class="mt1 f7">今日获得${baby.flowerCountToday}朵</div>
        </div>

        <div class="w-25 flex flex-column justify-center items-center">
          <img width=32 height=32 class="br-100" src="./assets/avatar.jpg">
          <div class="mt1 f7">剩余${baby.coinCount}个</div>
        </div>
      </div>

    </section>
  `
}

function ActionList () {
  return html`
    <section class="mt2">
      <div class="van-cell van-cell--clickable">
        <div class=van-cell__title><span>操作指南</span></div>
        <i class=" van-icon van-icon-arrow van-cell__right-icon"></i>
      </div>
      <div class="van-cell van-cell--clickable">
        <div class=van-cell__title><span>常见问题</span></div>
        <i class=" van-icon van-icon-arrow van-cell__right-icon"></i>
      </div>
      <div class="van-cell van-cell--clickable">
        <div class=van-cell__title><span>意见反馈</span></div>
        <i class=" van-icon van-icon-arrow van-cell__right-icon"></i>
      </div>
    </section>
  `
}

function Main () {

  emitter.emit('DOMTitleChange', '我的')

  return html/*syntax:html*/`
    <body>
      ${NavBar({title:'我的'})}
      ${Cover()}
      <main class="pa2 cf center" style="margin-bottom:50px">
        ${BabyList()}
        ${ActionList()}
      </main>
      ${TabBar({ currentTab: 'my'})}
    </body>
  `
}

module.exports = Main
