<?php
namespace App\Repositories\Usuarios;
use App\Models\TbHashRecoverPass;
use App\Jobs\Random AS Random;
use App\Jobs\Mail\EmailPadraoBand AS MailBand;
use Hash;
use App\Repositories\Usuarios\UsuarioRepository AS Usuario;

class HashRecoverPassRepository{
    
    public function find($id){
        try{
            $tbHashRecoverPass = new TbHashRecoverPass();
            $usuario = new Usuario();
            $tbHashRecoverPass = $tbHashRecoverPass->where('hash', '=', $id)->first();
            $dadosUsuario = $usuario->findUsuarioByCpf($tbHashRecoverPass['cpf']);
            return array(
                "hashRecoverPass"=>$tbHashRecoverPass,
                "usuario"=>$dadosUsuario
            );
        }catch(\Exception $e){
            throw new \Exception($e->getMessage());
        }
    }

    public function listAll(){
        try{
            $TbHashRecoverPass = new TbHashRecoverPass();
            $TbHashRecoverPass = TbHashRecoverPass::get();
            return array(
                "lista"=>$TbHashRecoverPass
            );
        }catch(\Exception $e){
            throw new \Exception($e->getMessage());
        }
    }

    public function save($hashData){
        try{
            $usuario = new Usuario();
            
            $hashDataAll = $hashData->all();
            $tbHashRecoverPass =  new TbHashRecoverPass();

            $findUsuario = $usuario->findUsuarioByCpf($hashDataAll['cpf']);
            $email = false;
            if($findUsuario!=null){
                $hashDataAll['hash'] = date('dmyHms').Random::randomStringsNumbers(37);                
                $this->deleteByCpf($hashDataAll['cpf']);
                $tbHashRecoverPass->fill($hashDataAll);
                $tbHashRecoverPass->save();
                $ambiente = $_SERVER['HTTP_HOST'];//explode('.',$_SERVER['HTTP_HOST']);
                $links = array(
                    "localhost:8013"=>"http://localhost:3000/#/recoverpass/".$hashDataAll['hash'],
                    "dev.new.band"=>"http://dev.new.band/ediband/#/recoverpass/".$hashDataAll['hash'],
                    "web.new.band"=>"http://web.new.band/ediband/#/recoverpass/".$hashDataAll['hash'],
                    "web.bandeiranteslog"=>"http://web.bandeiranteslog.com.br/ediband/#/recoverpass/".$hashDataAll['hash'],
                );
                $data = array("nome"=>"Tiago","link"=>$links[$ambiente],"email"=>"tiago.santos@bandeiranteslog.com.br");
                $email = MailBand::sendRecoverPass($data);
            }

            return array(                
                "emailEnviado"=>$email,
                "usuarioExiste"=>$findUsuario!=null
            );
        }catch(\Exception $e){
            throw new \Exception($e->getMessage());
        }
    }
    
    public function update($usuarioData,$id){
        try{
            $usuario = new Usuario();
            $usuarioDataAll = $usuarioData->all();
            $usuarioResult = $usuario->update($usuarioData,$usuarioDataAll['id']);
            if($usuarioResult['atualizado']){
                $hashDeletada = $this->deleteByCpf($usuarioDataAll['cpf']);
            }

            return array(
                "atualizado"=>$usuarioResult['atualizado'],
                "hashRemovida"=>$hashDeletada['removido']
            );
        }catch(\Exception $e){
            throw new \Exception($e->getMessage());
        }
    }
    
    public function deleteByCpf($cpf){
        try{
            $tbHashRecoverPass =  new TbHashRecoverPass();
            $tbHashRecoverPassDelete = $tbHashRecoverPass->where('cpf', '=', $cpf)->delete();            
            return array(
                "removido"=>$tbHashRecoverPassDelete!=null
            );
        }catch(\Exception $e){
            throw new \Exception($e->getMessage());
        }
    }    

    public function findHashByCpf($cpf){
        $tbHashRecoverPass = new TbHashRecoverPass();
        $tbHashRecoverPass = $tbHashRecoverPass->where('cpf', '=', $cpf)->get();
        return array(
            "hashRecoverPass"=>$tbHashRecoverPasss
        );
    }
    
}
?>