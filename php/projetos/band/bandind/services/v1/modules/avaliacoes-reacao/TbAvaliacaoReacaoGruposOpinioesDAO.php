<?php
Class TbAvaliacaoReacaoGruposOpinioesDAO{
    public function findByIdGrupos($con,$data){
        try{
            $sql = "SELECT C.id AS [id_grupo],B.id AS [id_opiniao],B.[desc] AS [desc] 
                    FROM TB_AVALIACAO_REACAO_GRUPOS_OPINIOES A
                    INNER JOIN TB_AVALIACAO_REACAO_OPINIOES B
                        ON B.id = A.fk_avaliacao_reacao_opinioes
                    INNER JOIN TB_AVALIACAO_REACAO_GRUPOS C
                        ON C.id = A.fk_avaliacao_reacao_grupos
                    WHERE C.id IN (".$data->ids.")";
            $statement = $con->prepare($sql);
            $result = $con->executeQuery($statement);        
            return $result;
        }catch(\Exception $e){
            return array("erro"=>"Problemas ao consultar os dados!","exception"=>$e->getMessage);
        }
    }
}
?>