'use strict';

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
    filterLastPosition,
    validationTemperature
}