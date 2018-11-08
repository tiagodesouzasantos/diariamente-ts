<?php
class TbUsuariosDAO{
    public function findByCpf($con,$userData){
        try{
            $sql = "SELECT A.*
                    FROM TB_USUARIOS A
                    WHERE A.cpf=:cpf";
            $statement = $con->prepare($sql);
            $statement->bindValue(":cpf",$userData->cpf);                    
            $result = $con->executeQuery($statement);        
            return $result[0];
        }catch(\Exception $e){
            return array("erro"=>"Problemas na busca dos dados!","exception"=>$e->getMessage);
        }
    }

    public function save($con,$userData){
        try{
            $sql = "INSERT INTO TB_USUARIOS (cpf,matricula,nome,email,senha,foto) 
                        values 
                    (:cpf,:matricula,:nome,:email,:senha,:foto)";
            $statement = $con->prepare($sql);
            $statement->bindValue(":cpf",$userData->cpf);                    
            $statement->bindValue(":matricula",$userData->matricula);                    
            $statement->bindValue(":nome",$userData->nome);                    
            $statement->bindValue(":email",$userData->email);                    
            $statement->bindValue(":senha",$userData->senha);
            $statement->bindValue(":foto",$userData->foto);
            $resultSave = $con->executeQuery($statement);

            $userResult = $this->findByCpf($con,$userData); 
            $scoreData = array("fk_usuario"=>$userResult['id'],"score"=>0); 
            
            return array("save"=>$resultSave,"user"=>$userResult,"score"=>$userScore);
        }catch(\Exception $e){
            return array("erro"=>"Problemas na busca dos dados!","exception"=>$e->getMessage);
        }
    }

    public function saveScore($con,$userData){
       try{
            $sql = "INSERT INTO TB_TREINAMENTOS_SCORE (fk_usuario,score) 
                        values 
                    (:fk_usuario,:score)";
            $statement = $con->prepare($sql);
            $statement->bindValue(":fk_usuario",$userData->fk_usuario);                    
            $statement->bindValue(":score",$userData->score);                                
            $resultSave = $con->executeQuery($statement);              
            return array("save"=>$resultSave,"user"=>$userResult[0]);
        }catch(\Exception $e){
            return array("erro"=>"Problemas na busca dos dados!","exception"=>$e->getMessage);
        } 
    }
    
    public function updatePass($con,$userData){
        try{
            $sql = "UPDATE TB_USUARIOS SET senha = :senha WHERE cpf = :cpf";
            $statement = $con->prepare($sql);
            $statement->bindValue(":cpf",$userData->cpf);
            $statement->bindValue(":senha",$userData->senha);
            $result = $con->executeQuery($statement);
            return count($result)==0?true:false;
        }catch(\Exception $e){
            return array("erro"=>"Problemas na busca dos dados!","exception"=>$e->getMessage);
        }
    }
}
?>