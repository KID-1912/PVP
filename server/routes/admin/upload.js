// 文件上传接口
const auth = require('../../middleWare/auth.js')();

module.exports =  app => {
  const path = require('path');
  const express = require('express');
  const multer = require('multer'); // 上传文件中间件模块

  //获取文件上传目的地路径
  let path_uploads = path.join(__dirname,'../../uploads'); 

  //生成上传操作的中间件处理
  const upload = multer({dest: path_uploads});

  // 'file'是前端post请求中文件数据所在的字段名
  app.use('/admin/api/upload',
    auth,
    upload.single('file'),  //将前端上传的文件保存至/uploads文件夹
    (req,res) => {
    const file = req.file; //multer将上传完成的文件的信息暂存至req
    file.url = `http://xiyitao.top/uploads/${file.filename}`; //添加图片的地址信息
    res.send(file); //返回文件信息
  });
}