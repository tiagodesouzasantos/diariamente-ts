<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
//ini_set('default_charset', 'UTF-8');
error_reporting(0);
//ob_start();
require_once __DIR__.'/../DBO/Conexao.php';
require_once 'sqlMetodos.php';
try{
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    
    $sqlMetodos = new sqlMetodos();
    $conexao = $request->conexao;
    $con = new Conexao($conexao);    
    switch ($request->tipoServico) {
        case 'SP_JSON':
            echo $sqlMetodos->sqlRunSPBindingParams($con, $request);
                break;
        default :
            echo 'Por favor selecione uma ação!';            
    }
}catch(Exception $e){
    echo 'Ocorreu um erro.: '.$e->getMessage();
}

