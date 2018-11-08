<?php
class FilesHelper{
    public static function extractNameExt($fullName){
        $explodedName = explode('.',$fullName);
        $ext = $explodedName[(sizeof($explodedName)-1)];
        array_pop($explodedName);
        $name = join('.',$explodedName);
        $suggestName = FilesHelper::getRandName();
        return array ("ext"=>$ext,"name"=>$name, "suggestName"=>$suggestName);
    }   
    
    public static function getRandName(){
        $time = microtime(true);
        $micro_time=sprintf("%06d",($time - floor($time)) * 1000000);
        $date=new DateTime( date('Y-m-d H:i:s.'.$micro_time,$time) );
        return $date->getTimestamp().$date->format("u").rand();
    }
}
?>