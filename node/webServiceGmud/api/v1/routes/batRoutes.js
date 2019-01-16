'use strict';
module.exports = function (app) {
    var bats = require('../controllers/batController');
    app.route('/api/bats').post(bats.runBatAction);
};