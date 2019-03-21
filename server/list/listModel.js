var mongoose = require('mongoose');

var UserList = new mongoose.Schema({
  ListName: String,
  ListNo: String,
  ListItem: String
});

module.exports = mongoose.model('List', UserList);