angular.module('bandEdi')
    .service('appUrls', function(session) {
        return {
            getEnv: function() {
                var environments = {
                    "localhost": "dev",
                    "172":"dev",
                    "dev": "dev",
                    "web": "web.interno",
                    "web.bandeiranteslog":"web.externo"
                };
                var httpHost = window.location.hostname;
                var firstNameHost = httpHost.split('.');
                var enviroment = firstNameHost[0];
                if (firstNameHost[1] =='bandeiranteslog'){
                    enviroment = firstNameHost[0] +'.'+ firstNameHost[1];
                }
                return environments[enviroment];
            },
            getUrl: function(url) {
                var urlInicial = {
                    // "dev": "http://dev.new.band/bandapi/public/api/v1/",
                    "dev": "http://localhost:8013/api/v1/",
                    "web.interno": "http://web.new.band/ediband/api/v1/",
                    "web.externo":"http://web.bandeiranteslog.com.br/ediband/api/v1/"
                };
                var urls = {
                    "auth":"auth/login",
                    "recoverpass":"recoverpass",
                    "usuarios": "usuarios",
                    "rhusuarios":"rhusuarios"
                }
                return urlInicial[this.getEnv()]+urls[url];
            }
        }
    })