angular.module('edi')
    .controller('cadEdiController',
    function ($filter, $element, $state, $scope, text, cadEdiService, dialogService, $rootScope, session, $mdDialog, time, msgsService, dateService,$q) {
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

        });