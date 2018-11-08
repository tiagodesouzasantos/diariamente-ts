angular.module('meusDados')
    .controller('meusDadosController',
        function($scope, meusDadosService, dialogService, session, $mdDialog, msgsService, $state) {
            $scope.init = function() {
                var userData = JSON.parse(session.getData('authData'));
                $scope.login = userData.user;          
            }
                
            $scope.save = function(){
                $scope.progress = true;
                
                meusDadosService.save($scope.login).then(function(saveUsuarioResult) {
                    $scope.progress = false;
                    $scope.dialogMsg("Deu certo!", saveUsuarioResult);
                }).catch(function(saveUsuarioError) {
                    $scope.progress = false;
                    $scope.dialogMsg("Problemas!", saveUsuarioError);
                });
            }  
            $scope.dialogMsg = function(title, moduleMsg) {
                var confirmeJson = {
                    "title": title,
                    "content": msgsService.getMsg(moduleMsg.module, moduleMsg.msg),
                    "buttonOk": "Ok"
                };
                dialogService.confirm(confirmeJson).then(function() {
                    $state.go("home");
                }).catch(function() {
                    $scope.init();
                });
            }     
        });