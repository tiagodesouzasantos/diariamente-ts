angular.module('instrutor')
    .service('instrutorService',
        function($q, $http, db, session, $timeout) {
            return {
                instrutor: function() {    
                    return 'oi'                ;
                }
            }
        }
    )