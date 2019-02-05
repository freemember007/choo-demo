const html = require('choo/html')
const ready = require('document-ready')
const dom = require('dom')

function Modal (props) {
  // generate random id for modal
  const randomId = Math.random().toString().slice(2,9)

  // toggle modal show
  function toggleModalShow (e) {
    e.preventDefault()
    dom(`#modal-${randomId}`).toggleClass('active')
  }

  // bind activeEl
  typeof window != undefined && ready(_ => {
    dom(props.activeEl).on('click',toggleModalShow)
  })

  return html`
    <section class="modal modal-${props.size}" id="modal-${randomId}">

      <!-- mask -->
      <a href="javascript:" class="modal-overlay" aria-label="Close" onclick=${toggleModalShow}></a>

      <!-- container -->
      <div class="modal-container">

        <!-- header -->
        <div class="modal-header">
          <a href="#close" class="btn btn-clear float-right" onclick=${toggleModalShow} aria-label="Close"></a>
          <div class="modal-title f5">${props.title}</div>
        </div>


        <!-- body -->
        <div class="modal-body">
          <div class="content">
            ${props.contentEl}
          </div>
        </div>

        <!-- footer -->
        <div class="modal-footer">
          <button class="btn mr2" onclick=${toggleModalShow}>取消</button>
          <button class="btn btn-primary" onclick=${props.onOk}>确定</button>
        </div>
      </div>
    </section>
	`
}

module.exports = Modal

