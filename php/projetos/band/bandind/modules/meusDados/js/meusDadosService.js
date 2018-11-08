angular.module('meusDados')
    .service('meusDadosService', function($q, $http, db, session) {
        return {
            save: function(userToSave) {
                var saveProm = $q.defer();
                var busca = "updateMyData";

                var param = { "data": userToSave, "busca": busca };

                var saveUser = db.dbActions("usuarioAd", param, "bandAdManage");
                saveUser.then(function(saveUserResult) {
                    if (saveUserResult.success == undefined) {
                        saveProm.reject(saveUserResult.error);
                    } else {
                        saveProm.resolve(saveUserResult.success);
                    }
                }).catch(function(saveUserError) {
                    saveProm.reject(saveUserError);
                });
                return saveProm.promise;

            }
        }
    })