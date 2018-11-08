<?php
Class Senhas{
    public static function encryptPass($passToEncrypt){     
        return password_hash(
            $passToEncrypt, PASSWORD_BCRYPT, [
                'cost' => 10,
            ]
        );
    }

    public static function validPass($passToValid,$dbPass){
        return password_verify($passToValid, $dbPass);
    }
}
?>