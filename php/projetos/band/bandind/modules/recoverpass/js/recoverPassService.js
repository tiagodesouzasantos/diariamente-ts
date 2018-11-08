angular.module('recoverPass')
    .service('recoverPassService',
        function($q, $http, db, msgsService,api) {
            return {                
                getToken: function(token) {
                    var getTokenProm = $q.defer();
                    api.show('recoverpass', token.hash).then(function (apiResult) {
                        console.log('apiResult', apiResult.data);
                        getTokenProm.resolve(apiResult.data);
                    }).catch(function (apiError) {
                        console.log('apiError', apiError);
                        getTokenProm.reject(apiError);
                    });
                    return getTokenProm.promise;
                },
                updatePass: function(hashData) {
                    var updatePassProm = $q.defer();
                    api.put('recoverpass', hashData.usuario,hashData.hashRecoverPass.id).then(function (apiResult) {
                        var result = apiResult.data;
                        if (result.atualizado && result.hashRemovida){
                            updatePassProm.resolve(msgsService.getMsg("app", 1));
                        }
                    }).catch(function (apiError) {
                        console.log('apiError', apiError);
                        updatePassProm.reject(apiError);
                    });
                    return updatePassProm.promise;                    
                }
            }
        }
    )