<?php
class GDFuncionarioDAO{
    public function findByCPF($con,$userData){
        try{
            $sql = "SELECT 
                A.numcad AS [matricula], A.numcpf AS [cpf],
                A.nomfun AS [nome], A.apefun AS [apelido], A.tipsex AS [sexo],
                B.numemp AS [id_emp], B.apeemp AS [nm_fantasia_emp],
                A.tipcol AS [tip_col]
             FROM VETORH.R034FUN A
             INNER JOIN VETORH.R030EMP B
             ON (A.numemp = B.numemp)
             WHERE A.numcpf=:numcpf
             AND A.sitafa=1
             ORDER BY A.datsal DESC";
            $statement = $con->prepare($sql);
            $statement->bindValue(":numcpf",$userData->cpf);                    
            $result = $con->executeQuery($statement);        
            return $result;            
        }catch(\Exception $e){
            return array("erro"=>"Problemas na busca dos dados!","exception"=>$e->getMessage);
        }
    }
}
?>