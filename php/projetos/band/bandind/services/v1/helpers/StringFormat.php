<?php
class StringFormat{
    public static function seniorFormatHorarios($horario){
        try{    
            $formatando = str_replace('às','-',$horario);
            $formatando = str_replace('as','-',$formatando);
            $formatando = str_replace('hs','',$formatando);
            $formatando = str_replace('hrs','',$formatando);
            $formatando = explode('-',$formatando);
            $formatando = array(trim($formatando[0]),trim($formatando[1]));
            $formatando[0] = substr($formatando[0],2,1)=='h'?str_replace('h',':',$formatando[0]):$formatando[0];
            $formatando[1] = substr($formatando[1],2,1)=='h'?str_replace('h',':',$formatando[1]):$formatando[1];
            $formatando[0] = substr($formatando[0],(strlen($formatando[0])-1),1)==':'?$formatando[0].'00':$formatando[0];
            $formatando[1] = substr($formatando[1],(strlen($formatando[1])-1),1)==':'?$formatando[1].'00':$formatando[1];            
            return $formatando;
        }catch(\Exception $e){
            throw "Problemas na formatação!";
        }
    }
    public static function removeCnpjEspecialChar($cnpj){
        try{    
            $pattern = '/[a-zA-Z.\/-]/';
            $replacement = '';
            return preg_replace($pattern, $replacement, $cnpj);
        }catch(\Exception $e){
            throw "Problemas na formatação!";
        }
    }
}
?>