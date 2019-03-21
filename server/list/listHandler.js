var helper = require('../config/helper.js');
var List = require('./listModel.js');

// export function
module.exports = {
    addList: function(req, res){
        var newListObj = req.body;
    
        List.create(newListObj, function(err, list){
          if (err) { // notifies if error is thrown
            console.log("mongo create list err: ", err);
            helper.sendError(err, req, res);
          } else { // list created, sends 201 status
            //res.status(201);
            res.json(list);
          }
        });
      }
};