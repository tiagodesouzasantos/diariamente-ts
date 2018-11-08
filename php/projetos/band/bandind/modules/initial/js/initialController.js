angular.module('initial')
    .controller('initialController',
    function ($scope, $timeout, $state, $rootScope, initialService, session, dialogService, $http, $q, $mdDialog, msgsService) {
            $scope.init = function() {
                console.log('%c Que coisa feia inspecionando o app né! ', 'background: #222; color: #bada55');
                try {
                    var sessionData = session.getData('tokenData');  
                    $state.go('home');                                      
                } catch (error) {
                    $state.go('initial');
                }
            }
            $scope.submit = function() {
                $rootScope.showLoading = true;
                initialService.login($scope.login).then(function(authUsuarioResult) {
                    console.log('authUsuarioResult', authUsuarioResult);
                    $rootScope.showLoading = false;                    
                    $state.go('home');
                }).catch(function(authUsuarioError) {
                    $rootScope.showLoading = false;
                    var confirmeJson = {
                        "title": "Problemas!",
                        "content": authUsuarioError,
                        "buttonOk": "Ok"
                    };
                    dialogService.confirm(confirmeJson);
                });
            }        
        
            $scope.openDialog = function (template) {
                $scope.login = null;
                var templates = { 
                    "rsenha": 'modules/initial/recuperar-senha.html',
                    "cadastre": 'modules/initial/cadastre-se.html' 
                }
                return $mdDialog.show({
                    controller: function (copiaScope) {
                        return copiaScope;
                    },
                    controllerAs: 'initial',
                    locals: {
                        copiaScope: $scope
                    },
                    templateUrl: templates[template],
                    clickOutsideToClose: true
                });
            }

            $scope.closeModal = function () {
                $mdDialog.hide();
            }
            
            $scope.getUserDataByCpf = function(){
                $scope.errorMsg = null;
                initialService.getRhUsuario($scope.login).then(function (authUsuarioResult) {  
                    $scope.login = authUsuarioResult.usuarioRh;
                    $scope.errorMsg = authUsuarioResult.errorMsg;
                }).catch(function (authUsuarioError) {    
                    var confirmeJson = {
                        "title": "Algo aconteceu!",
                        "content": authUsuarioError,
                        "buttonOk": "Ok"
                    };
                    dialogService.confirm(confirmeJson);
                });
            }

            $scope.saveNewUser = function(){
                $scope.progress = true;                
                var save = initialService.saveNewUser($scope.login);
                save.then(function (saveResult) { 
                    $scope.progress = false;
                    var confirmeJson = {
                        "title": "Deu certo!",
                        "content": saveResult,
                        "buttonOk": "Ok"
                    };	
                    dialogService.confirm(confirmeJson);
                }).catch(function (saveError) { 
                    $scope.errorMsg = saveError;
                    var confirmeJson = {
                        "title": "Algo aconteceu!",
                        "content": saveResult,
                        "buttonOk": "Ok"
                    };
                    dialogService.confirm(confirmeJson);
                });
            }

            $scope.recoverPass = function(){
                $scope.progress = true;
                var recover = initialService.recoverPass($scope.login);
                recover.then(function (recoverResult) {
                    var confirmeJson = {
                        "title": "Deu certo!",
                        "content": recoverResult,
                        "buttonOk": "Ok"
                    };
                    dialogService.confirm(confirmeJson);
                    $scope.progress = false;                    
                }).catch(function (recoverError) {
                    var confirmeJson = {
                        "title": "Problemas!",
                        "content": recoverError,
                        "buttonOk": "Ok"
                    };
                    dialogService.confirm(confirmeJson);
                    $scope.progress = false;                                        
                });
            }
        });