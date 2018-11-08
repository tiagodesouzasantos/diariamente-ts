<?php
class TbAvaliacaoReacaoOpiniaoMelhoriaDAO{
    public function save($con,$data){
        try{
            $sql = "INSERT INTO TB_AVALIACAO_REACAO_OPINIAO_MELHORIA 
                        (fk_treinamento,fk_usuario,melhorar,pontos_fortes)
                        VALUES 
                        (:fk_treinamento,:fk_usuario,:melhorar,:pontos_fortes)";
            $statement = $con->prepare($sql);
            $statement->bindValue(":fk_treinamento",$data->fk_treinamento);            
            $statement->bindValue(":fk_usuario",$data->fk_usuario);            
            $statement->bindValue(":melhorar",$data->melhorar);            
            $statement->bindValue(":pontos_fortes",$data->pontos_fortes);            
            $result = $con->executeQuery($statement);        
            return count($result)==0?true:false;
        }catch(\Exception $e){
            return array("erro"=>"Problemas ao inserir os dados!","exception"=>$e->getMessage);
        }
    }    
    public function findByTreinamentoUsuario($con,$data){
        try{
            $sql = "SELECT * FROM TB_AVALIACAO_REACAO_OPINIAO_MELHORIA 
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