<?php
namespace App\Repositories\Auth;
use Hash;
use App\Repositories\Auth\RhUsuarioRepository AS RhUsuario;
use App\Repositories\Usuarios\UsuarioRepository AS Usuario;

class AuthRepository{
    public function auth($credentials){
        try{
            $rhUsuario = new RhUsuario();
            $usuario = new Usuario();
            $validPass = false;
            $rhUsuarioResult = $rhUsuario->findUserByCpf($credentials);
            $usuarioResult = $usuario->findUsuarioByCpf($credentials['cpf']);
            $userExist = count($usuarioResult)>0?true:false;
            if($userExist){
                $validPass = Hash::check($credentials['senha'], $usuarioResult->senha);
                $fotoExist = @file_get_contents($usuarioResult['foto']);
                if($fotoExist){
                    $usuarioResult['foto'] = "data:image/jpeg;base64,".base64_encode($fotoExist);
                    $usuarioResult['foto'] = $usuarioResult['foto']=="data:image/jpeg;base64,"?'':$usuarioResult['foto'];
                }
            }

            return array(
                "usuario"=>$usuarioResult,
                "usuarioExiste"=>$userExist,
                "usuarioRh"=>$rhUsuarioResult,
                "senhaValida"=>$validPass
            );
        }catch(\Exception $e){
            throw new \Exception($e->getMessage());
        }
    }
}
?>