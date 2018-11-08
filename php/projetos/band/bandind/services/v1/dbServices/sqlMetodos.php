<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

// include_once $_SERVER["DOCUMENT_ROOT"] .'/services/v1/DBO/model/SQLTransactions.php';
include_once __DIR__ .'/../DBO/model/SQLTransactions.php';

class sqlMetodos {

    function __construct() {

    }
	public function sqlRunQUERY(Conexao $con, $data) {

		$objectApp = $data;

		$from = trim(substr($objectApp->from, 5,strlen($objectApp->from)));

		if($from == 'tbl_dados_publicados'){
			$whereIdPublicacao = $objectApp->where;
		}

		$query = $objectApp->select . $objectApp->from . $whereIdPublicacao . $objectApp->groupBy . $objectApp->orderBy;
		$objectApp->sql;

		$sqlRun = new SQLTransactions();
		$result = $sqlRun->runSql($query,$con);
		$finalResult = [];

		if($from == 'tbl_dados_publicados'){
			foreach ($result as $datas){
				array_push($finalResult, array(
					"id_modelo"=>$datas['id_modelo'],
					"id_txt_conteudo"=>$datas['id_txt_conteudo'],
					"id_idioma"=>$datas['id_idioma'],
					"json"=>  preg_replace('~[\r\n]+~', '', $datas['json'])
				));
			}
		}

		$retorno['rows'] = ($finalResult);
		echo json_encode($retorno);
	}

	public function sqlRunSPBindingParams(Conexao $con, $data) {

    	$sqlRun = new SQLTransactions();
		$result = $sqlRun->runSPBindingParams($data->storedprocedure,$data->param,$con);

		$retorno['rows'] = ($result);
		
		return json_encode($retorno);
    }

    public function sqlRunSP(Conexao $con, $data) {

    	if(is_array($data->param)){
    		return $this->sqlRunSPBindingParams($con, $data);
    	}

		$objectApp = $data;

		$from = trim(substr($objectApp->from, 5,strlen($objectApp->from)));

		if($from == 'tbl_dados_publicados'){
			$whereIdPublicacao = $objectApp->where;
		}

		$query = 'CALL '. $objectApp->storedprocedure .' (' . $objectApp->param . ');';
		// $objectApp->sql;

		$sqlRun = new SQLTransactions();
		$result = $sqlRun->runSql($query,$con);

		$finalResult = [];

		if($from == 'tbl_dados_publicados'){
			foreach ($result as $datas){
				array_push($finalResult, array(
					"id_modelo"=>$datas['id_modelo'],
					"id_txt_conteudo"=>$datas['id_txt_conteudo'],
					"json"=>  preg_replace('~[\r\n]+~', '', $datas['json'])
				));
			}
		}

		$retorno['rows'] = ($result);
		// $retorno['$query'] = ($query);
		echo json_encode($retorno);
    }

}
