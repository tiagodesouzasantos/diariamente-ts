<?php
class Environment{
    public static function getEnvs(){
        try{    
            $envfile = file_get_contents($_SERVER['DOCUMENT_ROOT'].'/ediband/services/v1/.env');
            $readEnv = preg_split("/\\r\\n|\\r|\\n/", $envfile);
            $env = array();       
            for($i=0;$i<count($readEnv);$i++){
                if($readEnv[$i]!=''){
                    $currentEnv = explode('=',$readEnv[$i],2);        
                    $env[trim($currentEnv[0])]=trim($currentEnv[1]);
                }
            }
            return $env;
        }catch(Exception $e){
            throw $e->getMessage();
        }        
    }
    public function getEnv($requestEnv){
        try{    
            $env = Environment::getEnvs();
            return $env[$requestEnv];
        }catch(Exception $e){
            throw $e->getMessage();
        }
    }
}
?>