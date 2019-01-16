'use strict';
module.exports = function (app) {
    let batRoutes = require('./batRoutes');
    let serverRoutes = require('./serverRoutes');
    batRoutes(app);
    serverRoutes(app);
};