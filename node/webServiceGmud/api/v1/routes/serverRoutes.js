'use strict';
module.exports = function (app) {
    var servers = require('../controllers/serverController');
    app.route('/api/servers')
        .post(servers.insert)
        .get(servers.list);

    app.route('/api/servers/:serverId')
        .get(servers.get)
        .put(servers.update)
        .delete(servers.delete);
};