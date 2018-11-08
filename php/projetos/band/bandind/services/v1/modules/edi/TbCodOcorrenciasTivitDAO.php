<?php
class TbCodOcorrenciasTivitDAO{
    public function lista($con){
        try{
            $sql = "SELECT * FROM TB_COD_OCORRENCIAS_TIVIT";
            $statement = $con->prepare($sql);            
            $result = $con->executeQuery($statement);        
            return $result;
        }catch(\Exception $e){
            throw array("erro"=>"Problemas ao consultar os dados!","exception"=>$e->getMessage);
        }
    }    
}
?>