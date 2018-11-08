<?php
class ConfigsUsuarioDAO{
    public function getMenus($con,$userData){
        try{
            $sql = "
            SELECT d.* FROM TB_USUARIOS a
                INNER JOIN TB_USUARIO_PERFIL_ACESSO b
                on b.fk_usuario = a.id
                INNER JOIN TB_PERFIL_MENU_ACESSO c
                on b.fk_perfil_acesso = c.fk_perfil_acesso
                INNER JOIN TB_MENU_ACESSO d
                on d.id = c.fk_menu_acesso
                WHERE a.cpf=:cpf;
            ";
            $statement = $con->prepare($sql);
            $statement->bindValue(":cpf",$userData->cpf);            
            $result = $con->executeQuery($statement);        
            return $result;
        }catch(\Exception $e){
            return array("erro"=>"Problemas ao consultar os dados!","exception"=>$e->getMessage);
        }
    }
}
?>