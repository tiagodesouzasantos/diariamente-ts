angular.module('treinamento')
    .service('treinamentoService', 
        function ($q, $http, db, session, time, msgsService) {
            return {                
                candidaturaHabilitada:function(treinamento){
                    var habilitada = false;
                    var validacoes = ["treinamentoValidaData","lotacaoTreinamento"];
                    for (var i = 0; i < validacoes.length;i++){                        
                        switch (validacoes[i]){
                            case 'treinamentoValidaData':
                                habilitada = this.treinamentoValidaData(treinamento);
                            break;
                            case 'lotacaoTreinamento':
                                habilitada = this.lotacaoTreinamento(treinamento);
                            break;
                            default:
                                console.log('default',treinamento);
                        }
                        if(habilitada){
                            break;
                        }
                    }
                    return habilitada;
                },
                treinamentoValidaData:function(treinamento){
                    var habilitada = false;                    
                    if (treinamento.data != null) {
                        var dtT = treinamento.data.split('-');
                        var passouData = new Date(dtT[0], (dtT[1] - 1), dtT[2]) - new Date();
                        habilitada = passouData > 0 ? false : true;
                    }
                    return habilitada;
                },
                lotacaoTreinamento: function (treinamento){
                    var habilitada = false;  
                    if (treinamento.data != null) {
                        habilitada = treinamento.lotacao - treinamento.colaboradores.length <= 0 ? true : false;
                    }
                    return habilitada;
                },
                desCandidatarHabilitado: function (usuario, treinamento){
                    var desCandidatar = true;
                    if (treinamento.colaboradores!=null){
                        for (var i = 0; i < treinamento.colaboradores.length; i++) {
                            if (usuario.matricula == treinamento.colaboradores[i].matricula) {
                                desCandidatar = false;
                            }                            
                        }
                    }
                    return desCandidatar;
                },
                               
            }
        }
    )