<?php
include_once 'TbAvaliacaoReacaoGruposDAO.php';
include_once 'TbAvaliacaoReacaoQuestoesDAO.php';
include_once 'TbAvaliacaoReacaoGruposOpinioesDAO.php';
include_once 'TbAvaliacaoReacaoOpiniaoMelhoriaDAO.php';
include_once 'TbAvaliacaoReacaoResultadoDAO.php';

class AvaliacaoReacaoBO{
    public function controller($action,$conexoes,$userData){
        switch($action){
            case 'lista':
                return $this->lista($conexoes,$userData);
            break;            
            case 'saveQuestoesAR':
                return $this->save($conexoes,$userData);
            break;            
            default:
            return array();
        }
    }

    public function lista($conexoes,$userData){
        try{
            $avaliacaoReacao = $userData->param;
            $buscaParametros = array(
                "fk_treinamento"=>$avaliacaoReacao->treinamento->id,
                "fk_usuario"=>$avaliacaoReacao->usuario->id
            );
            $opiniaoExiste = $this->verificaExisteOpiniao($conexoes,$buscaParametros);
            if(!$opiniaoExiste){
                $listagem = $this->getListaAR($conexoes);
            }else{
                $listagem = array("avaliacaoReacao"=>array(),"respondido"=>$opiniaoExiste);
            }
            return $listagem;
        }catch(\Exception $e){
            return array("error"=>"Problemas na solicitação dos dados!","exception"=>$e->getMessage());
        }        
    }

    public function getListaAR($conexoes){
        try{
            $reacaoGruposDAO = new TbAvaliacaoReacaoGruposDAO();
            $reacaoQuestoesDAO = new TbAvaliacaoReacaoQuestoesDAO();  
            $reacaoGruposOpinioesDAO = new TbAvaliacaoReacaoGruposOpinioesDAO();
            $listaGrupos = $reacaoGruposDAO->listAll($conexoes['treinamentosCon']);
            $listaQuestoes = $reacaoQuestoesDAO->listAll($conexoes['treinamentosCon']);
            $listaGruposQuestoes = json_decode(json_encode($this->getIdsConcatGrupos($listaGrupos)),FALSE);
            $listaOpinioesGrupos = $reacaoGruposOpinioesDAO->findByIdGrupos($conexoes['treinamentosCon'],$listaGruposQuestoes);
            for($i=0;$i<count($listaGrupos);$i++){
                $listaGrupos[$i]["perguntas"] = array();
                for($x=0;$x<count($listaQuestoes);$x++){                    
                    if($listaGrupos[$i]['id']==$listaQuestoes[$x]['fk_avaliacao_reacao_grupos']){
                        array_push($listaGrupos[$i]["perguntas"],$listaQuestoes[$x]);
                        $posicaoPergunta = count($listaGrupos[$i]["perguntas"])-1;
                        $listaGrupos[$i]["perguntas"][$posicaoPergunta]["opinioes"] = array();
                        for($y = 0;$y<count($listaOpinioesGrupos);$y++){
                            if($listaOpinioesGrupos[$y]["id_grupo"]==$listaGrupos[$i]['id']){
                                array_push($listaGrupos[$i]["perguntas"][$posicaoPergunta]["opinioes"],$listaOpinioesGrupos[$y]);
                            }
                        }
                    }
                }
            }            
            return array("avaliacaoReacao"=>$listaGrupos,"respondido"=>false);
        }catch(\Exception $e){
            return array("error"=>"Problemas na solicitação dos dados!","exception"=>$e->getMessage());
        }   
    }

    public function getIdsConcatGrupos($listaGrupos){
        $grupos = array();
        for($i=0;$i<count($listaGrupos);$i++){
            array_push($grupos,$listaGrupos[$i]['id']);
        }
        return array("ids"=>implode(',',$grupos));
    }

    public function save($conexoes,$userData){        
        try{
            $avaliacaoReacao = $userData->param;

            $opiniaoMelhoriaDAO = new TbAvaliacaoReacaoOpiniaoMelhoriaDAO();
            $resultadoDAO = new TbAvaliacaoReacaoResultadoDAO();

            $avaliacoes = $this->avaliacaoReacaoResultadoDbFactory($avaliacaoReacao);            
            $melhoria = array(
                "fk_treinamento"=>$avaliacaoReacao->treinamento->id,
                "fk_usuario"=>$avaliacaoReacao->usuario->id,
                "melhorar"=>$avaliacaoReacao->opiniaoDisserta->melhorar,
                "pontos_fortes"=>$avaliacaoReacao->opiniaoDisserta->pontosFortes,
            );
            
            $opiniaoExiste = $this->verificaExisteOpiniao($conexoes,$melhoria);
            if(!$opiniaoExiste){
                $resultado = 0;
                for($i=0;$i<count($avaliacoes);$i++){
                    $resultadoSave = $resultadoDAO->save($conexoes['treinamentosCon'],json_decode(json_encode($avaliacoes[$i]),FALSE));
                    if($resultadoSave){
                        $resultado++;
                    }                    
                }
                $opiniaoMelhoria = $opiniaoMelhoriaDAO->save($conexoes['treinamentosCon'],json_decode(json_encode($melhoria),FALSE));
            }
            $enviado = ($opiniaoMelhoria && $resultado==count($avaliacoes))?true:false;

            return array("enviado"=>$enviado,"opiniaoExiste"=>$opiniaoExiste);
        }catch(\Exception $e){
            return array("error"=>"Problemas na solicitação dos dados!","exception"=>$e->getMessage());
        }  
    }

    public function avaliacaoReacaoResultadoDbFactory($avaliacaoReacao){
        $dbAvaliacoes = array();
        $perguntasAr = $avaliacaoReacao->perguntasAr;
        for($i=0;$i<count($perguntasAr);$i++){
            for($x=0;$x<count($perguntasAr[$i]->perguntas);$x++){
                $resultado = array(
                    "fk_treinamento"=>$avaliacaoReacao->treinamento->id,
                    "fk_avaliacao_reacao_opiniao"=>$perguntasAr[$i]->perguntas[$x]->opiniao,
                    "fk_usuario"=>$avaliacaoReacao->usuario->id,
                    "fk_avaliacao_reacao_questoes"=>$perguntasAr[$i]->perguntas[$x]->id,
                );
                array_push($dbAvaliacoes,$resultado);
            }            
        }
        return $dbAvaliacoes;
    }

    public function verificaExisteOpiniao($conexoes,$data){
        $opiniaoMelhoriaDAO = new TbAvaliacaoReacaoOpiniaoMelhoriaDAO();
        $resultadoDAO = new TbAvaliacaoReacaoResultadoDAO();
        $opiniaoMelhoria = $opiniaoMelhoriaDAO->findByTreinamentoUsuario($conexoes['treinamentosCon'],json_decode(json_encode($data),FALSE));
        $resultado = $resultadoDAO->findByTreinamentoUsuario($conexoes['treinamentosCon'],json_decode(json_encode($data),FALSE));
        return (count($opiniaoMelhoria)>0 && count($resultado)>0)?true:false; 
    }
}
?>