// 登录接口

module.exports = (app) => {
  const assert = require('http-assert');

  app.post('/admin/api/login',async (req,res) => {
    const {name,password} = req.body;
    const model = require('../../models/AdminUser');
  // 1. 查找用户名
    const user = await model.findOne({name}).select("+password"); //返回数据库记录
    // if(!user) return res.status(422).send({message: '用户名不存在'});
    assert(user,422,'用户名不存在');

    // 2. 校验密码
    const isValid = require('bcrypt').compareSync(password,user.password);
    // if(!isValid) return res.status(422).send({message: '密码错误'});
    assert(isValid,422,'密码错误');

    // 3. 校验通过，生成并返回token
    const jwt = require('jsonwebtoken');
    const token = jwt.sign({id: user._id},app.get('secret'));
    res.send(token);
  })

}