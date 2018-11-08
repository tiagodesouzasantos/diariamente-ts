angular.module('home')
    .controller('homeController',
    function ($state, $scope, text, homeService, dialogService, $rootScope, session, $mdDialog, time, msgsService, dateService, $q, tivitFileService) {
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
                    controller: function (copiaScope) {
                        return copiaScope;
                    },
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
        });