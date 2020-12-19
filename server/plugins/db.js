const path = require('path');

module.exports = app => {
  const mongoose = require('mongoose');
  mongoose.connect('mongodb://127.0.0.1:27017/pvp?authSource=admin',{
    useNewUrlParser: true
  });

  require('require-all')(path.join(__dirname,"../models"))
}