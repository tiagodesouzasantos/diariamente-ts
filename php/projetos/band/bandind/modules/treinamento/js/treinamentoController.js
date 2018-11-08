angular.module('treinamento')
    .controller('treinamentoController',
    function ($filter, $timeout, $scope, dialogService, $rootScope, $mdDialog, $stateParams, $state, treinamentoService, dateService, $location, $http, session, avaliacaoService, time) {
        $scope.init = function () {
            $scope.hasParam();            
            var colaborador = JSON.parse(session.getData('authData'));
            $scope.colaborador = colaborador.user;
            $scope.candidatarBtn = treinamentoService.candidaturaHabilitada($scope.treinamento);
            $scope.desCandidatarBtn = treinamentoService.desCandidatarHabilitado($scope.colaborador, $scope.treinamento);
            $scope.initVars();
            $scope.getAvaliacaoReacao();
        }
    
        $scope.initVars = function(){
            $scope.selectedTab = 0;
            $scope.certificadoCanvas = "";
            $scope.classTableRow = true;
            $scope.botaoResposta = [];
            $scope.perguntaLiberada = [];
            $scope.iniciarTeste = false;
            $scope.currentTimeOut = {};
            $scope.avaliacaoRespostas = [];
            $scope.showCertificado = false;
            $scope.showAvaliacao = false;
            $scope.showAvaliacaoReacao = false;
            $scope.opiniaoDisserta = {};
        }

        $scope.hasParam = function () {
            if ($stateParams.treinamento == undefined || $stateParams.treinamento == null) {
                $state.go('home');
            } else {
                $scope.treinamento = $stateParams.treinamento;
            }
        }
        // ####################################
        // FICHA TECNICA
        // ####################################
        $scope.candidatura = function (acao) {
            if (acao == 'cancelar') {
                var confirmeJson = {
                    "title": "Informação!",
                    "content": "Deseja realmente cancelar a inscrição?",
                    "buttonOk": "Sim",
                    "buttonCancel": "Não"
                };
            } else {
                var confirmeJson = {
                    "title": "Informação!",
                    "content": "Candidate-se somente se tiver realmente certeza do seu comparecimento!",
                    "buttonOk": "Candidatar",
                    "buttonCancel": "Desistir"
                };
            }
            dialogService.confirm(confirmeJson);
        }
        // ####################################
        // CERTIFICADOS
        // ####################################
        $scope.dataCabecalho = function (data) {
            return dateService.formatDateHeader(data);
        }
        $scope.conteudoProgClass = function () {
            $scope.classTableRow = !$scope.classTableRow;
            return $scope.classTableRow ? 'alter-row' : '';
        }
        $scope.generatePic = function () {
            $rootScope.showLoading = true;
            var certificadoDiv = document.querySelector("#certificado");
            kendo.drawing
                .drawDOM(certificadoDiv,
                    {
                        forcePageBreak: ".page-break",
                        paperSize: "A4",
                        scale: 1,
                        height: 595,
                        landscape: true
                    })
                .then(function (group) {
                    $rootScope.showLoading = false;
                    kendo.drawing.pdf.saveAs(group, "Certificado " + $scope.treinamento.nome + ".pdf");
                });
        }
        // ####################################
        // AVALIAÇÃO
        // ####################################
        $scope.getAvaliacao = function(){                            
            $scope.showAvaliacao = false;
            avaliacaoService.getAvaliacao($scope.treinamento)
                .then(function (getAvaliacaoResult) {                     
                    if (getAvaliacaoResult.listaAvaliacao.length>0){
                        $scope.ativaAvaliacao(getAvaliacaoResult);
                    }
                }).catch(function (getAvaliacaoError) {
                    console.log("getAvaliacaoError", getAvaliacaoError);
                });
        }
        $scope.ativaAvaliacao = function(treinamento){
            var avRealizadas = treinamento.avaliacaoRealizada;
            var listaAv = treinamento.listaAvaliacao;
            if (avRealizadas.length>0){
                if (avRealizadas.length < listaAv.length){
                    for (var i = 0; i < avRealizadas.length; i++) {
                        for (var x = 0; x < listaAv.length; x++) {
                            if (avRealizadas[i].fk_avaliacao_prova == listaAv[x].idProva) {
                                if ((avRealizadas[i].aproveitamento * 1) >= listaAv[x].minimo) { 
                                    $scope.avaliacao = listaAv[x];
                                    $scope.openCertificado();
                                    break;
                                } else {
                                    // console.log(avRealizadas, x);
                                    if (x < (listaAv.length-1)){
                                        $scope.avaliacao = treinamento.listaAvaliacao[x+1];
                                        $scope.avaliacao.resultado = {};                                     
                                        $scope.showAvaliacao = true;
                                        $scope.getInfoAvaliacao($scope.avaliacao);
                                    }
                                }
                            }
                        }
                    }
                }else{
                    $scope.avaliacao = listaAv[(listaAv.length-1)];
                    var ultimaAvaliacao = avRealizadas[(avRealizadas.length-1)];
                    $scope.avaliacao.resultado = {};
                    $scope.avaliacao.resultado.aprovado = ultimaAvaliacao.aprovado=="1"?true:false;
                    $scope.avaliacao.resultado.aproveitamento = ultimaAvaliacao.aproveitamento;
                    console.log($scope.avaliacao);
                    $scope.openCertificado();
                }
            }else{
                if (!$scope.showAvaliacaoReacao){
                    $scope.avaliacao = treinamento.listaAvaliacao[0];     
                    $scope.avaliacao.resultado = {};                                                                
                    $scope.showAvaliacao = true;
                    $scope.selectedTab = 2;
                    $rootScope.showLoading = false;                    
                    $scope.getInfoAvaliacao($scope.avaliacao);
                }
            }
        }
        $scope.getInfoAvaliacao = function(avaliacao){            
            var tempoMaximo = 0;
            for (var i = 0; i < avaliacao.perguntas.length;i++){
                tempoMaximo += avaliacao.perguntas[i].tempo;
            }
            var tempoMedio = time.secondsToStringMin(tempoMaximo / avaliacao.perguntas.length);
            tempoMaximo = time.secondsToStringMin(tempoMaximo);
            $scope.infoTreinamento = {
                "qtdQuestoes": avaliacao.perguntas.length,
                "tempoMaximo": tempoMaximo.minutes + "m" + tempoMaximo.seconds+"s",
                "tempoMedio": tempoMedio.minutes + "m" + tempoMedio.seconds + "s"
            };
            // console.log(avaliacao);
            // console.log('maximo', time.secondsToStringMin(tempoMaximo));
            // console.log('medio', time.secondsToStringMin(tempoMaximo / avaliacao.perguntas.length));
        }
        $scope.enviarResposta = function(pergunta,resposta,id){
            if (resposta && $scope.botaoResposta[id]=='blue-btn'){
                $timeout.cancel($scope.currentTimeOut);                    
                $scope.botaoResposta[id] = 'loading';
                $timeout(function(){
                    pergunta.resultado = pergunta.correta == resposta[id]?1:0;
                    $scope.botaoResposta[id] = 'green-btn'; 
                    $timeout(function () {
                        id++;
                        $scope.startCount(id);
                        $scope.perguntaLiberada[id] = true;
                        $scope.perguntaLiberada[(id - 1)] = false;     
                    },2000);                                               
                },500);
            }
        }
        $scope.startTest = function(){
            $scope.perguntaLiberada[0] = true;
            $timeout(function () {
                $scope.startCount(0);
            }, 700)
        }
        $scope.startCount = function(id){    
            var qtdPerguntas = $scope.avaliacao.perguntas.length;
            if (id < qtdPerguntas) {                      
                if ($scope.avaliacao.perguntas[id].tempo>0){
                    $scope.currentTimeOut = 
                    $timeout(function(){
                        $scope.avaliacao.perguntas[id].tempo--;
                        $scope.startCount(id);
                    },1000);
                }else{                    
                    $scope.currentTimeOut = 
                    $timeout(function () {
                        $scope.enviarResposta(
                            $scope.avaliacao.perguntas[id], 
                            $scope.avaliacaoRespostas,
                            id
                        );
                    }, 500);
                }
            }else{
                var calcResultado = avaliacaoService.calculaResultado($scope.avaliacao);
                var saveAvaliacao = avaliacaoService.saveResultado(calcResultado);
                saveAvaliacao.then(function (avaliacaoSaveResult) { 
                    console.log('avaliacaoSaveResult', avaliacaoSaveResult);
                    $scope.avaliacao.resultado.aprovado = calcResultado.resultado.aprovado;
                    $scope.avaliacao.resultado.aproveitamento = calcResultado.resultado.aproveitamento;
                }).catch(function (avaliacaoSaveError) { 
                    console.log('avaliacaoSaveError', avaliacaoSaveError);
                });                
            }   
        }
        $scope.openCertificado = function(){
            $scope.showCertificado = true;
            $scope.showAvaliacao = false;
            $scope.showAvaliacaoReacao = false;
            $timeout(function(){
                $scope.selectedTab = 3;
            });
        }
        // ####################################
        // AVALIAÇÃO REAÇÃO
        // ####################################
        $scope.saveAr = function(){
            $scope.loadingSaveAr = true;
            var saveArData = {
                "opiniaoDisserta": $scope.opiniaoDisserta,
                "perguntasAr": $scope.treinamento.perguntasAR,
                "treinamento": $scope.treinamento,
                "usuario": $scope.colaborador
            };            
            avaliacaoService.saveQuestoesAR(saveArData)
                .then(function (savearResult) {
                    $scope.loadingSaveAr = false;
                    var confirmeJson = { "title": "Parabéns!", "content": savearResult, "buttonOk": "Ok", "buttonCancel": undefined };
                    dialogService.confirm(confirmeJson).then(function () {
                        $scope.showAvaliacaoReacao = false;
                        $rootScope.showLoading = true;                                            
                        $scope.getAvaliacao();
                    });
                }).catch(function (savearError) {
                    var confirmeJson = { "title": "Problemas!", "content": savearError, "buttonOk": "Ok", "buttonCancel": undefined };
                    dialogService.confirm(confirmeJson).then(function () {                            
                    });
                });                
        }

        $scope.getAvaliacaoReacao = function () {
            $rootScope.showLoading = true;            
            avaliacaoService.getQuestoesAR({                
                "treinamento": $scope.treinamento,
                "usuario": $scope.colaborador
            })
                .then(function (result) {
                    $rootScope.showLoading = false;                    
                    $scope.treinamento.perguntasAR = result.avaliacaoReacao;
                    $scope.showAvaliacaoReacao = !result.respondido;
                    $scope.getAvaliacao();                    
                    // $scope.showAvaliacao = result.respondido;
                }).catch(function (error) {
                    console.log('getAvaliacaoReacao',error);
                    var confirmeJson = { "title": "Problemas!", "content": error, "buttonOk": "Ok", "buttonCancel": undefined };
                    dialogService.confirm(confirmeJson);
                });
        }

    }
);