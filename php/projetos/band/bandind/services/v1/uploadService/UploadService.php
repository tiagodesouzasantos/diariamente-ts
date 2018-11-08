<?php
    
class UploadService {
    
    private $fileContents;    
    private $fileExtension;
    private $fileName;    
    
    private $basePath;    
    private $finalPath;
    
    
    private $width;
    private $height;
    
    
    public function UploadService($basePath,$fileName,$blob){
        
        $this->fileContents = file_get_contents($blob);
        
                
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        $mimeType=$finfo->buffer($this->fileContents);
        $mimeType = explode('/',$mimeType);
        $this->fileExtension=$mimeType[1];
        
        $this->fileName=$fileName.'.'.$this->fileExtension;
        

        $this->finalPath = $basePath.$fileName.'.'.$this->fileExtension;    
        $this->uri = $basePath.$this->fileName;    
   
        
    }
    
    
    function definirDimensoesMaximas($maxWidth,$maxHeight){

        $src = imagecreatefromstring($this->fileContents);
        
        $size = array();
        $size[0] = imagesx($src);
        $size[1] = imagesy($src);
        
        // $this->originalWidth = $size[0];
        // $this->originalHeight = $size[1];
        $this->width = $size[0];
        $this->height = $size[1];

        if($this->width>$maxWidth || $this->height > $maxHeight){
            $ratio = $this->width/$this->height;
            if( $ratio > 1) {
                $this->width = $maxWidth;
                $this->height = $maxWidth/$ratio;
            }
            else {
                $this->width = $maxHeight*$ratio;
                $this->height = $maxHeight;
            }
        }
        
    }
    
    function salvarImg(){
          
        switch (strtolower($this->fileExtension)){
            
            case 'jpeg':
            case 'jpg':
                return $this->salvarImgJpg($this->fileContents);
                break;
            case 'png':
                return $this->salvarImgPng($this->fileContents);
                break;            
        }
        
        
    }

    function salvarImgPng($fileContents){
        
        $src = imagecreatefromstring($fileContents);
        
        $originalWidth = imagesx($src);
        $originalHeight = imagesy($src);
        
        $im = imagecreatetruecolor($this->width,$this->height);       
        $transparent = imagecolorallocatealpha($im, 0, 0, 0, 127);

        imagecolortransparent($im, $transparent);

        imagefill($im, $this->width-1, 0, $transparent);
        imagefill($im, 0, $this->height-1, $transparent);
        
        imagecopyresampled($im,$src,0,0,0,0,$this->width,$this->height,$originalWidth,$originalHeight);
        
        imagealphablending($im, false);
        imagesavealpha($im, true);
                
        $isUploaded = imagepng($im, $this->finalPath,9,PNG_FILTER_NONE);
        
        imagedestroy($im);
        if($isUploaded){
            return array(
                "success"=>true,
                "fileName"=>$this->fileName
            );
        }else{
            return array(
                "success"=>false
            );
        }
        
    }

    function salvarImgJpg($fileContents){
        
        $src = imagecreatefromstring($fileContents);
        
        $originalWidth = imagesx($src);
        $originalHeight = imagesy($src);


        $dst = imagecreatetruecolor($this->width,$this->height);                
        imagecopyresampled($dst,$src,0,0,0,0,$this->width,$this->height,$originalWidth,$originalHeight);
        // imagecopyresampled($dst,$src,0,0,0,0,$this->width,$this->height);
        
        $isUploaded = imagejpeg($dst,$this->finalPath); // adjust format as needed
        
        imagedestroy($dst);
        if($isUploaded){
            return array(
                "success"=>true,
                "fileName"=>$this->fileName
            );
        }else{
            return array(
                "success"=>false
            );
        }
        
    }
    
    function getFileContents() {
        return $this->fileContents;
    }

    function getFileExtension() {
        return $this->fileExtension;
    }

    function getBasePath() {
        return $this->basePath;
    }

    function getFinalPath() {
        return $this->finalPath;
    }

    function getWidth() {
        return $this->width;
    }

    function getHeight() {
        return $this->height;
    }

    function setFileContents($fileContents) {
        $this->fileContents = $fileContents;
    }

    function setFileExtension($fileExtension) {
        $this->fileExtension = $fileExtension;
    }

    function setBasePath($basePath) {
        $this->basePath = $basePath;
    }

    function setFinalPath($finalPath) {
        $this->finalPath = $finalPath;
    }

    function setWidth($width) {
        $this->width = $width;
    }

    function setHeight($height) {
        $this->height = $height;
    }



    
}

?>