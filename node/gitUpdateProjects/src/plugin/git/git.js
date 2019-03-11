'use strict';

function pull(rep){
    let gitProm = new Promise(function (resolve, reject) {
        const { exec } = require('child_process');        
        exec(`${rep.dir_unit} && cd ${rep.dir} && git pull`, (err, stdout, stderr) => {
            console.log(`# git.js error: ${err}`);
            if (err) { reject(err) }
            resolve(stdout);
        });
    });
    return gitProm;
}

module.exports = {
    pull
}