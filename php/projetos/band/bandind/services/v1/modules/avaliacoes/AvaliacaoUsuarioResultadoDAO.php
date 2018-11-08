<?php
Class AvaliacaoUsuarioResultadoDAO{
    public function saveResultados($con,$data){
        try{
            $sql = "INSERT INTO TB_AVALIACAO_USUARIO_RESULTADO 
                (aprovado,fk_usuario,fk_treinamento,aproveitamento,fk_avaliacao_prova)
                VALUES (:aprovado,:fk_usuario,:fk_treinamento,:aproveitamento,:fk_avaliacao_prova)";

            $statement = $con->prepare($sql);
            $statement->bindValue(":aprovado",$data->aprovado);            
            $statement->bindValue(":fk_usuario",$data->fk_usuario);            
            $statement->bindValue(":fk_treinamento",$data->fk_treinamento);            
            $statement->bindValue(":aproveitamento",$data->aproveitamento);            
            $statement->bindValue(":fk_avaliacao_prova",$data->fk_avaliacao_prova);            
            $result = $con->executeQuery($statement);        
            // return $result;
            return count($result)==0?true:false;            
        }catch(Exception $e){
            return array("erro"=>"Problemas ao inserir os dados!","exception"=>$e->getMessage);
        }
    }
    public function getResultadoUsuarioTreinamento($con,$data){
        try{
            $sql = "SELECT * FROM TB_AVALIACAO_USUARIO_RESULTADO 
                    WHERE fk_usuario = :fk_usuario 
                    AND fk_treinamento = :fk_treinamento";

            $statement = $con->prepare($sql);
            $statement->bindValue(":fk_usuario",$data->fk_usuario);            
            $statement->bindValue(":fk_treinamento",$data->fk_treinamento);                        
            $result = $con->executeQuery($statement);        
            return $result;
        }catch(\Exception $e){
            return array("erro"=>"Problemas ao inserir os dados!","exception"=>$e->getMessage);
        }
    }
}
?>