'use strict'
const telegramConfig = require('../config/telegram.json');
const axios = require('axios');

async function sendMsg(msg) {
    try {
        let apiUri = `https://api.telegram.org/bot${telegramConfig.token_api}/sendMessage?chat_id=-${telegramConfig.chat_id}&text=${msg}`;
        console.log(apiUri);
        let getResult = await axios.get(apiUri).then(response => {
            return response.data;
        }).catch(error => {
            console.error(error);
            throw error;
        });
        return getResult;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    sendMsg
}