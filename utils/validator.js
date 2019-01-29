/**
 * 简单的前端数据验证器, 先trim掉左右空白
 * 后续优化可参考：https://github.com/chriso/validator.js
 */

// 低级方法，自己写也可，但懒得维护，直接用现成
// const trim = input => (input || '').replace(/^[　\s]+/g, '').replace(/[　\s]+$/g, '')
const { trim } = require('lodash/fp')

const equal = (input1, input2, name, msg) => {
  const _input1 = trim(input1)
  const _input2 = trim(input2)
  const _msg = msg ? ('，' + msg) : ''
  if(!_input1 || !_input2){
    alert(name + '不能为空' + _msg )
    throw 'validator error.'
  }
  if(_input1 != _input2 ){
    alert(name + '两次输入不一致' + _msg ) 
    throw 'validator error.'
  } 
}

const notNull = (input, name, msg) => {
  const _input = trim(input)
  const _msg = msg ? ('，' + msg) : ''
  if(!_input){
    alert(name + '不能为空' + _msg )
    throw 'validator error.'
  }  
}

const match = (input, reg, name, msg) => {
  const _input = trim(input)
  const _msg = msg ? ('，' + msg) : ''
  if(!_input){
    alert(name + '不能为空' + _msg )
    throw 'validator error.'
  }  
  if(!reg.test(_input)){
    alert(name + '不符合规则' + _msg ) 
    throw 'validator error.' 
  }
}

const validator = {
  equal: equal,
  notNull: notNull,
  match: match,
  // ...
};

module.exports = validator
