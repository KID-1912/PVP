// 此文件为后台admin请求通用接口

module.exports = app => {
  const assert = require('http-assert');
  const express = require('express');
  const router = express.Router({ //获取内置路由中间件
    // mergeParams: true //合并:resource和:id参数至res.params，否则只能获取一个
  });

  // admin各个子路由的通用crud处理
  // 添加记录
  router.post('/',async (req,res) => {
    const model = await req.Model.create(req.body); //Category模型添加新值
    res.send(model);
  });

  //删除指定参数id的记录
  router.delete('/:id',async (req,res) => {
    const model = await req.Model.findByIdAndDelete(req.params.id);
    res.send(model);
  })

  //修改指定参数id的记录
  router.put('/:id',async (req,res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id,req.body);
    res.send(model);
  })

  // 查询指定模型所有记录
  router.get('/',async (req,res) => {
    let queryOptions = {};
    if(req.Model.modelName == 'Category'){
      queryOptions.populate = 'parent'; 
    }else if(req.Model.modelName == 'Article' || req.Model.modelName == 'Video'){
      queryOptions.populate = 'category'; 
    }
    const items = await req.Model.find().setOptions(queryOptions);
    res.send(items);
  })

  // 查询指定参数id的记录
  router.get('/:id',async (req,res) => {
    const item = await req.Model.findById(req.params.id);
    res.send(item);   
  })

  // 验证token中间件和路径转resource中间件
  const auth = require('../../middleWare/auth.js')();
  const resource = require('../../middleWare/resource.js')();

  // 一级路由处理
  app.use('/admin/api/reset/:resource',auth,resource,router);// 路径为/admin/api时，所有请求方式都会应用此中间件

}
  
