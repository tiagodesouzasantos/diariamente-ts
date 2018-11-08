<?php
class TbEmissaoEdiDAO{
    public function save($con,$ediData){
        try{
            $sql = "INSERT INTO TB_EMISSAO_EDI 
            (ch_acesso,cgc_transp,razao_social_transp,nrdi,veiculos,cgc_emissor,serie_nfe,numero_nfe,fk_usuario) 
            VALUES 
               (:ch_acesso,:cgc_transp,:razao_social_transp,:nrdi,:veiculos,
               :cgc_emissor,:serie_nfe,:numero_nfe,:fk_usuario)";
            $statement = $con->prepare($sql);
            $statement->bindValue(":ch_acesso",$ediData->ch_acesso);            
            $statement->bindValue(":cgc_transp",$ediData->cgc_transp);            
            $statement->bindValue(":razao_social_transp",$ediData->razao_social_transp);            
            $statement->bindValue(":nrdi",$ediData->nrdi);            
            $statement->bindValue(":veiculos",$ediData->veiculos);            
            $statement->bindValue(":cgc_emissor",$ediData->cgc_emissor);            
            $statement->bindValue(":serie_nfe",$ediData->serie_nfe);            
            $statement->bindValue(":numero_nfe",$ediData->numero_nfe);            
            $statement->bindValue(":fk_usuario",$ediData->fk_usuario);                       
            $result = $con->executeQuery($statement);        
            return $this->findByChAcesso($con,$ediData->ch_acesso);
        }catch(\Exception $e){
            throw array("erro"=>"Problemas ao consultar os dados!","exception"=>$e->getMessage);
        }
    }
    public function findByChAcesso($con,$chAcesso){
        try{
            $sql = "SELECT * FROM TB_EMISSAO_EDI WHERE ch_acesso = :ch_acesso;";
            $statement = $con->prepare($sql);
            $statement->bindValue(":ch_acesso",$chAcesso);                        
            $result = $con->executeQuery($statement);        
            return $result;
        }catch(\Exception $e){
            return array("erro"=>"Problemas ao consultar os dados!","exception"=>$e->getMessage);
        }
    }

    public function lista($con){
        try{
            $sql = "SELECT * FROM TB_EMISSAO_EDI";
            $statement = $con->prepare($sql);            
            $result = $con->executeQuery($statement);        
            return $result;
        }catch(\Exception $e){
            return array("erro"=>"Problemas ao consultar os dados!","exception"=>$e->getMessage);
        }
    }
}
?>