angular.module('bandEdi')
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
    ])