'use strict';
module.exports = function (app) {
    let serverRoutes = require('./serverRoutes');
    serverRoutes(app);
};