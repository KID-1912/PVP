// 监听app,当admin/api接口assert报错，
// 对错误信息转为数据响应给admin前端

module.exports = (app) => {
  app.use(async (err,req,res,next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    });
  })
}