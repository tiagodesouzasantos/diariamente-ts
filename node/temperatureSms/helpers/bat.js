'use strict';
async function run(bat){
    try{
        const { exec } = require('child_process');
        let runingBat = await exec(bat, (error, stdout, stderr) => {
            if (error) { throw err; }
        });
        return runingBat;
    }catch(error){
        throw error;
    }
}
module.exports = {
    run
}