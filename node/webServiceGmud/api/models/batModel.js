'use strict';
var con = require('./firebaseCon');
module.exports = con.collection('bats');
// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
// var batSchema = new Schema({
//     project: {type: String},
//     server: {type: String},
//     url:{type: String},
//     Created_date: {
//         type: Date,
//         default: Date.now
//     }
// });
// module.exports = mongoose.model('Bats', batSchema);