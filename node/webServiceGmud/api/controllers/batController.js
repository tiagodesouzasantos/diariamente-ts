'use strict';
var bats = require('../helpers/runBatHelper');

exports.runBatAction = function (req, res) {
    var bat = bats.runBats({ "url": "c:/kill/kill.bat", "unit": "/c"});
    var returnMsg = {"success":"","error":""};
    bat.on('exit', (code) => {
        switch(code){
            case 0:
                returnMsg.success = "Processamente executado com sucesso";
                break;
            default:
                returnMsg.error = "Ocorreu algum problema";
        }
        console.log(`Child exited with code ${code}`);
        res.json(returnMsg);
    });    
};