'use strict';
const windowsSessionUserFile = require('../plugin/session_user/windowsSessionUserFile');
const msg = require('../plugin/message/message');
const git = require('../plugin/git/git');
const log = require('../plugin/log/log');

function run(req, res){
    try {        
        let closedApps = [];
        for (let apps of req.body.app_run){
            closedApps.push(windowsSessionUserFile.sessionFileClose(apps.name, apps.ext));
        }        
        console.time('# Promise.all');
        Promise.all(closedApps).then(function (result) {
            console.time('# git.pull');
            let gitResult = git.pull(req.body.git);
            gitResult.then(function (result) { 
                res.status(200).json(msg.get(req.session.language, "200"));
                console.timeEnd('# git.pull');
                console.log("#############################################");
            }).catch(function (error) { 
                log.create(error);
                res.status(406).json(msg.get(req.session.language, "400"));
                console.timeEnd('# git.pull');
                console.log("#############################################");
            });
            console.timeEnd("# Promise.all");
        }).catch(function(error){
            console.log('promisse all--->', error);
            log.create(error);
            res.status(406).json(msg.get(req.session.language, "400"));
            console.timeEnd("# Promise.all");
        });
    } catch (error) {
        console.error("windowsSessionUserFile (fn run)",error);
    }
}
module.exports = {
    run
}