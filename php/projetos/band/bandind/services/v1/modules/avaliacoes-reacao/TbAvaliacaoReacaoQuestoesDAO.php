<?php
class TbAvaliacaoReacaoQuestoesDAO{
    public function listAll($con){
        try{
            $sql = "SELECT * FROM TB_AVALIACAO_REACAO_QUESTOES";
            $statement = $con->prepare($sql);
            $result = $con->executeQuery($statement);        
            return $result;
        }catch(\Exception $e){
            return array("erro"=>"Problemas ao consultar os dados!","exception"=>$e->getMessage);
        }
    }
}
?>