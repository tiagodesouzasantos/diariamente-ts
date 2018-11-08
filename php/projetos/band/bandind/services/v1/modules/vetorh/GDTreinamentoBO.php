<?php
include_once 'GDTreinamentoDAO.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/ediband/services/v1/helpers/StringFormat.php';

class GDTreinamentoBO{
    public function controller($action,$conexoes,$userData){
        switch($action){
            case 'listaTreinamentos':
                return $this->listaTreinamentos($conexoes,$userData);
            break;            
            break;            
            default:
            return array("msg"=>"Por favor selecione a ação correta!");
        }
    }
    public function listaTreinamentos($conexoes,$userData){
        try{
            $gdTreinamentoDAO = new GDTreinamentoDAO();
            $userData = json_decode(json_encode(array("currentYear"=>"2018")),FALSE);
            $treinamentos = $gdTreinamentoDAO->getTreinamentos($conexoes['vetorhCon'],$userData);
            return array(
                "dataTreinamentos"=>$this->listaDataTreinamento($treinamentos),
                "treinamentos"=>$treinamentos,
                "calendario"=>$this->listaDataNome($treinamentos)
            );
        }catch(Exception $e){
            throw array(
                    "error"=>"Por favor selecione uma ação!",
                    "exception"=>$e->getMessage()
                );
        }
    }

    public function listaDataNome($listaTreinamentos){
        try{
            $dataNome = array();
            for($i=0;$i<count($listaTreinamentos);$i++){
                $formatedData = explode(' ',$listaTreinamentos[$i]['dt_inicio']);
                if(isset($dataNome[$formatedData[0]])){
                    array_push($dataNome[$formatedData[0]],array($listaTreinamentos[$i]['nick_treinamento'],$listaTreinamentos[$i]['dt_fim']));
                }else{
                    $dataNome[$formatedData[0]]=array(array($listaTreinamentos[$i]['nick_treinamento'],$listaTreinamentos[$i]['dt_fim']));
                }
            }
            foreach($dataNome as $key => $data){
                $htmlTags = '';
                for($x=0;$x<count($data);$x++){
                    $htmlTags.="<p class='eventTag ".$this->getTagColors($data[$x][1])."' title='".$data[$x][0]."'>".$data[$x][0]."</p>";
                }
                $dataNome[$key] = "<div layout='row' layout-wrap layout-align='center center'>".$htmlTags."</div>";
            }
            return $dataNome;
        }catch(Exception $e){
            throw array(
                    "error"=>"Problemas ao listar treinamentos",
                    "exception"=>$e->getMessage()
                );
        }
    }
    public function listaDataTreinamento($listaTreinamentos){
        try{
            $dataNome = array();
            for($i=0;$i<count($listaTreinamentos);$i++){
                $formatedDataInicio = explode(' ',$listaTreinamentos[$i]['dt_inicio']);
                $formatedDataFim = explode(' ',$listaTreinamentos[$i]['dt_fim']);
                $treinamentoObj = array(
                        "nome"=> $listaTreinamentos[$i]['nm_treinamento'],
                        "id_treinamento"=> $listaTreinamentos[$i]['id_treinamento'],
                        "id_turma"=> $listaTreinamentos[$i]['id_turma'],
                        // "id"=> $listaTreinamentos[$i]['id_treinamento'],
                        "lotacao"=>$listaTreinamentos[$i]['lotacao'],
                        "pontuacao"=>"0",
                        "desc"=> $listaTreinamentos[$i]['desc'],
                        "horario"=> StringFormat::seniorFormatHorarios($listaTreinamentos[$i]['horario']),
                        "conteudoProgramatico"=> preg_split("/\\r\\n|\\r|\\n/", $listaTreinamentos[$i]['conteudo_program']),
                        "data"=>$formatedDataInicio[0],
                        "termina"=>$formatedDataFim[0],
                        "cargaHoraria"=> $listaTreinamentos[$i]['carga_horaria'],
                        "instrutor"=> [
                            "id"=>$listaTreinamentos[$i]['numcad_instrutor'],
                            "nome"=> $listaTreinamentos[$i]['nome_instrutor'],
                            "desc"=> $listaTreinamentos[$i]['obs_instrutor']
                        ],
                        "colaboradores"=>[
                            
                        ]
                    );
                if(isset($dataNome[$formatedDataInicio[0]])){
                    array_push($dataNome[$formatedDataInicio[0]],$treinamentoObj);
                }else{
                    $dataNome[$formatedDataInicio[0]]=array($treinamentoObj);
                }
            }
            return $dataNome;
        }catch(Exception $e){
            throw array(
                    "error"=>"Problemas ao listar treinamentos",
                    "exception"=>$e->getMessage()
                );
        }
    }

    public function getTagColors($dtFim){
        try{    
            $color = 'blue-tag';
            $formatedData = explode(' ',$dtFim);
            $dtFimTraina = strtotime($formatedData[0]);
            $today = strtotime(date('Y-m-d'));
            if($today>$dtFimTraina){
                $color = 'green-tag';
            }
            return $color;
        }catch(Exception $e){
            throw array(
                    "error"=>"Problemas ao listar treinamentos",
                    "exception"=>$e->getMessage()
                );
        }
    }



}
?>