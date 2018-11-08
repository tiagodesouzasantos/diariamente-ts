<?php
Class AvaliacaoDAO{
    public function getAvaliacoesByTreinamento($con,$data){
        try{
            $sql = "SELECT A.id AS [id_prova], A.[desc] AS [nm_prova], 
                    C.id as [id_pergunta], C.[desc] AS [questao], C.tempo AS [tempo],
                    D.id as [id_resposta], D.[desc], D.correta,D.ordem,
                    E.fk_treinamento as [id_treinamento], E.nota_minima as [minimo]
                FROM TB_AVALIACAO_PROVA A
                INNER JOIN TB_AVALIACAO_PROVA_QUESTOES B
                    ON B.fk_avaliacao_prova = A.id
                INNER JOIN TB_AVALIACAO_QUESTOES C
                    ON C.id = B.fk_avaliacao_questoes
                INNER JOIN TB_AVALIACAO_RESPOSTAS D
                    ON D.fk_avaliacao_questoes = C.id
                INNER JOIN TB_TREINAMENTO_AVALIACAO_PROVA E
                    ON A.id = E.fk_avaliacao_prova
                WHERE E.fk_treinamento = :fk_treinamento
                ORDER BY A.id,C.id,D.ordem";
            $statement = $con->prepare($sql);
            $statement->bindValue(":fk_treinamento",$data->fkTreinamento);            
            $result = $con->executeQuery($statement);        
            return $result;
        }catch(\Exception $e){
            return array("erro"=>"Problemas ao inserir os dados!","exception"=>$e->getMessage);
        }
    }
     
}
?>