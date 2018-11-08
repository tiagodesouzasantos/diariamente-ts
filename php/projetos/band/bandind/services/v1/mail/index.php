<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
//ini_set('default_charset', 'UTF-8');
error_reporting(0);
//ob_start();
include_once 'SendPhpMailer.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$sendPhpMailer = new SendPhpMailer();

$nomeRemetente = $request->nomeRemetente;
$emailRemetente = $request->emailRemetente;
$telefoneRemetente = $request->telefoneRemetente;
$nomeDestinatario = $request->nomeDestinatario;
$emailDestinatario = $request->emailDestinatario;

$assunto = $request->assunto;
$mensagem = nl2br($request->mensagem);
if($request->temAssinatura){
	$assinatura = "<br /><br />".
    "<div style='color:#CCCCCC; font-size:9px; font-weight:normal; line-height:130%;'>".
	    "<i>Não responda este e-mail!</i>".
    "</div>".
    "<div style='color:#CCCCCC; font-size:9px; font-weight:normal; line-height:130%; ".
    "margin-top:20px;'>Enviado por Bandeirantes Logística Integrada</div>".    
    
    "<div style='color:#CCCCCC; font-size:9px; font-weight:normal; line-height:130%;'>".
        "Este e-mail foi enviado dia ".date('d/m/Y').
    "</div>";

    $mensagem.=$assinatura;
}

switch ($request->acao) {
    case 'sendMail':
        echo json_encode($sendPhpMailer->sendMail($emailRemetente,
        $nomeRemetente,$emailDestinatario,$emailDestinatario,$assunto,$mensagem));
        break;
    default :
        echo 'Por favor selecione uma ação!';
}
