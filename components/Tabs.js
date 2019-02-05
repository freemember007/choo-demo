const html = require('choo/html')

function Tabs (props) {

  function jumpTo (pageName) {
    //location.href.hash = ...
    history.pushState(null, null, pageName === 'plan' ? '/' : '/' + pageName)
  }

  return html`

    <style type="text/css">
      a:link a:active a:hover a:visited {
        color: gray;
        text-decoration: none;
      }
    </style>

    <section class="tabs fixed w-100 bottom-0 bg-gray flex justify-arround gray"
         style="height: 55px" >

      <a href='/' class="w-33 pv1 flex flex-column justify-around items-center ${props.currentTab==='plan' && 'text-primary' || 'gray'}">
        <i class="icon icon-flag"></i>
        <span class="f7">计划</span>
      </a>

      <a href='/wish' class="w-33 pv1 flex flex-column justify-around items-center ${props.currentTab==='wish' && 'text-primary'}">
        <i class="icon icon-bookmark"></i>
        <span class="f7">心愿</span>
      </a>

      <a href='/my' class="w-33 pv1 flex flex-column justify-around items-center ${props.currentTab==='my' && 'text-primary'}" >
        <i class="icon icon-people"></i>
        <span class="f7">我的</span>
      </a>

    </section>
	`
}

module.exports = Tabs

