angular.module('bandEdi')
    .service('auth', function (session, $q, $http, $state, appUrls, msgsService) {
        return {
            login: function(user) {
                var authProm = $q.defer();
                $http.post(appUrls.getUrl('auth'), user)
                    .then(function(authResult) {
                        var auth = authResult.data;
                        session.setData('tokenData', JSON.stringify(auth.tokenData));
                        session.setData('usuario', JSON.stringify(auth.usuario));
                        session.setData('usuarioRh', JSON.stringify(auth.usuarioRh));  
                        authProm.resolve(auth);                      
                    }).catch(function(authError) {
                        var authErro = authError.data.error;
                        authProm.reject(msgsService.getMsg(authErro.module, authErro.msg));
                    });
                return authProm.promise;
            },
            logout: function() {
                session.clear();
                $state.go('initial');
            }
        }
    })