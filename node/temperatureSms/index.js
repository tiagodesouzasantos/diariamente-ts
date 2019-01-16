'use strict';
const temperature = require('./temperature/index');
const time = require('./helpers/time');
const config = require('./config/config.json');

temperature.monitor();
setInterval(function(){
    temperature.monitor();
    console.log("Runing monitor temperature!");
}, time.minToMs(config.monitor_time));
console.log("Runing monitor temperature!");