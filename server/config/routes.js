var userHandler = require('../users/userHandler.js');
module.exports = function(app, express){

    app.post('/api/signin', userHandler.signin);
    app.post('/api/signup', userHandler.signup);
    app.get('/test',function(req,res){
        res.end("homeeeeeee")
    })
}