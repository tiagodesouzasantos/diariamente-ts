'use strict';

function addLeftZero(date){
    let newDate = date.toString();
    return newDate.length == 1 ? "0" + newDate : newDate;
}

function get(){
    let now = new Date();
    let month = this.addLeftZero((now.getMonth() * 1) + 1);
    return { "day": now.getDate(), "month": month,"year":now.getFullYear(), "timestamp": now.valueOf()}
}


module.exports = {
    get, addLeftZero
}