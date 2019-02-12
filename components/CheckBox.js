const html = require('choo/html')

function CheckBox (props) {

  return html`

    <div class=van-checkbox>
      <div class="van-checkbox__icon van-checkbox__icon--round van-checkbox__icon--checked">
        <i class="van-icon van-icon-success" style="border-color:${props.color};background-color:${props.color}"></i>
      </div>
      <span class=van-checkbox__label>${props.title}</span>
    </div>
	`
}

module.exports = CheckBox

