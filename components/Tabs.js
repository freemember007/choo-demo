const html = require('choo/html')

function Tabs (props) {

  function jumpTo (path) {
    emitter.emit('pushState', path)
  }

  return html`

    <section class="fixed w-100 bottom-0 bg-gray flex justify-arround gray"
         style="height: 55px" >

         <div class="w-33 pv1 flex flex-column justify-around items-center ${props.currentTab==='/' && 'text-primary'}" onclick=${_=>jumpTo('/')}>
        <i class="icon icon-flag"></i>
        <span class="f7">计划</span>
      </div>

      <div class="w-33 pv1 flex flex-column justify-around items-center ${props.currentTab==='wish' && 'text-primary'}" onclick=${_=>jumpTo('/wish')}>
        <i class="icon icon-bookmark"></i>
        <span class="f7">心愿</span>
      </div>

      <div class="w-33 pv1 flex flex-column justify-around items-center ${props.currentTab==='my' && 'text-primary'}" onclick=${_=>jumpTo('/my')}>
        <i class="icon icon-people"></i>
        <span class="f7">我的</span>
      </div>

    </section>
	`
}

module.exports = Tabs

