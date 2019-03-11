'use strict';
module.exports = function(app){
    let updateController = require('./updateController');
    app.route('/api/update').post(updateController.run);
    
}