<?php

class SaveFiles{
    
    public function saveFileFromBase64($dataFile){
      try{
        
      
        $data = $dataFile->image;
        if (preg_match('/^data:image\/(\w+);base64,/', $data, $type)) {
            $data = substr($data, strpos($data, ',') + 1);
            $type = strtolower($type[1]); // jpg, png, gif
        
            if (!in_array($type, $dataFile->validExtension)) {
                throw new \Exception('invalid image type');
            }
        
            $data = base64_decode($data);
        
            if ($data === false) {
                throw new \Exception('base64_decode failed');
            }
        } else {
            throw new \Exception('did not match data URI with image data');
        }
        
        $x = file_put_contents("../../../media/usuario/pets/{$dataFile->nameFile}.{$dataFile->extension}", $data);
        return $x;
      }catch( \Exception $e ){
        return 'error';
      }
    }
}
?>