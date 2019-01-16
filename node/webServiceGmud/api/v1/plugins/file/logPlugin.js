'use strict';
const fs = require('fs');
const logDir = "C:/node/projetos/webServiceGmud/log/";
exports.logError = function(error){
    return new Promise((resolve, reject) => {
        let fileLog = new Date().getTime();
        fs.writeFile(logDir + fileLog + ".log", error.stack, function (err) {
            if (err) return reject('Não foi possivel gerar o arquivo de log: ' + fileLog);
            return resolve({ "msg": "log " + fileLog + " criado com sucesso", "errorCode": fileLog });
        }); 
    });
    
}