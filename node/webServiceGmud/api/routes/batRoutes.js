'use strict';
module.exports = function (app) {
    var bats = require('../controllers/batController');
    app.route('/bats').post(bats.runBatAction);
};