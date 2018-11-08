<?php
class TbUsuarioPerfilAcessoDAO{
    public function save($con,$userData){
        try{
            $sql = "INSERT INTO TB_USUARIO_PERFIL_ACESSO 
                (fk_perfil_acesso,fk_usuario) VALUES (2,:fk_usuario)";
            $statement = $con->prepare($sql);
            $statement->bindValue(":fk_usuario",$userData->fk_usuario);                    
            $result = $con->executeQuery($statement);        
            return $result;
        }catch(\Exception $e){
            return array("erro"=>"Problemas ao salvar os dados!","exception"=>$e->getMessage);
        }
    }
}
?>