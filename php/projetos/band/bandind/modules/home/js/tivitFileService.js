angular.module('tivit')
    .service('tivitFileService',
    function ($q, $http, db, session, $timeout, dateService, text) {
            return {
                getContentTivit: function (ediData,ediOcorr) {
                    var unb = this.getUnb();
                    var unh = this.getUnh();
                    var tra = this.getTra(ediData, ediOcorr);
                    var oen = this.getOen(ediData, ediOcorr);
                    return unb + "\r\n" + unh + "\r\n" + tra + "\r\n" + oen;
                },
                getUnb:function(){
                    var unb = [];
                    var unbResult = "";
                    var dateTime = dateService.formatDateTimeDB(new Date());
                    dateTime = dateTime.split(' ');
                    date = dateTime[0].split('-');
                    time = dateTime[1].split(':');
                    unb[0] = "000";
                    unb[1] = "BANDEIRANTES LOGISTICA INTEGRADA   ";
                    unb[2] = "TITAN PNEUS                        ";
                    unb[3] = date[2] + date[1] + date[0].substring(2, 4);//date("dmy");
                    unb[4] = time[0]+time[1];//date("Hi");
                    unb[5] = "OCO" + date[2] + date[1] + unb[4]+"0";
                    unb[6] = "                         ";
                    for (var i = 0; i < unb.length; i++) {
                        unbResult+= unb[i];
                    }
                    return unbResult.substring(0, 120);
                },
                getUnh:function(){
                    var unh = [];
                    var unhResult = "";
                    var dateTime = dateService.formatDateTimeDB(new Date());
                    dateTime = dateTime.split(' ');
                    date = dateTime[0].split('-');
                    time = dateTime[1].split(':');
                    unh[0] = "340";
                    unh[1] = "OCORR" + date[2] + date[1] + time[0] + time[1] + "0";                    
                    unh[2] = "                                                                                                       ";
                    for (var i = 0; i < unh.length; i++) {
                        unhResult += unh[i];
                    }
                    return unhResult.substring(0, 120);
                },
                getTra: function (ediData, ediOcorr){
                    var tra = [];
                    var traResult = "";                    
                    tra[0] = "341";
                    tra[1] = text.textFixedSize(ediData.cgc_transp,14,"0",true);
                    tra[2] = text.textFixedSize(ediData.razao_social_transp,40," ");
                    tra[3] = "                                                               ";
                    for (var i = 0; i < tra.length; i++) {
                        traResult += tra[i];
                    }
                    return traResult.substring(0, 120);
                },
                getOen:function(ediData,ediOcorr){
                    var oen = [];
                    var oenResult = "";
                    var dtOcorrencia = ediOcorr.dt_oco.split('-').reverse().join('');
                    var hrOcorrencia = ediOcorr.hr_oco.split(':').join('');
                    oen[0] = "342";
                    oen[1] = text.textFixedSize(ediData.cgc_emissor,14,"0",true);
                    oen[2] = text.textFixedSize((ediData.serie_nfe*1)+"",3," ");                    
                    oen[3] = text.textFixedSize(ediData.numero_nfe,8,"0",true);
                    oen[4] = text.textFixedSize(ediOcorr.ocorr_data.cod,2,"0",true);
                    oen[5] = text.textFixedSize(dtOcorrencia,8,"0",true);
                    oen[6] = text.textFixedSize(hrOcorrencia,4,"0",true);
                    oen[7] = "00";
                    oen[8] = "                                                                      ";
                    oen[9] = "0000";
                    oen[10] = "  ";
                    for (var i = 0; i < oen.length; i++) {
                        oenResult += oen[i];
                    }
                    return oenResult;
                }
            }
        }
    )