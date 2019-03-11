'use strict';
function sessionFileClose(_file,_extension){  
    let thisModule = this;  
    let sessionProm = new Promise(async function(resolve,reject){
        let runingProcess = await thisModule.findExeFile(_file+'.'+_extension); 
        if (runingProcess>0){
            const { exec } = require('child_process');
            const bat = require.resolve('../../batch_lib/close_session_user.bat');
            exec(bat + ` ${_file} ${_extension}`, (err, stdout, stderr) => {
                if (err) { reject(err) }
                resolve(runingProcess);
            });
        }else{
            resolve(true);
        }
    });    
    return sessionProm;
}

function findExeFile(fullName){    
    let findFileProm = new Promise(function(resolve,reject){
        const { exec } = require('child_process');
        exec(`net files`, (err, stdout, stderr) => {
            let result = stdout ? stdout.toString().search(`${fullName}`):-1;
            resolve(result); 
        });
    });
    return findFileProm;
}

module.exports = {
    sessionFileClose, findExeFile
}