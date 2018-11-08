<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
//ini_set('default_charset', 'UTF-8');
error_reporting(0);
//ob_start();

include_once 'UploadFiles.php';

$action = $_POST['action'];
$uploadFilesClass = new UploadFiles();

switch($action){
    case 'upload':
        echo json_encode($uploadFilesClass->uploadFile($_POST['locationFile'],$_FILES['file']));
    break;
    default:

}
?>