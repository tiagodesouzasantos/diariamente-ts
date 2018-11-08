angular.module('admin')
    .controller('adminController',
        function($state, $scope, session) {
            $scope.init = function() {
                $scope.maxDate = new Date();                
                $scope.inicial = new Date();
                $scope.final = new Date();
            }
        });