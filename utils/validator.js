/**
 * 简单的前端数据验证器
 * @todo: 写成构造函数+数据字典
 */

const equal = (input1, input2, msg) => {
  if(input1 != input2 ){
    alert(msg || '两次输入不一致！') 
    throw 'validator error.'
  } 
}

const notNull = (input, msg) => {
  if(!input){
    alert(msg || '内容不能为空')
    throw 'validator error.'
  }  
}

const match = (input, reg, msg) => {
  if(!reg.test(input)){
    alert(msg || '内容不符合规范') 
    throw 'validator error.' 
  }
}

const validator = {
  equal: equal,
  notNull: notNull,
  match: match,
  // ...
};

export default validator
