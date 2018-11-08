angular.module('bandEdi', [
    'ngMaterial',
    'ngAnimate',
    'ngSanitize',
    'ui.router',
    'gridster',
    'ui.carousel',
    'chart.js',
    'menu',
    'home',
    'edi',
    'bandApiService',
    'initial',
    'dbServer',
    'mapsService',
    'timeService',
    'textService',
    'text',
    'recoverPass',
    'meusDados',
    'tivit'
])

.config(["$mdThemingProvider", "$stateProvider", "$urlRouterProvider", "$mdDateLocaleProvider", function($mdThemingProvider, $stateProvider, $urlRouterProvider, $mdDateLocaleProvider) {



    // Configuração de tema do Angular Material
    $mdThemingProvider
        .theme('default')
        .primaryPalette('light-blue')
        .accentPalette('light-blue');

    // Configuração de rotas
    $stateProvider
        .state('initial', {
            url: '/initial',
            views: {
                'content@': {
                    templateUrl: 'modules/initial/index.html',
                    controller: 'initialController as initial'
                }
            }
        })

    $stateProvider
        .state('recoverpass', {
            url: '/recoverpass/:recoverpass',
            views: {
                'content@': {
                    templateUrl: 'modules/recoverpass/index.html',
                    controller: 'recoverPassController as recoverPass'
                }
            }
        })

    .state('menu', {
        abstract: true,
        views: {
            'content@': {
                templateUrl: 'modules/menu/index.html',
                controller: 'menuController as menu'
            }
        }
    })

    // INICIO PUBLICACOES
    .state('cadedi', {
            parent: 'menu',
            url: '/cadedi',
            views: {
                'main@menu': {
                    templateUrl: 'modules/cadedi/index.html',
                    controller: 'cadEdiController as cadEdiCtrl'
                }
            }
        })        
    .state('home', {
            parent: 'menu',
            url: '/home',
            views: {
                'main@menu': {
                    templateUrl: 'modules/home/index.html',
                    controller: 'homeController as homeCtrl'
                }
            }
        })        
        .state('meusDados', {
            parent: 'menu',
            url: '/meusDados',
            views: {
                'main@menu': {
                    templateUrl: 'modules/meusDados/index.html',
                    controller: 'meusDadosController as meusDados'
                }
            }
        })       

    $urlRouterProvider.otherwise('initial');
    //Formato Brazileiro date
    $mdDateLocaleProvider.formatDate = function(dateString) {
        var data;
        if (dateString === undefined) {
            data = '';
        } else {
            data = moment(dateString).format('DD/MM/YYYY');
        }
        return data;
    };

    $mdDateLocaleProvider.parseDate = function(dateString) {
        var m = moment(dateString, 'DD/MM/YYYY', true);
        return m.isValid() ? m.toDate() : new Date(NaN);
    };

    //Tradução Calendar
    $mdDateLocaleProvider.months = ['janeiro', 'fereveiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    $mdDateLocaleProvider.shortMonths = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    $mdDateLocaleProvider.shortDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

}]).run(["$rootScope", "$state", "session", function($rootScope, $state, session) {

    var routerWithLogin = ['home', 'menu', 'meusDados','cadEdi'];

    $rootScope.$on('$locationChangeSuccess', function(event, next, current) {
        for (var route in routerWithLogin) {
            if (next.indexOf(routerWithLogin[route]) > -1) {
                session.valideSession(routerWithLogin[route]);
                break;
            }
        }
    })
}]);;angular.module('dbServer', [])
angular.module('mapsService', [])
angular.module('sessionService', [])
angular.module('timeService', [])
angular.module('textService', [])

angular.module('menu', [])
angular.module('admin', [])
angular.module('instrutor', [])
angular.module('text', [])
angular.module('tivit', [])
angular.module('bandApiService', [])

angular.module('initial', [])
angular.module('meusDados', [])
angular.module('treinamento', [])
angular.module('recoverPass', [])
angular.module('edi', [ 'dbServer'])
angular.module('home', [ 'dbServer']);angular.module('initial')
    .controller('initialController',
    ["$scope", "$timeout", "$state", "$rootScope", "initialService", "session", "dialogService", "$http", "$q", "$mdDialog", "msgsService", function ($scope, $timeout, $state, $rootScope, initialService, session, dialogService, $http, $q, $mdDialog, msgsService) {
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
                    controller: ["copiaScope", function (copiaScope) {
                        return copiaScope;
                    }],
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
        }]);;angular.module('initial')
    .service('initialService',
        ["$q", "$http", "db", "msgsService", "auth", "api", function($q, $http, db, msgsService, auth, api) {
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
        }]
    );angular.module('recoverPass')
    .controller('recoverPassController',
    ["$scope", "$state", "recoverPassService", "dialogService", "$stateParams", function ($scope, $state, recoverPassService, dialogService, $stateParams) {
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

        }]);;angular.module('recoverPass')
    .service('recoverPassService',
        ["$q", "$http", "db", "msgsService", "api", function($q, $http, db, msgsService,api) {
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
        }]
    );angular.module('edi')
    .controller('cadEdiController',
    ["$filter", "$element", "$state", "$scope", "text", "cadEdiService", "dialogService", "$rootScope", "session", "$mdDialog", "time", "msgsService", "dateService", "$q", function ($filter, $element, $state, $scope, text, cadEdiService, dialogService, $rootScope, session, $mdDialog, time, msgsService, dateService,$q) {
            var cadEdiCtrl = this;
            cadEdiCtrl.edi = {};  
            $element.find('input').on('keydown', function(ev) {
                ev.stopPropagation();
            });          

            cadEdiCtrl.init = function(){
                cadEdiCtrl.getDadosIniciais();
            }


            cadEdiCtrl.getDadosIniciais = function(){  
                $rootScope.showLoading = true;              
                cadEdiService.listaInicial().then(function (listaResult) {
                    // console.log('listaResult', listaResult);
                    cadEdiCtrl.listaOcorrenciasTivit = listaResult.listaOcorrenciasTivit;
                    cadEdiCtrl.transportadoras = listaResult.listaTransp;
                    $rootScope.showLoading = false;                    
                }).catch(function (listaError) {
                    // console.log('listaError', listaError);
                    dialogService.alert(listaError);
                    $rootScope.showLoading = false; 
                });
            }
            cadEdiCtrl.getDadosChaveAcesso = function(){                
                cadEdiCtrl.edi.nfe = cadEdiService.extractDataFromChaveAcesso(cadEdiCtrl.edi.nfe)
            }
            cadEdiCtrl.saveEdi = function(){
                $rootScope.showLoading = true;              
                var user = JSON.parse(session.getData('authData'));                
                cadEdiCtrl.edi.user = user.user.id;
                cadEdiService.saveEdi(cadEdiCtrl.edi).then(function (saveResult) { 
                    // console.log('saveResult', saveResult);
                    $rootScope.showLoading = false;
                    $state.go('home');               
                }).catch(function (saveError) { 
                    // console.log('saveError', saveError);
                    dialogService.alert(saveError);
                    $rootScope.showLoading = false;                    
                });
            }
            cadEdiCtrl.setTranspRazao = function(){
                var razaoSocial = cadEdiCtrl.edi.nfe.cgcTransp.razao_social_transp;
                cadEdiCtrl.edi.nfe.razaoSocialTransp = text.textFixedSize(razaoSocial,40,' ');
            }

        }]);;angular.module('edi')
    .service('cadEdiService',
    ["$q", "$http", "db", "session", "$timeout", "dateService", "msgsService", function ($q, $http, db, session, $timeout, dateService, msgsService) {
            return {                
                extractDataFromChaveAcesso: function(nfe){                    
                    var cgcEmissor = nfe.chaveacesso.substr(6, 14);
                    var serieNfe = nfe.chaveacesso.substr(22, 3);
                    var numeroNfe = nfe.chaveacesso.substr(26, 8);
                    var dadosNFe = { 
                        "cgc": cgcEmissor, 
                        "serie": serieNfe, 
                        "numero": numeroNfe, 
                        "chaveacesso": nfe.chaveacesso,
                        "razaoSocialTransp": nfe.razaoSocialTransp,
                        "cgcTransp": nfe.cgcTransp
                    };
                    return dadosNFe;
                },
                saveEdi:function(ediData){
                    var ediToSaveProm = $q.defer();
                    var ediToSave = angular.copy(ediData);
                    ediToSave.dtOco = dateService.formatDateDB(ediToSave.dtOco);
                    db.dbActions('save', ediToSave, 'edi')
                        .then(function (saveResult) {
                            // console.log('salvando edi', saveResult);
                            ediToSaveProm.resolve(saveResult);
                        }).catch(function (saveError) {
                            // console.log('xii erro', saveError);
                            ediToSaveProm.reject(msgsService.getMsg('app', 3));
                        });
                    return ediToSaveProm.promise;
                },
                listaInicial:function(){
                    var listaInicialEdiProm = $q.defer();                                        
                    db.dbActions('lista', [], 'edi')
                        .then(function (listaResult) {
                            listaInicialEdiProm.resolve(listaResult);
                        }).catch(function (listaError) {
                            // console.log('xii erro', listaError);
                            listaInicialEdiProm.reject(msgsService.getMsg('app', 3));
                        });
                    return listaInicialEdiProm.promise;
                }
            }
        }]
    );angular.module('home')
    .controller('homeController',
    ["$state", "$scope", "text", "homeService", "dialogService", "$rootScope", "session", "$mdDialog", "time", "msgsService", "dateService", "$q", "tivitFileService", function ($state, $scope, text, homeService, dialogService, $rootScope, session, $mdDialog, time, msgsService, dateService, $q, tivitFileService) {
            var homeCtrl = this;
            homeCtrl.init = function(){
                // homeCtrl.loadInicial();
                // homeCtrl.progress = false;
            }
            homeCtrl.loadInicial = function(){
                $rootScope.showLoading = true;
                homeService.listaInicial().then(function (loadResult) { 
                    homeCtrl.ocorrencias = loadResult.listaOcorrenciasEdi;
                    homeCtrl.listaOcorrenciasTivit = loadResult.listaOcorrenciasTivit;
                    // console.log(loadResult);
                    $rootScope.showLoading = false;
                }).catch(function (loadError) { 
                    // console.log(loadError);
                    dialogService.alert(loadError);
                    $rootScope.showLoading = false; 
                });
            }
            homeCtrl.openNewOco = function(ocorrencia){   
                // console.log(ocorrencia);      
                homeCtrl.edi = ocorrencia;
                homeCtrl.dialog("novo");
            }
            homeCtrl.listOcoEDI = function(ocorrencia){                
                homeCtrl.listaOcorrencia = ocorrencia;          
                homeCtrl.dialog("lista");                
            }
            
            homeCtrl.dialog = function (dialog) { 
                var dialogs = { 
                    "lista":"modules/home/lista-ocorrencias.html",
                    "novo":"modules/home/nova-ocorrencia.html",
                };                
                return $mdDialog.show({
                    controller: ["copiaScope", function (copiaScope) {
                        return copiaScope;
                    }],
                    controllerAs: 'homeCtrl',
                    locals: {
                        copiaScope: homeCtrl
                    },
                    templateUrl: dialogs[dialog],
                    clickOutsideToClose: true
                });
            }

            homeCtrl.deletaOco = function(ocor){
                homeService.deleteOco(ocor)
                .then(function (deleteResult) { 
                    homeCtrl.closeModal();
                    homeCtrl.init();
                }).catch(function (deleteError) { 
                    console.log('deleteError', deleteError);
                    dialogService.alert(deleteError);
                });
            }

            homeCtrl.closeModal = function () {
                homeCtrl.ocor = null;                
                $mdDialog.hide();
            }
            homeCtrl.findOcorrenciaTivit = function(idOcorrenciaTivit){
                var ocorrenciaTivit = homeService.findOcorrenciaTivitById(homeCtrl.listaOcorrenciasTivit, idOcorrenciaTivit);
                return ocorrenciaTivit.cod+" - "+ocorrenciaTivit.desc_ocorrencias;
            }
            homeCtrl.gerarEdi = function(dadosOco,ocorrencia){
                ocorrencia.ocorr_data = homeService.findOcorrenciaTivitById(homeCtrl.listaOcorrenciasTivit, ocorrencia.fk_cod_oco_tivit);
                var content = tivitFileService.getContentTivit(dadosOco, ocorrencia);
                var nameFile = new Date();
                text.saveTxtFile("OCOBAN" + nameFile.getTime()+".txt", content);
            }
            homeCtrl.gerarEdiTodos = function(dadosOco){
                var nameFile = new Date();
                nameFile = nameFile.getTime();

                for (var i = 0; i < dadosOco.ocorrencias.length;i++){
                    dadosOco.ocorrencias[i].ocorr_data = homeService.findOcorrenciaTivitById(homeCtrl.listaOcorrenciasTivit, dadosOco.ocorrencias[i].fk_cod_oco_tivit);
                    var content = tivitFileService.getContentTivit(dadosOco, dadosOco.ocorrencias[i]);
                    text.saveTxtFile("OCOBAN" + nameFile +".txt", content);
                    nameFile = nameFile*1+1;
                }
            }
            homeCtrl.saveOcor = function(){
                var user = JSON.parse(session.getData('authData')); 
                homeCtrl.progress = true;
                homeCtrl.ocor.edi = homeCtrl.edi;
                homeCtrl.ocor.user = user.user.id;
                homeService.saveOco(homeCtrl.ocor).then(function (loadResult) {                   
                    homeCtrl.progress = false;  
                    homeCtrl.init();
                    setTimeout(function() {
                        homeCtrl.closeModal();
                        homeCtrl.ocor = null;
                    }, 500);                  
                }).catch(function (loadError) {
                    homeCtrl.progress = false;  
                    dialogService.alert(loadError);
                });
            }
        }]);;angular.module('home')
    .service('homeService',
    ["$q", "$http", "db", "session", "$timeout", "dateService", "msgsService", function ($q, $http, db, session, $timeout, dateService, msgsService) {
            return {                
                listaInicial: function () {
                    var listaInicialEdiProm = $q.defer();
                    db.dbActions('listaEdiOco', [], 'edi')
                        .then(function (listaResult) {
                            listaInicialEdiProm.resolve(listaResult);
                        }).catch(function (listaError) {
                            // console.log('xii erro', listaError);
                            listaInicialEdiProm.reject(msgsService.getMsg('app', 3));
                        });
                    return listaInicialEdiProm.promise;
                },
                findOcorrenciaTivitById:function(lista,id){
                    for (var i = 0; i < lista.length;i++){
                        if(lista[i].id==id){
                            return lista[i];
                        }
                    }
                },
                saveOco:function(ocorr){
                    var saveOcorProm = $q.defer();
                    var ediOcorToSave = angular.copy(ocorr);
                    ediOcorToSave.dtOco = dateService.formatDateDB(ocorr.dtOco);
                    db.dbActions('saveOcoEdi', ediOcorToSave, 'edi')
                        .then(function (saveOcorResult) {
                            saveOcorProm.resolve(saveOcorResult);
                        }).catch(function (saveOcorError) {
                            // console.log('xii erro', saveOcorError);
                            saveOcorProm.reject(msgsService.getMsg('app', 3));
                        });
                    return saveOcorProm.promise;
                },
                deleteOco:function(ocorr){
                    var deleteOcorProm = $q.defer();
                    db.dbActions('delete', ocorr, 'edi')
                        .then(function (deleteOcorResult) {
                            console.log('deleteOcorResult',deleteOcorResult);
                            if (deleteOcorResult.delete.length==0){
                                deleteOcorProm.resolve(deleteOcorResult);
                            }else{
                                deleteOcorProm.reject(msgsService.getMsg('app', 3));                                
                            }
                        }).catch(function (deleteOcorError) {
                            deleteOcorProm.reject(msgsService.getMsg('app', 3));
                        });
                    return deleteOcorProm.promise;
                }
            }
        }]
    );angular.module('tivit')
    .service('tivitFileService',
    ["$q", "$http", "db", "session", "$timeout", "dateService", "text", function ($q, $http, db, session, $timeout, dateService, text) {
            return {
                getContentTivit: function (ediData,ediOcorr) {
                    var unb = this.getUnb();
                    var unh = this.getUnh();
                    var tra = this.getTra(ediData, ediOcorr);
                    var oen = this.getOen(ediData, ediOcorr);
                    return unb + "\r\n" + unh + "\r\n" + tra + "\r\n" + oen;
                },
                getUnb:function(){
                    var unb = [];
                    var unbResult = "";
                    var dateTime = dateService.formatDateTimeDB(new Date());
                    dateTime = dateTime.split(' ');
                    date = dateTime[0].split('-');
                    time = dateTime[1].split(':');
                    unb[0] = "000";
                    unb[1] = "BANDEIRANTES LOGISTICA INTEGRADA   ";
                    unb[2] = "TITAN PNEUS                        ";
                    unb[3] = date[2] + date[1] + date[0].substring(2, 4);//date("dmy");
                    unb[4] = time[0]+time[1];//date("Hi");
                    unb[5] = "OCO" + date[2] + date[1] + unb[4]+"0";
                    unb[6] = "                         ";
                    for (var i = 0; i < unb.length; i++) {
                        unbResult+= unb[i];
                    }
                    return unbResult.substring(0, 120);
                },
                getUnh:function(){
                    var unh = [];
                    var unhResult = "";
                    var dateTime = dateService.formatDateTimeDB(new Date());
                    dateTime = dateTime.split(' ');
                    date = dateTime[0].split('-');
                    time = dateTime[1].split(':');
                    unh[0] = "340";
                    unh[1] = "OCORR" + date[2] + date[1] + time[0] + time[1] + "0";                    
                    unh[2] = "                                                                                                       ";
                    for (var i = 0; i < unh.length; i++) {
                        unhResult += unh[i];
                    }
                    return unhResult.substring(0, 120);
                },
                getTra: function (ediData, ediOcorr){
                    var tra = [];
                    var traResult = "";                    
                    tra[0] = "341";
                    tra[1] = text.textFixedSize(ediData.cgc_transp,14,"0",true);
                    tra[2] = text.textFixedSize(ediData.razao_social_transp,40," ");
                    tra[3] = "                                                               ";
                    for (var i = 0; i < tra.length; i++) {
                        traResult += tra[i];
                    }
                    return traResult.substring(0, 120);
                },
                getOen:function(ediData,ediOcorr){
                    var oen = [];
                    var oenResult = "";
                    var dtOcorrencia = ediOcorr.dt_oco.split('-').reverse().join('');
                    var hrOcorrencia = ediOcorr.hr_oco.split(':').join('');
                    oen[0] = "342";
                    oen[1] = text.textFixedSize(ediData.cgc_emissor,14,"0",true);
                    oen[2] = text.textFixedSize((ediData.serie_nfe*1)+"",3," ");                    
                    oen[3] = text.textFixedSize(ediData.numero_nfe,8,"0",true);
                    oen[4] = text.textFixedSize(ediOcorr.ocorr_data.cod,2,"0",true);
                    oen[5] = text.textFixedSize(dtOcorrencia,8,"0",true);
                    oen[6] = text.textFixedSize(hrOcorrencia,4,"0",true);
                    oen[7] = "00";
                    oen[8] = "                                                                      ";
                    oen[9] = "0000";
                    oen[10] = "  ";
                    for (var i = 0; i < oen.length; i++) {
                        oenResult += oen[i];
                    }
                    return oenResult;
                }
            }
        }]
    );angular.module('meusDados')
    .controller('meusDadosController',
        ["$scope", "meusDadosService", "dialogService", "session", "$mdDialog", "msgsService", "$state", function($scope, meusDadosService, dialogService, session, $mdDialog, msgsService, $state) {
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
        }]);;angular.module('meusDados')
    .service('meusDadosService', ["$q", "$http", "db", "session", function($q, $http, db, session) {
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
    }]);angular.module('menu')
    .controller('menuController',
        ["$mdBottomSheet", "$scope", "$mdSidenav", "$log", "$state", "$rootScope", "session", function ($mdBottomSheet,$scope, $mdSidenav, $log, $state, $rootScope, session) {
            $scope.init = function() {
                var login = JSON.parse(session.getData('authData'));
                $scope.user = login.user;
                // $scope.showMenus = JSON.parse(session.getData('configs'));
            }               
            $scope.close = function(menuClose) {
                $mdSidenav(menuClose).close()
                    .then(function() {
                        $log.debug("close LEFT is done");
                    }).catch(function(evt) {
                        console.log(evt);
                    });
            }

            $scope.toogleSideNav = function(menuClose) {
                $mdSidenav(menuClose).toggle();
                setTimeout(function() {
                    $scope.$broadcast('reCalcViewDimensions');
                }, 1)
            }

            $scope.goto = function(state) {
                if (state == "exit") {
                    sessionStorage.clear()
                    $state.go("initial");
                }
                $state.go(state);
                $scope.close('left');
            }
        }]
    );;angular.module('admin')
    .controller('adminController',
        ["$state", "$scope", "session", function($state, $scope, session) {
            $scope.init = function() {
                $scope.maxDate = new Date();                
                $scope.inicial = new Date();
                $scope.final = new Date();
            }
        }]);;angular.module('admin')
    .service('adminService',
        ["$q", "$http", "db", "session", "$timeout", function($q, $http, db, session, $timeout) {
            return {
                admin: function() {    
                    return 'oi'                ;
                }
            }
        }]
    );angular.module('dbServer')
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
    ]);angular.module('bandEdi')
    .service('appUrls', ["session", function(session) {
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
    }]);angular.module('bandEdi')
    .service('dialogService', ['$mdDialog', '$rootScope', '$q',
        function($mdDialog, $rootScope, $q) {
            // msgsService
            return {
                alert: function(msg) {
                    $mdDialog.show(
                        $mdDialog.alert()
                        // .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Mensagem')
                        .textContent(msg)
                        // .ariaLabel('Alert Dialog Demo')
                        .ok('Ok')
                        // .targetEvent(alert('asdasd'))
                    );
                },
                confirm: function(confirmeJson) {
                    // var confirmeJson = {
                    //     "title": "Algo aconteceu!",
                    //     "content": validacaoErro.msgRetorno,
                    //     "buttonOk": "Ok",
                    // 	   "buttonCancel":"Cancel"
                    // };				
                    var confirmProm = $q.defer();
                    var confirm;

                    if (confirmeJson.buttonCancel != undefined) {
                        confirm = $mdDialog.confirm();
                        confirm.cancel(confirmeJson.buttonCancel);
                    } else {
                        confirm = $mdDialog.alert();
                    }

                    confirm.title(confirmeJson.title)
                        .textContent(confirmeJson.content)
                        .ariaLabel(confirmeJson.label)
                        .ok(confirmeJson.buttonOk);

                    $mdDialog.show(confirm).then(function() {
                        confirmProm.resolve(true);
                    }, function() {
                        confirmProm.reject(false);
                    });

                    return confirmProm.promise;
                },
                loading: function(paramLoading) {

                    if (paramLoading == 'hide') {
                        $mdDialog.hide();
                        return;
                    }

                    // var msg = msgsService.getMsg('app', '4');

                    $mdDialog.show({
                        template: '<div id="loading">' +
                            '<div class="contain-animation">' +
                            '<div class="contain-bear">' +
                            '<img class="prints" src="img/loading/pawprints.svg" alt="Bear Prints" />' +
                            '<span class="cover"></span>' +
                            '</div>' +
                            '</div>' +
                            '</div>',
                        parent: angular.element(document.body),
                        clickOutsideToClose: false,
                        fullscreen: false,
                        escapeToClose: false
                    });


                },
                openNewWindow: function(url) {
                    window.open(url, '_blank', 'location=yes,scrollbars=yes,status=yes')
                }
            }
        }
    ]);angular.module('bandEdi')
    .service('errorRequestService', ['msgsService',
        function(msgsService) {
            return {
                getMsg: function(status) {
                    switch (status) {
                        case 408:
                            return msgsService.getMsg('app', '2');
                        default:
                            return msgsService.getMsg('app', '3');
                    }
                }
            }
        }
    ]);angular.module('bandEdi')
    .service('msgsService', [function() {
        return {
            getIdioma: function() {
                var idioma = sessionStorage.getItem('idioma');
                if (idioma == undefined || idioma == null) {
                    idioma = "portugues";
                }
                return idioma;
            },
            getMsg: function(modulo, idMsg) {
                var idioma = this.getIdioma();
                var msgs = {
                    "portugues": {
                        "usuario": {
                            "1": "Usuário ou senha incorretos, por favor tente novamente!",
                            "2": "Usuário já cadastrado!",
                            "3": "Usuário removido!",
                            "4": "Usuário não possui acesso!",
                            "5": "Usuário ainda não está cadastrado, realize seu cadastro!",
                            "6": "Token invalido, por favor solicite uma nova recuperação de senha!"
                        },
                        "app": {
                            "1": "Dados salvos com sucesso!",
                            "2": "Problemas de conexão com a internet. Por favor, tente novamente mais tarde!",
                            "3": "Ocorreu um erro inesperado. Por favor, tente novamente ou contate nosso suporte!",
                            "4": "Por favor, aguarde...",
                            "5": "Dados de sessão corrompidos. Por favor, faça o login novamente!",
                            "6": "Preencha todos os campos corretamente!",
                            "7": "Tipo de arquivo inválido!",
                            "8": "Não foram encontrados dados para os filtros selecionados!",
                            "10": "Nenhum dado encontrado!",
                            "11": "E-mail enviado com sucesso!"
                        },
                        "avaliacao-reacao":{
                            "1": "Obrigado por contribuir com sua opinião. A partir de agora você já está habilitado a fazer a avaliação!",
                            "2": "Você já envio suas opinões para esse treinamento!"
                        }
                    },
                    "ingles": {
                        "usuario": {
                            "1": "Incorrect CPF or password, please try again!"
                        },
                        "app": {
                            "1": "Data saved successfully!",
                            "2": "Problems connecting to the internet. Please try again later!",
                            "3": "An unexpected error has occurred. Please try again or contact our support!",
                            "4": "Please wait...",
                            "5": "Session data corrupted. Please, login again!",
                            "6": "Complete all the fields correctly!",
                            "7": "Invalid file type!",
                            "8": "No data was found for the selected filters!",
                            "10": "No data found, please try again later!"
                        }
                    },
                    "espanhol": {
                        "usuario": {
                            "1": "CPF o contraseña incorrecta, por favor inténtelo de nuevo!"
                        },
                        "app": {
                            "1": "Datos guardados con éxito!",
                            "2": "Problemas de conexión a Internet. Por favor, inténtelo de nuevo más tarde!",
                            "3": "Se ha producido un error inesperado. Por favor, inténtelo de nuevo o contacte nuestro soporte!",
                            "4": "Por favor, espere ...",
                            "5": "Datos de sesión dañados. Por favor, inicie sesión de nuevo!",
                            "6": "Rellena todos los campos correctamente!",
                            "7": "Tipo de archivo no válido!",
                            "8": "No se han asignado datos a los filtros seleccionados!",
                            "10": "Ningún dato encontrado, vuelva a intentarlo más tarde!"
                        }
                    }
                };
                return msgs[idioma][modulo][idMsg];
            }
        }
    }]);angular.module('mapsService')
    .service('maps', ['$q',
        function($q) {
            return {
                getCurrentLocation: function() {
                    var locationProm = $q.defer();
                    var location = {};
                    if (!navigator.geolocation) {
                        location.error = 'Navegador não suporta localização!';
                        locationProm.reject(location);
                    }

                    navigator.geolocation.getCurrentPosition(function(position) {
                        location.lat = position.coords.latitude;
                        location.lng = position.coords.longitude;
                        locationProm.resolve(location);
                    }, function(error) {
                        location.error = 'Problemas na hora de pegar localização!';
                        locationProm.reject(location);
                    });

                    return locationProm.promise;
                }
            }
        }
    ]);angular.module('bandEdi')
    .service('session', ['msgsService', '$state', 'dialogService',
        function(msgsService, $state, dialogService) {
            return {
                setData: function(nameData, data) {
                    try {
                        sessionStorage.setItem(nameData, btoa(data));
                        return true;
                    } catch (error) {
                        throw error;
                    }
                },
                getData: function(nameData) {
                    try {
                        if (!sessionStorage.getItem(nameData)) {
                            throw msgsService.getMsg('app', '5');
                        }
                        return atob(sessionStorage.getItem(nameData));
                    } catch (error) {
                        throw msgsService.getMsg('app', '5');
                    }
                },
                valideSession: function(state) {
                    try {
                        if (!sessionStorage.getItem('tokenData')) {
                            this.brokedSession();
                            return false;
                        }else{
                            var acessos = JSON.parse(this.getData('configs'));
                            var acessa = false;
                            for (var i = 0; i < acessos.length;i++){
                                if (acessos[i].state==state){
                                    acessa = true;                                    
                                }
                            }
                            if(!acessa){
                                $state.go('home');                                                                                        
                            }
                            return acessa;
                        }
                        return true;
                    } catch (error) {
                        msgsService.getMsg('app', '5');
                    }
                },
                clear: function() {
                    sessionStorage.clear();
                },
                brokedSession: function(){
                    dialogService.alert(msgsService.getMsg('app', '5'));
                    sessionStorage.clear();
                    $state.go('initial');   
                }
            }
        }
    ]);angular.module('timeService')
    .service('time', [function () {
        return {
            StringToNumber: function (timeString) {
                var horas = timeString.split(':');
                var segundos = (horas[2] == undefined) ? null : horas[2] * 1;
                return { "horas": horas[0] * 1, "minutos": horas[1] * 1, "segundos": segundos };
            },
            numberToString: function (timeObject) {
                timeObject.horas = timeObject.horas * 1;
                var horas = "" + timeObject.horas;
                horas = horas.length == 1 ? "0" + horas : horas;

                timeObject.minutos = timeObject.minutos * 1;
                var minutos = "" + timeObject.minutos;
                minutos = minutos.length == 1 ? "0" + minutos : minutos;

                var segundos = (timeObject.segundos == undefined || timeObject.segundos == null) ? "" : timeObject.segundos;
                segundos = "" + (segundos.length < 1 ? "" : segundos * 1);
                segundos = segundos.length == 1 ? "0" + segundos : segundos;
                segundos = segundos.length > 1 ? ":" + segundos : "";

                return horas + ":" + minutos + segundos;
            },
            formatCalcDatesResult: function (resultCalc) {
                var secondsFromCalc = parseInt((resultCalc * 60) * 60, 10);
                var hours = Math.floor(secondsFromCalc / 3600);
                var minutes = Math.floor((secondsFromCalc - (hours * 3600)) / 60);
                var seconds = secondsFromCalc - (hours * 3600) - (minutes * 60);
                // hours = hours < 10 ? "0" + hours : hours;
                // minutes = minutes < 10 ? "0" + minutes : minutes;
                // seconds = seconds < 10 ? "0" + seconds : seconds;
                if (hours < 10) { hours = "0" + hours; }
                if (minutes < 10) { minutes = "0" + minutes; }
                if (seconds < 10) { seconds = "0" + seconds; }

                return hours + ':' + minutes + ':' + seconds;
            },
            newDateToIe: function (date) {
                // hack necessário para corrigir falha no internet explorer em interpretação de datas

                var date = date.split('-');
                var dates = date[2].split(' ');
                var hours = dates[1].split(':');

                date[0] = Math.floor(("" + date[0]).replace(/[^0-9]/gi, ""));
                date[1] = Math.floor(("" + date[1]).replace(/[^0-9]/gi, "")) - 1;
                dates[0] = Math.floor(("" + dates[0]).replace(/[^0-9]/gi, ""));
                hours[0] = Math.floor(("" + hours[0]).replace(/[^0-9]/gi, ""));
                hours[1] = Math.floor(("" + hours[1]).replace(/[^0-9]/gi, ""));
                var arrayDate = [date[0], date[1], dates[0], hours[0], hours[1], 0];
                return arrayDate;
            },
            secondsToStringMin:function(secondsToConvert){
                var minutes = Math.floor(secondsToConvert / 60);
                var seconds = Math.floor(secondsToConvert - (minutes * 60));
                minutes = minutes.toString().length<=1?'0'+minutes:minutes;
                seconds = seconds.toString().length <= 1 ? '0' + seconds : seconds;                
                return { "minutes": minutes,"seconds":seconds};
            },
            toCurrentYearFrom:function(fromYear){
                var toCurrentYear = new Date().getFullYear();
                var years = [];                
                do{
                    years.push(fromYear * 1);
                    fromYear++;
                } while (fromYear <= toCurrentYear);                
                return years;
            }
        }
    }]);angular.module('textService')
    .service('text', [function () {
        return {
            textFixedSize: function (text,maxsize,completewith,reverse) {
                if (text.length >= maxsize) {
                    text = text.substr(0, maxsize);
                } else {
                    if (reverse==true){
                        for (var i = text.length; i < maxsize; i++) {
                            text = completewith + text;
                        }
                    }else{
                        for (var i = text.length; i < maxsize; i++) {
                            text += completewith;
                        }
                    }
                }
                return text;
            },
            saveTxtFile:function(name,content){
                var createdFile = document.createElement('a');                
                var file = new Blob([content], { type: 'text/plain' });
                createdFile.href = URL.createObjectURL(file);
                createdFile.download = name;
                setTimeout(function(){
                    createdFile.click();
                },100);
            }
        }
    }]);angular.module('bandEdi')
    .service('auth', ["session", "$q", "$http", "$state", "appUrls", "msgsService", function (session, $q, $http, $state, appUrls, msgsService) {
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
    }]);angular.module('bandEdi')
    .service('dateService', [function() {
        return {
            formatDateDB: function(date) {

                var optionsDate = { year: 'numeric', month: 'numeric', day: 'numeric' };
                var resultFinal = date.toLocaleDateString('pt-BR', optionsDate)
                    .replace('BRT', '')
                    .trim().split('/').reverse().join('-')
                return resultFinal;

            },
            formatDateTimeDB: function(date) {

                var optionsDate = { timeZone: 'America/Sao_Paulo', year: 'numeric', month: 'numeric', day: 'numeric' };
                var optionsTime = { timeZone: 'America/Sao_Paulo', hour: 'numeric', minute: 'numeric', second: 'numeric' };

                var dtStr = date.toLocaleDateString('pt-BR', optionsDate)
                    .replace('BRT', '')
                    .trim().split('/').reverse().join('-');


                var timeStr = date.toLocaleTimeString('pt-BR', optionsTime).replace('BRT', '').trim();

                return dtStr + ' ' + timeStr;
            },
            formatDateHeader: function(date){
                var toGetMonth = new Date(date);
                var month = toGetMonth.toLocaleString("pt-br", { month: "long" });
                var arrayDate = date.split('-');                
                return arrayDate[2] + ' de ' + month + ' de ' + arrayDate[0];
            }
        }
    }]);angular.module('bandApiService')
    .service('api', ["session", "$q", "$http", "$state", "appUrls", "msgsService", function (session, $q, $http, $state, appUrls, msgsService) {
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
    }]);angular.module('text')
    .directive('reduceDesc', function () {
        return function (scope, elm, attr) {
            console.log(scope, elm, attr);                
        };
    }).directive('numbers', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                function fromUser(text) {
                    if (text) {
                        var transformedInput = text.replace(/[^0-9]/g, '');

                        if (transformedInput !== text) {
                            ngModelCtrl.$setViewValue(transformedInput);
                            ngModelCtrl.$render();
                        }
                        return transformedInput;
                    }
                    return undefined;
                }
                ngModelCtrl.$parsers.push(fromUser);
            }
        };
    }).directive('uppercase', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                var uppercase = function (inputValue) {
                    if (inputValue == undefined) inputValue = '';
                    var uppercased = inputValue.toUpperCase();
                    if (uppercased !== inputValue) {
                        // see where the cursor is before the update so that we can set it back
                        var selection = element[0].selectionStart;
                        modelCtrl.$setViewValue(uppercased);
                        modelCtrl.$render();
                        // set back the cursor after rendering
                        element[0].selectionStart = selection;
                        element[0].selectionEnd = selection;
                    }
                    return uppercased;
                }
                modelCtrl.$parsers.push(uppercase);
                uppercase(scope[attrs.ngModel]); // uppercase initial value
            }
        };
    });;angular.module('timeService')
    .directive('hours', function () {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, modelCtrl) {                            
                modelCtrl.$parsers.push(function (number) {
                    document.onkeypress = function (e) {
                        var deleted = (e.keyCode == 8 || e.keyCode == 46) ? true : false;
                        if (number.length == 2 && !deleted) {
                            number = number + ':';
                        }
                        modelCtrl.$setViewValue(number);
                        modelCtrl.$render();
                    }  

                    number = number.replace(/[^\dh:]/, "");
                    number = number.replace(/^[^0-2]/, "");
                    number = number.replace(/^([2-9])[4-9]/, "$1");
                    number = number.replace(/^\d[:h]/, "");
                    number = number.replace(/^([01][0-9])[^:h]/, "$1");
                    number = number.replace(/^(2[0-3])[^:h]/, "$1");
                    number = number.replace(/^(\d{2}[:h])[^0-5]/, "$1");
                    number = number.replace(/^(\d{2}h)./, "$1");
                    number = number.replace(/^(\d{2}:[0-5])[^0-9]/, "$1");
                    number = number.replace(/^(\d{2}:\d[0-9])./, "$1");
                    transformedNumber = number;    
                                  
                    modelCtrl.$setViewValue(transformedNumber);
                    modelCtrl.$render();
                    return transformedNumber;
                });
            }
        };
    });;angular.module('bandEdi')
    .filter('capitalize', [function() {
        return function(input) {
            return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
        }
    }]);;angular.module('bandEdi')
    .filter('dtBrFormat', [function() {
        return function(data) {
            // Para funcionar com: STRING && ( DB DATE FORMAT || DB DATE TIME FORMAT )
            if (data != undefined && data.length <= 10) {
                return data.split('-').reverse().join('/')
            } else if (data != undefined && data.length > 10) {
                var dtToReturn = '';
                var dtSplit = data.split(' ');

                dtToReturn = dtSplit[0].split('-').reverse().join('/')
                dtToReturn += ' ' + dtSplit[1];
                return dtToReturn;
            }

        };
    }])