<?php
class GDTreinamentoDAO{
    public function getTreinamentos($con,$userData){
        try{            
            $sql = "SELECT 
                        B.codcua AS [id_treinamento],B.nomred AS [nm_treinamento],
                        B.nomcua AS [nick_treinamento],A.tmacua AS [id_turma],
                        A.datini AS [dt_inicio], A.datfim AS [dt_fim],
                        A.carhor AS [carga_horaria], A.qtdvag AS [lotacao],
                        A.medcua AS [minimo], A.frecua AS [frequencia],
                        A.descon AS [conteudo_program], A.desobu AS [desc],D.deshor AS [horario],
                        E.tipins AS [tipo_instrutor], E.obsins AS [obs_instrutor],
                        F.numcad AS [numcad_instrutor], F.nomfun AS [nome_instrutor]
                        FROM VETORH.R134DTU A
                        INNER JOIN VETORH.R128CUA B
                            ON A.codcua = B.codcua
                        INNER JOIN VETORH.R134HOR C
                            ON A.tmacua = C.tmacua AND B.codcua = C.codcua
                        INNER JOIN VETORH.R133HCU D
                            ON D.codhcu = C.codhcu
                        INNER JOIN VETORH.r134ins E
                            ON A.codcua = E.codcua AND A.tmacua = E.tmacua
                        INNER JOIN VETORH.r034fun F
                            ON E.numcad = F.numcad
                        WHERE B.conweb = 'S'
                        and year(A.datini) = :currentYear
                        ORDER BY A.datini DESC, A.datfim DESC";
            $statement = $con->prepare($sql);
            $statement->bindValue(":currentYear",$userData->currentYear);            
            $result = $con->executeQuery($statement);        
            return $result;            
        }catch(Exception $e){
            throw array("erro"=>"Problemas na busca dos dados!","exception"=>$e->getMessage);
        }
    }
}
?>