angular.module('home')
    .service('homeService',
    function ($q, $http, db, session, $timeout, dateService, msgsService) {
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
        }
    )