<?php
class TbHashRecoverPassDAO{
    public function find($con,$userData){
        try{
            $sql = "SELECT * FROM TB_HASH_RECOVER_PASS WHERE hash=:hash";
            $statement = $con->prepare($sql);
            $statement->bindValue(":hash",$userData->hash);                    
            $result = $con->executeQuery($statement);        
            return $result[0];
        }catch(\Exception $e){
            return array("erro"=>"Problemas na busca dos dados!","exception"=>$e->getMessage);
        }
    }

    public function insert($con,$userData){
        try{
            $sql = "INSERT INTO TB_HASH_RECOVER_PASS (hash,cpf) values (:hash,:cpf)";
            $statement = $con->prepare($sql);
            $statement->bindValue(":hash",$userData->hash);
            $statement->bindValue(":cpf",$userData->cpf);
            $result = $con->executeQuery($statement);        
            return count($result)==0?true:false;
        }catch(\Exception $e){
            return array("erro"=>"Problemas ao inserir os dados!","exception"=>$e->getMessage);
        }
    }

    public function delete($con,$userData){
        try{
            $sql = "DELETE FROM TB_HASH_RECOVER_PASS WHERE hash = :hash";
            $statement = $con->prepare($sql);
            $statement->bindValue(":hash",$userData->hash);
            $result = $con->executeQuery($statement);        
            return count($result)==0?true:false;
        }catch(\Exception $e){
            return array("erro"=>"Problemas ao inserir os dados!","exception"=>$e->getMessage);
        }
    }

    public function deleteByCpf($con,$userData){
        try{
            $sql = "DELETE FROM TB_HASH_RECOVER_PASS WHERE cpf = :cpf";
            $statement = $con->prepare($sql);
            $statement->bindValue(":cpf",$userData->cpf);
            $result = $con->executeQuery($statement);        
            return $result[0];
        }catch(\Exception $e){
            return array("erro"=>"Problemas ao inserir os dados!","exception"=>$e->getMessage);
        }
    }

}
?>