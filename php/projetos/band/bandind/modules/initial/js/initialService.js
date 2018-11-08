angular.module('initial')
    .service('initialService',
        function($q, $http, db, msgsService, auth, api) {
            return {
                validaUsuario: function(usuario) {
                    var validaUsuarioProm = $q.defer();
                    if (usuario != null || usuario != undefined) {
                        validaUsuarioProm.resolve(usuario);
                    } else {
                        var confirmeJson = {
                            "title": "Problemas!",
                            "content": msgsService.getMsg('usuario', 1),
                            "buttonOk": "Ok"
                        };
                        validaUsuarioProm.reject(confirmeJson);
                    }
                    return validaUsuarioProm.promise;
                },
                login: function(usuario) {
                    var authProm = $q.defer();
                    usuario.acao = "auth";
                    usuario.modulo = "login";
                    auth.login(usuario).then(function(authResult) {
                        authProm.resolve(authResult);
                    }).catch(function(authError) {
                        authProm.reject(authError);
                    });

                    return authProm.promise;
                },
                saveNewUser:function(usuario){
                    var saveNewUserProm = $q.defer();
                    api.post('usuarios', usuario).then(function (apiResult) {
                        var usuarioCriado = apiResult.data.criado;
                        if(usuarioCriado){
                            saveNewUserProm.resolve(msgsService.getMsg('app', 1));
                        }else{
                            saveNewUserProm.reject(msgsService.getMsg('app', 3));
                        }
                    }).catch(function (apiError) {
                        saveNewUserProm.reject(apiError);
                    });
                    return saveNewUserProm.promise;
                },
                getRhUsuario:function(usuario){
                    var rhUsuarioProm = $q.defer();
                    api.show('rhusuarios', usuario.cpf).then(function (rhUsuarioResult) {
                        var rhUsuarios = rhUsuarioResult.data;
                        var resultReturn;
                        if (rhUsuarios.usuarioExiste) {
                            resultReturn = {"errorMsg":msgsService.getMsg('usuario', 2),"nome":null};
                        } else if (rhUsuarios.usuarioRh==null){
                            resultReturn = { "errorMsg": msgsService.getMsg('usuario', 4), "nome": null };
                        }else{
                            resultReturn = { "errorMsg": "", "usuarioRh": rhUsuarios.usuarioRh};
                        } 
                        rhUsuarioProm.resolve(resultReturn);
                    }).catch(function (rhUsuarioError) { 
                        rhUsuarioProm.reject(rhUsuarioError);
                    });
                    return rhUsuarioProm.promise;
                },
                recoverPass:function(usuario){
                    var recoverPassProm = $q.defer();
                    api.post('recoverpass', usuario).then(function (apiResult) { 
                        recoverPassProm.resolve(msgsService.getMsg('app', 11));
                    }).catch(function(apiError){
                        recoverPassProm.reject(apiError);
                    });
                    return recoverPassProm.promise;
                }
            }
        }
    )