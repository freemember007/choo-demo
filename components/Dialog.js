const html = require('choo/html')
const ready = require('document-ready')
const dom = require('dom')

function Dialog (props = {}) {
  // generate random id for modal
  const randomId = Math.random().toString().slice(2,9)

  // toggle modal show
  function toggleModalShow (e) {
    e.preventDefault()
    dom(`#modal-${randomId}`).toggleClass('dn')
  }

  // bind activeEl
  typeof window != undefined && ready(_ => {
    dom(props.activeEl).on('click',toggleModalShow)
  })


  return html/*syntax:html*/`
    <section id="modal-${randomId}" class="dn">

      <!-- dialog -->
      <div class="van-dialog" style="z-index: 2037;">

        <!-- title -->
        <div class="van-dialog__header">${props.title}</div>

        <!-- content -->
        <div class="van-dialog__content">

          <div class="van-dialog__message van-dialog__message--has-title">
            <!-- 有赞是一家零售科技公司，致力于成为商家服务领域里最被信任的引领者 -->
          </div>
          <form id="add-plan-form" class="form-horizontal">
            <div class="van-cell van-field">
              <div class="van-cell__title van-field__label"><span>计划名称</span></div>
              <div class="van-cell__value">
                <div class="van-field__body">
                  <input type="text" name="plan-name" placeholder="请输入计划名称" class="van-field__control">
                </div>
              </div>
            </div>
            <div class="van-cell van-field">
              <div class="van-cell__title van-field__label"><span>开始时间</span></div>
              <div class="van-cell__value">
                <div class="van-field__body">
                  <input type="time" name="plan-stime" placeholder="请输入开始时间" class="van-field__control">
                </div>
              </div>
            </div>
            <div class="van-cell van-field">
              <div class="van-cell__title van-field__label"><span>结束时间</span></div>
              <div class="van-cell__value">
                <div class="van-field__body">
                  <input type="time" name="plan-etime" placeholder="请输入结束时间" class="van-field__control">
                </div>
              </div>
            </div>
          </form>
          ${props.contentEl}
        </div>

        <!-- bottom -->
        <div class="van-hairline--top van-dialog__footer van-dialog__footer--buttons">
          <button class="van-button van-button--default van-button--large van-dialog__cancel" onclick=${toggleModalShow}><span class="van-button__text" >取消</span></button>
          <button class="van-button van-button--default van-button--large van-dialog__confirm van-hairline--left" onclick=${props.onOk}><span class="van-button__text" >确认</span></button>
        </div>

      </div>

      <!-- mask -->
      <div class="van-overlay" onclick=${toggleModalShow} style="z-index: 2036;"></div>
    </section>
  `
}

module.exports = Dialog
