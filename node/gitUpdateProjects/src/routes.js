'use strict';
const sessionUserRoutes = require('./update/routes');
module.exports = function(app){
    sessionUserRoutes(app);
}