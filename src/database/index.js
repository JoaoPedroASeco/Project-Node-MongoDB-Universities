const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/teste-back-end');
mongoose.Promise = global.Promise;

module.exports = mongoose; 