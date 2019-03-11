'use strict';
const fs = require('fs');
const date = require('../date/date');
const logDir = __dirname+'/../../../log/';
function create(error){
    let idLog = date.get();
    let nameLog = `${idLog.year}-${idLog.month}-${idLog.day}`;
    let contentLog = `${idLog.timestamp} --- ${error}`;
    fs.appendFile(logDir+nameLog + '.log', contentLog, function (err) {
        if (err) { throw err; }
    });
}

module.exports = {
    create
}