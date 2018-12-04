'use strict';
module.exports = function (app) {
    var servers = require('../controllers/serverController');
    app.route('/servers').post(servers.insert)
    .get(servers.list)
    app.route('/servers/:serverId')
        .get(servers.get)
        .put(servers.update)
        .delete(servers.delete);
};