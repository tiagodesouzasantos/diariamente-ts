'use strict';
exports.runBats = function(batData){
  try{
	const { spawn } = require('child_process');
    return spawn('cmd.exe', [batData.unit, batData.url]);
  }catch(error){
    console.log('error',error);
  }
}
