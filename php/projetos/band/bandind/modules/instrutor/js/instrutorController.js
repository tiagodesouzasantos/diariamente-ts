angular.module('instrutor')
    .controller('instrutorController',
        function($state, session) {
            var instCtrl = this;
            instCtrl.init = function() {
                console.log('instrutorController');
            }
            
        });