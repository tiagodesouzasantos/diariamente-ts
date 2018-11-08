angular.module('recoverPass')
    .controller('recoverPassController',
    function ($scope, $state, recoverPassService, dialogService, $stateParams) {
            $scope.init = function() {
                console.log('%c Que coisa feia inspecionando o app né! ', 'background: #222; color: #bada55');
                $scope.authToken();
                $scope.progress = false;
            }
            $scope.authToken = function() {
                var token = { "hash": $stateParams.recoverpass};
                var recoverpass = recoverPassService.getToken(token);
                recoverpass.then(function (recoverResult) { 
                    $scope.loadToken = recoverResult;
                }).catch(function (recoverError) { 
                    var confirmeJson = {
                        "title": "Problemas!",
                        "content": recoverError,
                        "buttonOk": "Ok"
                    };
                    dialogService.confirm(confirmeJson)
                        .then(function(){
                            $state.go('initial');
                        });
                });
            }        
        
            $scope.updatePass = function(){
                $scope.progress = true;
                // var token = { "hash": $stateParams.recoverpass };
                $scope.loadToken.usuario.senha = $scope.login.senha;
                var recoverpass = recoverPassService.updatePass($scope.loadToken);
                recoverpass.then(function (recoverResult) {  
                    $scope.progress = false;
                    var confirmeJson = {
                        "title": "Deu certo!",
                        "content": recoverResult,
                        "buttonOk": "Ok"
                    };
                    dialogService.confirm(confirmeJson)
                        .then(function () {
                            $state.go('initial');
                        });                 
                }).catch(function (recoverError) {
                    $scope.progress = false;
                    var confirmeJson = {
                        "title": "Problemas!",
                        "content": recoverError,
                        "buttonOk": "Ok"
                    };
                    dialogService.confirm(confirmeJson)
                        .then(function () {
                            $state.go('initial');
                        });
                });
            }

        });