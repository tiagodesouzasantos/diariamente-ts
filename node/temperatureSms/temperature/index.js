'use strict';
const file = require('../helpers/file');
const date = require('../helpers/date');
const bat = require('../helpers/bat');
const telegram = require('../helpers/telegram');
const ruleService = require('./ruleService');
const temperatureService = require('./temperatureService');
const config = require('../config/config.json');

function monitor() {
    try {        
        let fileSufix = date.getDate();   
        let fileName = fileSufix.year + '-' + fileSufix.month + '.txt'; 
        let readingFile = file.read(config.dir_log,'Temperatura-' + fileName);

        readingFile.then(function (data) {
            let dataLines = ruleService.filterLastPosition(data, config.check_last_temp);
            let heatTemp = ruleService.validationTemperature(dataLines, config.max_temperature);
            if (config.copy_file){
                temperatureService.copyFile(config.shutdown_src, config.shutdown_dst, heatTemp);
                temperatureService.removeFile(config.shutdown_dst, heatTemp);
            }
            if (config.send_msg && heatTemp){
                telegram.sendMsg(`[PROBLEMAS]\n\rA temperatura dos servidores ultrapassou os ${config.max_temperature}C`);
            }
            if (config.run_batch){
                bat.run(config.url_batch);
            }
        }).catch(function (error) {
            console.error('Error', error);
        });
    } catch (error) {
        console.error('Error', error);
    }
}
module.exports = {
    monitor
}