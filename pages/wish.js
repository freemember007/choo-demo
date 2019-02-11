/*
 * wish
 */

const html = require('choo/html')
const TabBar = require('../components/TabBar')
const NavBar = require('../components/NavBar')

const pageState = {
  wishes: [
    {name: '看电视40分钟', cost: 2, },
    {name: '买零食一件', cost: 4, },
    {name: '买玩具一件', cost: 50, },
  ]
}

function _WishItem (wish){
  return html`
    <div class="flex justify-between pv2 bb b--black-10">
      <span class="f6"> ${wish.name}</span>
      <span class="gray">所需金币:${wish.cost}</span>
    </div>
  `
}

function WishList(){
  return html`
    <section class="mh1 mb2">
      ${pageState.wishes.map(wish => _WishItem(wish))}
    </section>
  `
}

function AddWishBtn () {
  return html`
    <button class="van-button van-button--primary van-button--large">
      <span class=van-button__text>添加心愿</span>
    </button>
  `
}

function Main () {
  emitter.emit('DOMTitleChange', '心愿')

  return html`
    <body>
      ${NavBar({title:'心愿'})}
      <main class="pa1 cf center" style="margin-bottom:50px">
        ${WishList()}
        ${AddWishBtn()}
      </main>
      ${TabBar({ currentTab: 'wish'})}
    </body>
  `
}

module.exports = Main
