<?php
namespace App\Repositories\Usuarios;
use App\Models\TbUsuario;
use App\Repositories\Auth\AuthRepository AS Auth;
use Hash;

class UsuarioRepository{
    
    public function find($id){
        try{
            $tbUsuario = new TbUsuario();
            $tbUsuario = TbUsuario::find($id);
            return array(
                "usuario"=>$tbUsuario
            );
        }catch(\Exception $e){
            throw new \Exception($e->getMessage());
        }
    }

    public function listAll(){
        try{
            $tbUsuario = new TbUsuario();
            $tbUsuario = TbUsuario::get();
            return array(
                "lista"=>$tbUsuario
            );
        }catch(\Exception $e){
            throw new \Exception($e->getMessage());
        }
    }

    public function save($usuarioData){
        try{
            $tbUsuario = new TbUsuario();
            $auth = new Auth();
            $usuarioSalvar = $usuarioData->all();
            $userExist = $this->findUsuarioByCpf($tbUsuario['cpf']);
            $consultaUsuario = $auth->auth($usuarioSalvar);
            $salvar = !$consultaUsuario['usuarioExiste'] && !$consultaUsuario['senhaValida'] && $consultaUsuario['usuarioRh']!=null;
            if($salvar){
                $usuarioRh = $consultaUsuario['usuarioRh'];
                $usuarioSalvar['foto'] = "http://boraceia:8080/rubiweb/imagens/colaboradores/FotColab".$usuarioRh->id_emp."-".$usuarioRh->tip_col."-".$usuarioRh->matricula.".jpg";            
                $usuarioSalvar['senha'] = Hash::make($usuarioSalvar['senha']);
                $tbUsuario->fill($usuarioSalvar);
                $tbUsuario->save();
            }
            return array(
                "usuarioExiste"=>$consultaUsuario['usuarioExiste'],
                "criado"=>$salvar,
                "colabBand"=>($consultaUsuario['usuarioRh']!=null)
            );
        }catch(\Exception $e){
            throw new \Exception($e->getMessage());
        }
    }
    
    public function update($usuarioData,$id){
        try{
            $tbUsuario = new TbUsuario();
            $tbUsuario = TbUsuario::find($id);
            $usuarioSalvar = $usuarioData->all();
            if($tbUsuario!=null){
                $usuarioSalvar['senha'] = Hash::make($usuarioSalvar['senha']);
                $tbUsuario->fill($usuarioSalvar);
                $tbUsuario->save();
            }             
            return array(
                "atualizado"=>$tbUsuario!=null,
                "usuarioExiste"=>$tbUsuario!=null
            );
        }catch(\Exception $e){
            throw new \Exception($e->getMessage());
        }
    }
    
    public function delete($id){
        try{
            $tbUsuario = new TbUsuario();
            $tbUsuario = TbUsuario::find($id);
            if($tbUsuario!=null){
                $tbUsuario->delete();
            }
            return array(
                "removido"=>$tbUsuario!=null
            );
        }catch(\Exception $e){
            throw new \Exception($e->getMessage());
        }
    }

    public function findUsuarioByCpf($cpf){
        return TbUsuario::where('cpf', $cpf)->first();
    }
}
?>