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

module.exports = {
    sendMsg, copyFile, removeFile
}