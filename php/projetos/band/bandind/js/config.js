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

.config(function($mdThemingProvider, $stateProvider, $urlRouterProvider, $mdDateLocaleProvider) {



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

}).run(function($rootScope, $state, session) {

    var routerWithLogin = ['home', 'menu', 'meusDados','cadEdi'];

    $rootScope.$on('$locationChangeSuccess', function(event, next, current) {
        for (var route in routerWithLogin) {
            if (next.indexOf(routerWithLogin[route]) > -1) {
                session.valideSession(routerWithLogin[route]);
                break;
            }
        }
    })
});