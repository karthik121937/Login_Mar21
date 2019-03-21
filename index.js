var app = require('./server/server.js');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/loginMar21');

var port = process.env.PORT || 3000;

// listen on port
app.listen(port);

console.log("Server is listening on port " + port);