'use strict';
let bats = require('../plugins/runBatPlugin');
let requests = require('../plugins/bats/batsPlugin');
let logs = require('../plugins/file/logPlugin');

// var path = require('path');
// var nodegit = require('nodegit'),
// repoFolder = path.resolve('\\\\camburi\\Microled\\Operador', 'https://tiago-santos-bandeiranteslog@bitbucket.org/sistemasbandeirantes/camburioperador.git');

exports.runBatAction = function (req, res) {
    try {
        let postsVar = req.body;
        let batConfig = {"url": postsVar.update,"unit": '/'+postsVar.update.substr(0, 1)};
        console.log(batConfig);
        let runingBats = bats.runBats(batConfig);
        runingBats.on('exit', (code) => {
            let resultBat = requests.requestStatus(code);
            res.statusCode = resultBat.code;
            res.json(resultBat.msg);
            console.log(`Child exited with code ${code}`);
        }); 

    } catch (error) {
        let msgError = "Problemas ao executar a requisição, entre em contato com o suporte";
        res.statusCode = 500;
        logs.logError(error).then(logFile =>{
            res.json(msgError+" e informe o código:" + logFile.errorCode);
        }).catch(error=>{
            console.log("Error: "+error);
            res.json(msgError);
        });
    }
};
// COM BUGS 
// - paradise***
// - trancoso***
// - waimea***