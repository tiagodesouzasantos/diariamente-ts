<?php
include_once "FilesHelper.php";

class UploadFiles{    
    private $uploadPaths = array("admin-seg-user-multiclube"=>"../../../../media/usuario/admin-seg-user-multiclube/");

    public function uploadFile($uploadLocation,$file){
        $date = new DateTime();        
        $fileData = FilesHelper::extractNameExt($file['name']);
        $nameServer = $fileData['suggestName'].".".$fileData['ext'];
        $moveFile = move_uploaded_file($file['tmp_name'],$this->uploadPaths[$uploadLocation].$nameServer);
        $serverUrl = "http://dev1.truckinfomb.com.br/media/";
        if($moveFile){
            $urlFile = $serverUrl."index.php?main=usuario&sec=admin-seg-user-multiclube&doc=".$fileData['suggestName']."&type=".$fileData['ext']."&downloadName=".$fileData['name'];
        }
        return array("uploadFile"=>$moveFile,"nameServer"=>$nameServer,"urlFile"=>$urlFile);
    }    

}
?>