'use strict';
exports.groupDbData = function (dbData) {
    try {
        let finalData = [];
        dbData.forEach(data => {
            let currentData = data.data();
            finalData.push({ "server": data.id, "softwares": currentData.softwares});
        });
        console.log(finalData);
        return finalData;
    } catch (error) {
        console.log('error', error);
    }
}
