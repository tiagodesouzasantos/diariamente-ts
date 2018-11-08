<?php
/**
 * Description of TblFiltroModelosModel
 *
 * @author Tiago
 */

class SQLTransactions {    
     public function runSql($sql, Conexao $con){        
        $statement = $con->prepare($sql);
        $result = $con->executeProcedure($statement);
        return $result;
    }

    public function runSPBindingParams($storedProcedure,$params, Conexao $con){   		
    	$qtParams = sizeof($params);
    	$chaveParams = substr(str_repeat('?,',$qtParams),0,-1);

    	$call = 'call '.$storedProcedure.'('.$chaveParams.')';

        $statement = $con->prepare($call);

    	foreach($params as $key=>$param){

    		$key++;
        	
        	// $statement->bindParam($key,json_encode($param),PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT);
        	
        	if($param instanceof stdClass ){
        		$statement->bindParam($key,json_encode($param));
        	}else{        		
        		$statement->bindValue($key,$param);				
        	}
    	}
     	


        $result = $con->executeProcedure($statement);

    	


        return $result;
    }
    
}
