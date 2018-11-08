<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TbUsuario;
use App\Http\Requests;
use Hash;
use App\Repositories\Usuarios\UsuarioRepository AS Usuario;

class UsuariosController extends Controller{
    public function __construct(){
        $this->middleware('jwt.auth', ['except' => ['store']]); 
    }
        
    public function index(){
        $usuario = new Usuario();
        $usuarioResult = $usuario->listAll();
        return response()->json($usuarioResult);
    }
    public function show($id){
        try{
            $usuario = new Usuario();
            $usuarioResult = $usuario->find($id);
            $arrayError = (!$usuarioResult['usuario'])?['error' => array("module"=>"usuario","msg"=>4)]:[];
            if(count($arrayError)>0){
                return response()->json($arrayError, 401);
            }
            return response()->json($usuarioResult, 201);        
        }catch(\Exception $exc){
            $error = array("message"=>"Problems","exc"=>$exc);
            return response()->json($error,404);  
        }
    }

    public function store(Request $request){
        $usuario = new Usuario();
        $usuarioResult = $usuario->save($request);
        $arrayError = [];
			
        if($usuarioResult['usuarioExiste'] && !$usuarioResult['criado']) {
            $arrayError = ['error' => array("module"=>"usuario","msg"=>2)];
        }elseif(!$usuarioResult['colabBand']){
            $arrayError = ['error' => array("module"=>"usuario","msg"=>4)];
        }
        if(count($arrayError)>0){
            return response()->json($arrayError, 401);
        }
        return response()->json($usuarioResult, 201);
    }

    public function update(Request $request, $id){
        $usuario = new Usuario();
        $usuarioResult = $usuario->update($request,$id);
        $arrayError = (!$usuarioResult['usuarioExiste'])?['error' => array("module"=>"usuario","msg"=>4)]:[];
        if(count($arrayError)>0){
            return response()->json($arrayError, 401);
        }
        return response()->json($usuarioResult, 201);

    }

    public function destroy($id){
        $usuario = new Usuario();
        $usuarioDeletar = $usuario->delete($id);
        $arrayError = (!$usuarioDeletar['removido'])?['error' => array("module"=>"app","msg"=>3)]:[];
        if(count($arrayError)>0){
            return response()->json($arrayError, 401);
        }
        return response()->json($usuarioResult, 201);     
    }
}
