<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
//ini_set('default_charset', 'UTF-8');
// error_reporting(0);
//ob_start();
include_once 'SaveFiles.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$request->nameFile = rand().'-'.date ('YmdHis');
$request->extension = 'jpg';
$request->validExtension = ['jpg','bmp','gif','png','jpeg'];

$data = $request->image;
$saveFiles = new SaveFiles();
$savingFile = $saveFiles->saveFileFromBase64($request);

echo json_encode($savingFile);

