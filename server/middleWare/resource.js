module.exports = () => {
  return (req,res,next) => { 
  //转换子路由从而获取crud的操作模型
    let modelName = require('inflection').classify(req.params.resource); //模型名
    req.Model = require(`../models/${modelName}`); //引入模型
    next();
  }
}