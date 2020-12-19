const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {type: String},
  parent: {type: mongoose.SchemaTypes.ObjectId,ref: "Category"}
})

// 配合populate快速联表查询的虚拟字段
// schema.virtual('children', {  //定义名为children的虚拟字段，值为Category下parent为当前id的记录数组
//   localField: '_id',
//   foreignField: 'parent',
//   justOne: false,
//   ref: 'Category'
// });

// schema.virtual('newslist', {  //定义名为newList的虚拟字段，值为Article下category为当前id的记录数组
//   localField: '_id',
//   foreignField: 'category',
//   justOne: false,
//   ref: 'Article'
// });

//生成并导出Category模型
module.exports = mongoose.model('Category',schema);