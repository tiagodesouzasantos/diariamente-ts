'use strict';
const axios = require('axios');
const file = require('../helpers/file');

async function sendMsg(apiUri,heatTemp){
    try {        
        let getResult = await axios.get(apiUri).then(response => {
                return response.data;
            }).catch(error => {
                throw error;
            });
        return getResult;
    } catch (error) {
        throw error;
    }
}
async function copyFile(fileSrc,fileDst,heatTemp){
    try {
        let fileExist = await file.exists(fileDst);
        if (!fileExist && heatTemp) {
            await file.copy(fileSrc, fileDst);
        }
        return true;
    } catch (error) {
        throw error;        
    }

}
async function removeFile(fileDst, heatTemp){
    try {
        let fileExist = await file.exists(fileDst);
        if (fileExist && !heatTemp) {
            await file.remove(fileDst);
        }
        return true;
    } catch (error) {
        throw error;        
    }

}

function filterLastPosition(data, positions) {
    try {
        let orderedData = data.replace(/\r?\n|\r/g, "||").split('||');
        // Menos 2 devido a ultima linha vim em branco
        let dataPositions = orderedData.length - 2;
        let resultData = [];
        for (var i = dataPositions; i > (dataPositions - positions); i--) {
            resultData.push(orderedData[i]);
        }
        return resultData;
    } catch (error) {
        throw error;
    }
}
function validationTemperature(data, temperature) {
    try {
        for (let currentDatadata of data) {
            let currentForOf = currentDatadata.split(';');
            if (!(currentForOf[2].replace(',', '.') * 1 >= temperature)) {
                return false;
            }
        }
        return true;
    } catch (error) {
        throw error;
    }
}
module.exports = {
    sendMsg, copyFile, removeFile,
    filterLastPosition,
    validationTemperature
}