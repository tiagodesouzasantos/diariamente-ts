'use strict';
// var con = require('./firebaseCon');
// module.exports = con.collection('servers');
// exports.firebase = function(){
//     return con.collection('servers');
// }
exports.get = function(){    
    return require('./serverModel.json');
}