<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
//ini_set('default_charset', 'UTF-8');
error_reporting(0);
//ob_start();
require_once "requires.php";

try{
    $postdata = file_get_contents("php://input");

    if($postdata==""){
        $postdata = $_REQUEST;
        $request = json_decode(json_encode($postdata));
    }else{
        $request = json_decode($postdata);
    }    
    $conexoes = array(
        "vetorhCon"=>new Conexao('vetorh'),
        "ediBandCon"=>new Conexao('ediband'),
        "usuariosBand"=>new Conexao('usuariosband')
    );   
    switch ($request->modulo) {
        case 'login':                     
            $loginBO = new LoginBO();            
            echo json_encode($loginBO->controller($request->acao,$conexoes,$request));
            break;
        case 'edi':
            $ediBO = new ediBO();
            echo json_encode($ediBO->controller($request->acao,$conexoes,$request));
            break;
        default :
            echo json_encode(
                array(
                    "error"=>"Por favor selecione uma ação!"
                )
            );
    }    
}catch(\Exception $e){
    echo json_encode(
            array(
                "error"=>"Por favor selecione uma ação!",
                "exception"=>$e->getMessage()
            )
        );
}

