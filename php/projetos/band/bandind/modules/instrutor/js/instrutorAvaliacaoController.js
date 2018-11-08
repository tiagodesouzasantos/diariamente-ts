angular.module('instrutor')
    .controller('instrutorAvaliacaoController',
        function($state, session) {
            var instAvalCtrl = this;
            instAvalCtrl.init = function (a) {
                console.log('instrutorAvaliacaoController');
                // instCtrl.init();
            }
            instAvalCtrl.getListaAvaliacao = [
                {"id":"1","desc":"PROVA1"},
                {"id":"2","desc":"PROVA2"},
                {"id":"3","desc":"PROVA3"},
                {"id":"4","desc":"PROVA4"},
                {"id":"5","desc":"PROVA5"},
                {"id":"6","desc":"PROVA6"},
                {"id":"7","desc":"PROVA7"},
                {"id":"8","desc":"PROVA8"},
                {"id":"4","desc":"PROVA4"},
                {"id":"5","desc":"PROVA5"},
                {"id":"6","desc":"PROVA6"},
                {"id":"7","desc":"PROVA7"},
                {"id":"8","desc":"PROVA8"},
                {"id":"4","desc":"PROVA4"},
                {"id":"5","desc":"PROVA5"},
                {"id":"6","desc":"PROVA6"},
                {"id":"7","desc":"PROVA7"},
                {"id":"8","desc":"PROVA8"},
                {"id":"9","desc":"PROVA9"},
                {"id":"10","desc":"PROVA10"},
                {"id":"11","desc":"PROVA11"},
                {"id":"12","desc":"PROVA12"},
                {"id":"13","desc":"PROVA13"},
                {"id":"14","desc":"PROVA14"}
            ];
            instAvalCtrl.getListaAvaliacao2 = [
                {"id":"1","desc":"PROVA1"},
                {"id":"2","desc":"PROVA2"},
                {"id":"3","desc":"PROVA3"},
                {"id":"4","desc":"PROVA4"}
            ];
            
        });