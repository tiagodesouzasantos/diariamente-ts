angular.module('dbServer')
    .service('db', ['$q', '$http', 'appUrls', 'errorRequestService',
        function($q, $http, appUrls, errorRequestService) {
            return {
                dbActions: function(acao, param, modulo, timeoutSelected) {
                    var data = {
                        'acao': acao,
                        'param': param,
                        'modulo': modulo
                    };
                    var timeoutToRequest = 30000;

                    if (timeoutSelected != undefined || timeoutSelected != null) {
                        timeoutToRequest = timeoutSelected;
                    }
                    var requestConfig = {
                        url: appUrls.getUrl("app"),
                        data: data,
                        method: 'post',
                        timeout: timeoutToRequest
                    }

                    var prom = $q.defer();

                    $http(requestConfig).then(function(response) {
                        responseData = response.data;
                        if (responseData != undefined) {
                            if (responseData.length < 1) {
                                prom.reject("sem dados");
                            } else {
                                prom.resolve(responseData);
                            }
                        } else {
                            prom.reject("sem dados");
                        }
                    }, function(response) {
                        console.log('db-error', response);
                        prom.reject(errorRequestService.getMsg(response.status));
                    });
                    return prom.promise;
                }
            }
        }
    ])