angular.module('admin')
    .service('adminService',
        function($q, $http, db, session, $timeout) {
            return {
                admin: function() {    
                    return 'oi'                ;
                }
            }
        }
    )