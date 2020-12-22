const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// 给app对象添加全局变量secret保存token密钥
app.set('secret','page');

// post参数处理
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//跨域处理
app.use(require('cors')());


//mongoDB数据库连接
require('./plugins/db.js')(app);

// 路由
  //静态资源托管
  //uploads上传图片资源
  app.use('/',express.static(path.join(__dirname,"./web")));
  app.use('/uploads',express.static(path.join(__dirname,"./uploads")));
  //admin静态资源
  app.use('/admin',express.static(path.join(__dirname,"./admin")));

  // admin通用增删改查路由
  require('./routes/admin')(app);
  // admin上传文件路由
  require('./routes/admin/upload')(app);
  // admin登录路由
  require('./routes/admin/login')(app);

  //web请求数据路由
  require('./routes/web')(app);

// 服务端错误信息响应
  require('./routes/admin/error')(app);






app.listen('3000',function(){
  console.log('server is running');
})