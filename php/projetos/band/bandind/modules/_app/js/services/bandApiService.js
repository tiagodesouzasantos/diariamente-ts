angular.module('bandApiService')
    .service('api', function (session, $q, $http, $state, appUrls, msgsService) {
        return {
            post: function (url,params) {
                var postProm = $q.defer();
                $http.post(appUrls.getUrl(url), params,this.getHeader())
                    .then(function (postResult) {                        
                        console.log('postResult', postResult);
                        postProm.resolve(postResult);
                    }).catch(function (postError) {
                        console.log('postError', postError);
                        var postErro = postError.data.error;
                        postProm.reject(msgsService.getMsg(postErro.module, postErro.msg));
                    });
                return postProm.promise;
            },
            show:function(url,params){
                var getProm = $q.defer();
                console.log(appUrls.getUrl(url) + "/" + params);
                $http.get(appUrls.getUrl(url) + "/" + params, this.getHeader())
                    .then(function (getResult) {
                        getProm.resolve(getResult);
                        console.log('getResult', getResult);
                    }).catch(function (getError) {
                        console.log('getError', getError);
                        var getErro = getError.data.error;
                        getProm.reject(msgsService.getMsg(getErro.module, getErro.msg));
                    });
                return getProm.promise;
            },
            put:function(url, params, id){
                var putProm = $q.defer();
                console.log(appUrls.getUrl(url) + "/" + id);
                $http.put(appUrls.getUrl(url) + "/" + id,params, this.getHeader())
                    .then(function (putResult) {
                        putProm.resolve(putResult);
                        console.log('putResult', putResult);
                    }).catch(function (putError) {
                        console.log('putError', putError);
                        var putErro = putError.data.error;
                        putProm.reject(msgsService.getMsg(putErro.module, putErro.msg));
                    });
                return putProm.promise;
            },
            getHeader: function () {
                try {
                    var tokenData = JSON.parse(session.getData('tokenData'));
                    var header = {
                        "Content-Type": "application/json",
                        "Authorization": tokenData.token_type + " " + tokenData.access_token
                    }
                    console.log(header);
                    return header;
                } catch (error) {
                    console.log('getHeaderError',error);
                    return {"Content-Type": "application/json"};
                }
            }
        }
    })