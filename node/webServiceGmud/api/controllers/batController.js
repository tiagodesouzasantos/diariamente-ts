'use strict';
let bats = require('../plugins/runBatPlugin');
let batModel = require('../models/batModel');

exports.runBatAction = function (req, res) {
    let postsVar = req.body;  
    batModel.doc(postsVar.server).get().then(doc => {
        let batData = doc.data();
        let runingBats = bats.runBats({
             "url": batData[postsVar.server].url, 
             "unit": batData[postsVar.server].unit
            });
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
    }).catch(reason => {
        console.log(reason)
        res.send(reason)
    });      
};