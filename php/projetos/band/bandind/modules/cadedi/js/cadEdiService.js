angular.module('edi')
    .service('cadEdiService',
    function ($q, $http, db, session, $timeout, dateService, msgsService) {
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
        }
    )