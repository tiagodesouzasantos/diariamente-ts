<?php
class TbAvaliacaoReacaoResultadoDAO{
    public function save($con,$data){
        try{
            $sql = "INSERT INTO TB_AVALIACAO_REACAO_RESULTADO 
                        (fk_treinamento,fk_avaliacao_reacao_opiniao,fk_usuario,fk_avaliacao_reacao_questoes)
                        VALUES 
                        (:fk_treinamento,:fk_avaliacao_reacao_opiniao,:fk_usuario,:fk_avaliacao_reacao_questoes)";
            $statement = $con->prepare($sql);
            $statement->bindValue(":fk_treinamento",$data->fk_treinamento);            
            $statement->bindValue(":fk_avaliacao_reacao_opiniao",$data->fk_avaliacao_reacao_opiniao);            
            $statement->bindValue(":fk_usuario",$data->fk_usuario);            
            $statement->bindValue(":fk_avaliacao_reacao_questoes",$data->fk_avaliacao_reacao_questoes);            
            $result = $con->executeQuery($statement);        
            return count($result)==0?true:false;
        }catch(\Exception $e){
            return array("erro"=>"Problemas ao inserir os dados!","exception"=>$e->getMessage);
        }
    }  
    public function findByTreinamentoUsuario($con,$data){
        try{
            $sql = "SELECT * FROM TB_AVALIACAO_REACAO_RESULTADO 
                        WHERE fk_treinamento=:fk_treinamento
                        AND fk_usuario=:fk_usuario";                        
            $statement = $con->prepare($sql);
            $statement->bindValue(":fk_treinamento",$data->fk_treinamento);            
            $statement->bindValue(":fk_usuario",$data->fk_usuario);            
            $result = $con->executeQuery($statement);        
            return $result;
        }catch(\Exception $e){
            return array("erro"=>"Problemas ao inserir os dados!","exception"=>$e->getMessage);
        }
    }  
}
?>