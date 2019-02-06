const html = require('choo/html')

function NavBar (props) {

  function back () {
    emitter.emit('popState')
    history.go(-1)
    }

  return html`

   <section class="fixed w-100 top-0 bg-gray flex items-center" style="height: 55px" >
     <div class="w-20 pa3" onclick=${back}>
        ${props.hasBack && html`<i class="icon icon-back f1"></i>`}
      </div>

      <div class="w-60 tc f4">
        ${props.title}
      </div>

      <div class="w-20">
      </div>

    </section>
	`
}

module.exports = NavBar

