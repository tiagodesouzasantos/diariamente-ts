angular.module('treinamento')
    .service('avaliacaoService', 
    function ($q, $http, db, session, time, msgsService) {
            return {
                saveQuestoesAR: function (respostas) {
                    var avaliacaoReacaoProm = $q.defer();
                    db.dbActions('saveQuestoesAR', respostas, 'avaliacoesReacao')
                        .then(function (avaliacaoReacaoResult) {
                            console.log('avaliacaoReacaoResult', avaliacaoReacaoResult);
                            if (avaliacaoReacaoResult.enviado) {
                                avaliacaoReacaoProm.resolve(msgsService.getMsg('avaliacao-reacao', 1));
                            } else {
                                avaliacaoReacaoProm.reject(msgsService.getMsg('avaliacao-reacao', 2));
                            }
                        }).catch(function (avaliacaoReacaoError) {
                            console.log('avaliacaoReacaoError', avaliacaoReacaoError);
                            avaliacaoReacaoProm.reject(msgsService.getMsg('app', 3));
                        });
                    return avaliacaoReacaoProm.promise;
                },
                getQuestoesAR: function (treinamento) {
                    var avaliacaoReacaoProm = $q.defer();
                    db.dbActions('lista', treinamento, 'avaliacoesReacao')
                        .then(function (avaliacaoReacaoResult) {
                            avaliacaoReacaoProm.resolve(avaliacaoReacaoResult);
                        }).catch(function (avaliacaoReacaoError) {
                            console.log('lista-avaliacoes-error', avaliacaoReacaoError);
                            avaliacaoReacaoProm.reject(msgsService.getMsg('app', 3));
                        });
                    return avaliacaoReacaoProm.promise;
                },
                getAvaliacao:function(treinamento){
                    var avaliacaoProm = $q.defer();
                    treinamento.usuario = JSON.parse(session.getData('authData'));
                    db.dbActions('getAvaliacao', treinamento, 'avaliacoes')
                        .then(function (avaliacaoResult) {
                            avaliacaoProm.resolve(avaliacaoResult);
                        }).catch(function (avaliacaoError) {
                            console.log('getAvaliacao-error', avaliacaoError);
                            avaliacaoProm.reject(msgsService.getMsg('app', 3));
                        });
                    return avaliacaoProm.promise;
                },
                calculaResultado: function (treinamento) {
                    var qtdPerguntas = treinamento.perguntas.length;
                    var corretas = 0;
                    for (var i = 0; i < qtdPerguntas; i++) {
                        corretas = corretas + treinamento.perguntas[i].resultado
                    }
                    var media = (corretas * 100) / qtdPerguntas;
                    treinamento.resultado.aprovado = media >= treinamento.minimo?true:false;
                    treinamento.resultado.aproveitamento = media;
                    return treinamento;
                },
                saveResultado: function (treinamento){
                    var avaliacaoProm = $q.defer();
                    treinamento.usuario = JSON.parse(session.getData('authData'));
                    db.dbActions('saveAvaliacao', treinamento, 'avaliacoes')
                        .then(function (avaliacaoResult) {
                            console.log('avaliacaoResult', avaliacaoResult);
                            avaliacaoProm.resolve(avaliacaoResult.avaliacao);
                        }).catch(function (avaliacaoError) {
                            console.log('getAvaliacao-error', avaliacaoError);
                            avaliacaoProm.reject(msgsService.getMsg('app', 3));
                        });
                    return avaliacaoProm.promise;
                }
            }
        }
    )