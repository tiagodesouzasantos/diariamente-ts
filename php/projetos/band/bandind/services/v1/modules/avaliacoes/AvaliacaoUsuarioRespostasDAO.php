<?php
Class AvaliacaoUsuarioRespostasDAO{
    public function saveRespostas($con,$data){
        try{
            $sql = "INSERT INTO TB_AVALIACAO_USUARIO_RESPOSTAS 
                (resposta,certo_errado,tempo_resposta,fk_avaliacao_questao,fk_usuario,fk_treinamento,fk_avaliacao_prova)
         VALUES (:resposta,:certo_errado,:tempo_resposta,:fk_avaliacao_questao,:fk_usuario,:fk_treinamento,:fk_avaliacao_prova)";

            $statement = $con->prepare($sql);
            $statement->bindValue(":resposta",$data->resposta);            
            $statement->bindValue(":certo_errado",$data->certo_errado);            
            $statement->bindValue(":tempo_resposta",$data->tempo_resposta);            
            $statement->bindValue(":fk_avaliacao_questao",$data->fk_avaliacao_questao);            
            $statement->bindValue(":fk_usuario",$data->fk_usuario);            
            $statement->bindValue(":fk_treinamento",$data->fk_treinamento); 
            $statement->bindValue(":fk_avaliacao_prova",$data->fk_avaliacao_prova);            
                       
            $result = $con->executeQuery($statement);        
            // return $result;
            return count($result)==0?true:false;            
        }catch(\Exception $e){
            return array("erro"=>"Problemas ao inserir os dados!","exception"=>$e->getMessage);
        }
    } 
}

?>