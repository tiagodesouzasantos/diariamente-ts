<?php
include_once 'TbEmissaoEdiDAO.php';
include_once 'TbCodOcorrenciasTivitDAO.php';
include_once 'TbTransportadorasDAO.php';
include_once 'TbOcorrenciaEdiDAO.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/ediband/services/v1/helpers/StringFormat.php';

class EdiBO{
    public function controller($action,$conexoes,$userData){
        try{
            switch($action){
                case 'save':
                    return $this->saveEdi($conexoes,$userData);
                case 'lista':
                    return $this->lista($conexoes,$userData);
                case 'delete':
                    return $this->deleteOcoEdi($conexoes,$userData);
                break;            
                case 'listaEdiOco':
                    return $this->listaEdiOco($conexoes,$userData);
                break;            
                case 'saveOcoEdi':
                    return $this->saveOcoEdi($conexoes,$userData);
                break;            
                default:
                return array();
            }
        }catch(\Exception $e){
            throw array("error"=>"Problemas no controller!","exception"=>$e->getMessage());
        }
        
    }

    public function saveEdi($conexoes,$ediData){
        try{
            $ediExist = 0;
            $edi = $this->filterEdiDateBeforeSave($ediData);
            $tbEmissaoEdiDAO = new TbEmissaoEdiDAO();
            $ediComChAcess = $tbEmissaoEdiDAO->findByChAcesso($conexoes['ediBandCon'],$edi->ch_acesso);
            if(count($ediComChAcess)>0){
                $ediExist = 1;
            }else{
                $tbOcorrenciaEdiDAO = new TbOcorrenciaEdiDAO();            
                $saveEdi = $tbEmissaoEdiDAO->save($conexoes['ediBandCon'],$edi);
                $ediOco = $this->filterEdiOcoDateBeforeSave($ediData->param,$saveEdi[0]['id']);
                $saveEdiOco = $tbOcorrenciaEdiDAO->save($conexoes['ediBandCon'],$ediOco);
            }

            return array(
                "ediExist"=>$ediExist,"edi"=>$saveEdi,
                "founded"=>$ediComChAcess,
                "ediOco"=>$ediOco,
                "saved"=>$saveEdiOco
            );
        }catch(\Exception $e){
            throw array("error"=>"Problemas no save!","exception"=>$e->getMessage());
        }
    }
    public function saveOcoEdi($conexoes,$ocorrEdi){
        try{
            $ediExist = 0;
            $tbOcorrenciaEdiDAO = new TbOcorrenciaEdiDAO();
            $ocorr = $this->filterOcoBeforeSave($ocorrEdi->param);
            $save = $tbOcorrenciaEdiDAO->save($conexoes['ediBandCon'],$ocorr);
            return array(
                "ocorrEdi"=>$ocorrEdi,
                "beforeSave"=>$ocorr,
                "save"=>$save
            );
        }catch(\Exception $e){
            throw array("error"=>"Problemas no save!","exception"=>$e->getMessage());
        }
    }
    public function deleteOcoEdi($conexoes,$ocorrEdi){
        try{
            $tbOcorrenciaEdiDAO = new TbOcorrenciaEdiDAO();           
            $delete = $tbOcorrenciaEdiDAO->delete($conexoes['ediBandCon'],$ocorrEdi->param->id);
            return array(
                "delete"=>$delete
            );
        }catch(\Exception $e){
            throw array("error"=>"Problemas no save!","exception"=>$e->getMessage());
        }
    }

    public function lista($conexoes,$ediData){
       try{            
            $tbEmissaoEdiDAO = new TbEmissaoEdiDAO();
            $tbCodOcorrenciasTivitDAO = new TbCodOcorrenciasTivitDAO();
            $tbTransportadorasDAO = new TbTransportadorasDAO();

            return array(
                "listaOcorrenciasTivit"=>$tbCodOcorrenciasTivitDAO->lista($conexoes['ediBandCon']),
                "listaTransp"=>$tbTransportadorasDAO->lista($conexoes['ediBandCon'])
            );
        }catch(\Exception $e){
            throw array("error"=>"Problemas na listagem!","exception"=>$e->getMessage());
        } 
    }
    public function listaEdiOco($conexoes,$ediData){
       try{            
            $tbEmissaoEdiDAO = new TbEmissaoEdiDAO();
            $tbOcorrenciaEdiDAO = new TbOcorrenciaEdiDAO();
            $tbCodOcorrenciasTivitDAO = new TbCodOcorrenciasTivitDAO();
            
            $listaEmissaoEdi = $tbEmissaoEdiDAO->lista($conexoes['ediBandCon']);
            $listaOcoEdi = $tbOcorrenciaEdiDAO->lista($conexoes['ediBandCon']);
            for($i=0;$i<count($listaEmissaoEdi);$i++){
                $listaEmissaoEdi[$i]['ocorrencias']=array();
                for($x=0;$x<count($listaOcoEdi);$x++){
                    if($listaEmissaoEdi[$i]['id']==$listaOcoEdi[$x]['fk_emissao_edi']){
                        array_push($listaEmissaoEdi[$i]['ocorrencias'],$listaOcoEdi[$x]);                        
                    }
                }
            }

            return array(
                "listaOcorrenciasEdi"=>$listaEmissaoEdi,
                "listaOcorrenciasTivit"=>$tbCodOcorrenciasTivitDAO->lista($conexoes['ediBandCon'])
            );
        }catch(\Exception $e){
            throw array("error"=>"Problemas na listagem!","exception"=>$e->getMessage());
        } 
    }


    public function filterEdiDateBeforeSave($data){
        try{            
            $filter = array(
                "ch_acesso"=>$data->param->nfe->chaveacesso,
                "cgc_transp"=> StringFormat::removeCnpjEspecialChar($data->param->nfe->cgcTransp->cgc_transp),
                "razao_social_transp"=>$data->param->nfe->razaoSocialTransp,
                "nrdi"=>$data->param->nrDi,
                "veiculos"=>$data->param->veiculo,
                "cgc_emissor"=>$data->param->nfe->cgc,
                "serie_nfe"=>$data->param->nfe->serie,
                "numero_nfe"=>$data->param->nfe->numero,
                "fk_usuario"=>$data->param->user,
            );
                    
            return json_decode(json_encode($filter),FALSE);
        }catch(\Exception $e){
            throw array("error"=>"Problemas no save!","exception"=>$e->getMessage());
        }
    }
    public function filterEdiOcoDateBeforeSave($ediOco,$edi){
        try{            
            $filter = array(
                "dt_oco"=>$ediOco->dtOco,
                "hr_oco"=> $ediOco->hrOco,
                "fk_cod_oco_tivit"=>$ediOco->searchOcoTivit,
                "fk_emissao_edi"=>$edi,
                "fk_usuario"=>$ediOco->user
            );                   
            return json_decode(json_encode($filter),FALSE);
        }catch(\Exception $e){
            throw array("error"=>"Problemas no save!","exception"=>$e->getMessage());
        }
    }
    public function filterOcoBeforeSave($ocorr){
        try{            
            $filter = array(
                "dt_oco"=>$ocorr->dtOco,
                "hr_oco"=> $ocorr->hrOco,
                "fk_cod_oco_tivit"=>$ocorr->searchOcoTivit,
                "fk_emissao_edi"=>$ocorr->edi->id,
                "fk_usuario"=>$ocorr->user
            );                   
            return json_decode(json_encode($filter),FALSE);
        }catch(\Exception $e){
            throw array("error"=>"Problemas no save!","exception"=>$e->getMessage());
        }
    }
}
?>