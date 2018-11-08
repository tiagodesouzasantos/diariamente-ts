<?php
class TbOcorrenciaEdiDAO{
    public function save($con,$ediData){
        try{
            $sql = "INSERT INTO TB_OCORRENCIA_EDI 
            (dt_oco,hr_oco,fk_cod_oco_tivit,fk_emissao_edi,fk_usuario) 
            VALUES 
            (:dt_oco,:hr_oco,:fk_cod_oco_tivit,:fk_emissao_edi,:fk_usuario)";
            $statement = $con->prepare($sql);
            $statement->bindValue(":dt_oco",$ediData->dt_oco);
            $statement->bindValue(":hr_oco",$ediData->hr_oco);
            $statement->bindValue(":fk_cod_oco_tivit",$ediData->fk_cod_oco_tivit);
            $statement->bindValue(":fk_emissao_edi",$ediData->fk_emissao_edi);
            $statement->bindValue(":fk_usuario",$ediData->fk_usuario);
            $result = $con->executeQuery($statement);        
            return $this->findByEmissaoEdi($con,$ediData->fk_emissao_edi);
        }catch(\Exception $e){
            throw array("erro"=>"Problemas ao consultar os dados!","exception"=>$e->getMessage);
        }
    }
    public function findByEmissaoEdi($con,$idEmissaoEdi){
        try{
            $sql = "SELECT * FROM TB_OCORRENCIA_EDI WHERE fk_emissao_edi = :fk_emissao_edi;";
            $statement = $con->prepare($sql);
            $statement->bindValue(":fk_emissao_edi",$idEmissaoEdi);                        
            $result = $con->executeQuery($statement);        
            return $result;
        }catch(\Exception $e){
            return array("erro"=>"Problemas ao consultar os dados!","exception"=>$e->getMessage);
        }
    }
    public function lista($con){
        try{
            $sql = "SELECT * FROM TB_OCORRENCIA_EDI";
            $statement = $con->prepare($sql);                   
            $result = $con->executeQuery($statement);        
            return $result;
        }catch(\Exception $e){
            return array("erro"=>"Problemas ao consultar os dados!","exception"=>$e->getMessage);
        }
    }
    public function delete($con,$id){
        try{
            $sql = "DELETE FROM TB_OCORRENCIA_EDI WHERE id = :id";
            $statement = $con->prepare($sql);                   
            $statement->bindValue(":id",$id);                                    
            $result = $con->executeQuery($statement);        

            $sql = "SELECT * FROM TB_OCORRENCIA_EDI WHERE id = :id";
            $statement = $con->prepare($sql);                   
            $statement->bindValue(":id",$id);                                    
            $result = $con->executeQuery($statement);

            return $result;
        }catch(\Exception $e){
            return array("erro"=>"Problemas ao deletar os dados!","exception"=>$e->getMessage);
        }
    }
}
?>