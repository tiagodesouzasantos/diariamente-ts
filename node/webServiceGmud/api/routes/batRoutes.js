'use strict';
module.exports = function (app) {
    var bats = require('../controllers/batController');
    app.route('/bats').post(bats.runBatAction);
    // .get(bats.list_all_bats)
    // app.route('/bats/:batId')
    //     .get(bats.read_a_bat)
    //     .put(bats.update_a_bat)
    //     .delete(bats.delete_a_bat);
};