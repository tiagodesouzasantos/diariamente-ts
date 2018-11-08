<?php
class TbAvaliacaoReacaoGruposDAO{
    public function listAll($con){
        try{
            $sql = "SELECT * FROM TB_AVALIACAO_REACAO_GRUPOS WHERE habilitado=1";
            $statement = $con->prepare($sql);
            $result = $con->executeQuery($statement);        
            return $result;
        }catch(\Exception $e){
            return array("erro"=>"Problemas ao consultar os dados!","exception"=>$e->getMessage);
        }
    }    
}
?>