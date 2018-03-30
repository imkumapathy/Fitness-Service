(function (controllers){

var excersiceController = require('./excerciseController');
var setsController = require('./setsController');

    controllers.init = function(app,db){
    excersiceController.init(app,db);
    setsController.init(app,db);
    }
})(module.exports);