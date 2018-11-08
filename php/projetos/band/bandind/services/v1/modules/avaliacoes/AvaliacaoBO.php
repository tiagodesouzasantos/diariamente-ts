<?php
include_once 'AvaliacaoDAO.php';
include_once 'AvaliacaoUsuarioResultadoDAO.php';
include_once 'AvaliacaoUsuarioRespostasDAO.php';

Class AvaliacaoBO{
    public $contador = 0;

    public function controller($action,$conexoes,$userData){
        switch($action){
            case 'getAvaliacao':
                return $this->getAvaliacao($conexoes,$userData);
            break;            
            case 'saveAvaliacao':
                return $this->saveAvaliacao($conexoes,$userData);
            break;            
            default:
            return array();
        }
    }

    public function saveAvaliacao($conexoes,$data){
        try{            
            $avaliacao = $data->param;        
            $avaliacao->saveResultados = $this->saveResultados($conexoes,$avaliacao);  
            $avaliacao->saveRespostas = $this->saveRespostas($conexoes,$avaliacao);          
            return array("avaliacao"=>$avaliacao);
        }catch(\Exception $e){
            return array("error"=>"Problemas ao obter avaliações!","exception"=>$e->getMessage());
        }
    }

    public function saveResultados($conexoes,$data){
        try{
            $avaliacaoUsuarioResultado = new AvaliacaoUsuarioResultadoDAO();                       
            $resultados = json_decode(json_encode(array(
                "fk_usuario"=>$data->usuario->user->id,
                "fk_treinamento"=>$data->idTreinamento,
                "aproveitamento"=>$data->resultado->aproveitamento,
                "fk_avaliacao_prova"=>$data->idProva,
                "aprovado"=>$data->resultado->aprovado?1:0
            )),FALSE);
            $resultaSave = $avaliacaoUsuarioResultado->saveResultados($conexoes['treinamentosCon'],$resultados);            
            return array("error"=>!$resultaSave,"success"=>$resultaSave);            
        }catch(\Exception $e){
            return array("error"=>"Problemas ao salvar resultados!","exception"=>$e->getMessage());
        }        
    }

    public function saveRespostas($conexoes,$data){
        try{
            $avaliacaoUsuarioRespostas = new AvaliacaoUsuarioRespostasDAO();                        
            $error = false;
            $perguntas = $data->perguntas;
            for($i=0;$i<count($perguntas);$i++){               
                for($x=0;$x<count($perguntas[$i]->respostas);$x++){
                    if($perguntas[$i]->respostas[$x]->id==$perguntas[$i]->correta){
                        $resultados = json_decode(json_encode(array(
                            "resposta"=>$perguntas[$i]->respostas[$x]->idResposta,
                            "certo_errado"=>$perguntas[$i]->resultado,
                            "tempo_resposta"=>$perguntas[$i]->tempoInicial - $perguntas[$i]->tempo,
                            "fk_avaliacao_questao"=>$perguntas[$i]->idPergunta,
                            "fk_usuario"=>$data->usuario->user->id,
                            "fk_avaliacao_prova"=>$data->idProva,
                            "fk_treinamento"=>$data->idTreinamento
                        )),FALSE);
                        $resultaSave = $avaliacaoUsuarioRespostas->saveRespostas($conexoes['treinamentosCon'],$resultados);
                        if(!$resultaSave){
                            $error = true;
                            throw new Exception("Problemas ao inserir uma resposta!");
                        }
                    }
                }                
            }
            return array("error"=>$error,"success"=>!$error);
        }catch(\Exception $e){
            return array("error"=>"Problemas ao salvar resultados!","exception"=>$e->getMessage());
        }  
    }

    public function getAvaliacao($conexoes,$data){
        try{
            $avaliacaoDAO = new AvaliacaoDAO();
            $avaliacaoUsuarioResultado = new AvaliacaoUsuarioResultadoDAO();                       
            
            $treinamento = $data->param;
            $avaliacao = $avaliacaoDAO->getAvaliacoesByTreinamento(
                $conexoes['treinamentosCon'],
                json_decode(json_encode(array("fkTreinamento"=>$treinamento->id)),FALSE)
            );      
            $avaliacaoRealizada =  $avaliacaoUsuarioResultado->getResultadoUsuarioTreinamento(
                $conexoes['treinamentosCon'],
                json_decode(json_encode(array("fk_treinamento"=>$treinamento->id,"fk_usuario"=>$treinamento->usuario->user->id)),FALSE)
            );     
            return array(
                "listaAvaliacao"=>$this->mapProvas($avaliacao),
                "avaliacaoRealizada"=>$avaliacaoRealizada,
                "data"=>$treinamento
            );
        }catch(\Exception $e){
            return array("error"=>"Problemas ao obter avaliações!","exception"=>$e->getMessage());
        }
    }

    public function mapProvas($provas){
        $mapProvas = array();
        $mP = array();
        for($aP=0;$aP<count($provas);$aP++){
            if(array_search($provas[$aP]['id_prova'],$mP)===FALSE){
                $prova = array(
                    "idProva"=>$provas[$aP]['id_prova']*1,
                    "idTreinamento"=>$provas[$aP]['id_treinamento']*1,
                    "minimo"=>$provas[$aP]['minimo']*1,
                    "nmProva"=>$provas[$aP]['nm_prova'],
                    "resultado"=>array(),
                    "perguntas"=>$this->mapPerguntas($provas,$provas[$aP]['id_prova'])
                );
                array_push($mapProvas,$prova);
                array_push($mP,$provas[$aP]['id_prova']);
            }            
        }   
        return $mapProvas;        
    }

    public function mapPerguntas($perguntas,$idProva){
        $mapPerguntas = array();
        $mP = array();
        for($i=0;$i<count($perguntas);$i++){            
            if($idProva==$perguntas[$i]['id_prova']){
                if(array_search($perguntas[$i]['id_pergunta'],$mP)===FALSE){
                    $pergunta = array(
                        "id"=>count($mapPerguntas)+1,
                        "idPergunta"=>$perguntas[$i]['id_pergunta']*1,
                        "tempo"=>$perguntas[$i]['tempo']*1,
                        "tempoInicial"=>$perguntas[$i]['tempo']*1,
                        "correta"=>$perguntas[$i]['correta']!=0?$perguntas[$i]['ordem']*1:0,
                        "questao"=>$perguntas[$i]['questao'],
                        "respostas"=>$this->mapRespostas($perguntas,$perguntas[$i]['id_pergunta'])
                    );
                    array_push($mapPerguntas,$pergunta);
                    array_push($mP,$perguntas[$i]['id_pergunta']*1);
                }else{
                    $posPergunta = array_search($perguntas[$i]['id_pergunta'],$mP);
                    if($perguntas[$i]['correta']!="0"){
                        $mapPerguntas[$posPergunta]["correta"]=$perguntas[$i]['ordem']*1;
                    }
                } 
            }           
        }
        return $mapPerguntas;
    }

    public function mapRespostas($respostas,$idPergunta){
        $mapRespostas = array();
        $mP = array();
        for($i=0;$i<count($respostas);$i++){            
            if($idPergunta==$respostas[$i]['id_pergunta']){
                if(array_search($respostas[$i]['id_resposta'],$mP)===FALSE){
                    $resposta = array(
                        "id"=>count($mapRespostas)+1,
                        "idResposta"=>$respostas[$i]['id_resposta']*1,
                        "desc"=>$respostas[$i]['desc']
                    );
                    array_push($mapRespostas,$resposta);
                    array_push($mP,$respostas[$i]['id_resposta']*1);
                }
            }
           
        }
        return $mapRespostas;
    }
}
?>