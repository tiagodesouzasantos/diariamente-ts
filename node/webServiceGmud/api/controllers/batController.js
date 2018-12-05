'use strict';
let bats = require('../plugins/runBatPlugin');

exports.runBatAction = function (req, res) {
    let postsVar = req.body;
    let batConfig = {
        "url": postsVar.update,
        "unit": '/'+postsVar.update.substr(0, 1)
    };
    let runingBats = bats.runBats(batConfig);
        let returnMsg = {"success":"","error":""};
        runingBats.on('exit', (code) => {
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