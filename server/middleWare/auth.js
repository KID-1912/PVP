module.exports = (options) => {
  const assert = require('http-assert');
  return async (req,res,next) => {
    // 1. 获取token
    const token = String((req.headers.authorization || '')).split(' ').pop();
    assert(token,401,"没有token值");
    
    // 2. 转换token并检验
    const model = require('../models/AdminUser');
    const jwt = require('jsonwebtoken');
    let json;
    try{
      json = jwt.verify(token,req.app.get('secret'));   
    } catch(e){
      assert(false,401,'无效token');
    }
    
    // 3. 查找用户id
    const user = await model.findById(json.id);
    assert(user,401,'用户不存在');
    next();
  }
}