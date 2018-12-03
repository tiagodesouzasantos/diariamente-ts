'use strict';

exports.runBats = function(batData){
  const { spawn } = require('child_process');
  return spawn('cmd.exe', [batData.unit, batData.url]);
}
