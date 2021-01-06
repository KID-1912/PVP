const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  category: {type: mongoose.SchemaTypes.ObjectId,ref: "Category"},
  title: {type: String},
  banner: {type: String},
  url: {type: String},
  playCount: {type: Number,default: 0}
},{
  timestamps: true
});

module.exports = mongoose.model('Video',schema);