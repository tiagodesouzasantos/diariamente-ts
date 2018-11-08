
<?php
class TbTransportadorasDAO{
    public function lista($con){
        try{
            $sql = "SELECT * FROM TB_TRANSPORTADORAS";
            $statement = $con->prepare($sql);            
            $result = $con->executeQuery($statement);        
            return $result;
        }catch(\Exception $e){
            throw array("erro"=>"Problemas ao consultar os dados!","exception"=>$e->getMessage);
        }
    }    
}
?>