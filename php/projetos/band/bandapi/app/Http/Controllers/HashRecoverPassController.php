<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Repositories\Usuarios\HashRecoverPassRepository AS HashRecoverPass;

class HashRecoverPassController extends Controller{
    public function __construct(){
    }
        
    public function index(){
        $hashRecoverPass = new HashRecoverPass();
        $hashRecoverPassResult = $hashRecoverPass->listAll();
        return response()->json($hashRecoverPassResult);
    }
    public function show($id){
        try{
            $hashRecoverPass = new HashRecoverPass();
            $hashRecoverPassResult = $hashRecoverPass->find($id);
            if(count($hashRecoverPassResult['hashRecoverPass'])==0){
                $arrayError = ['error' => array("module"=>"usuario","msg"=>6)];
                return response()->json($arrayError, 400);
            }
            return response()->json($hashRecoverPassResult, 200);        
        }catch(\Exception $exc){
            $error = array("message"=>"Problems","exc"=>$exc);
            return response()->json($error,500);  
        }
    }

    public function store(Request $request){
        $hashRecoverPass = new HashRecoverPass();
        $hashRecoverPassResult = $hashRecoverPass->save($request);
        $arrayError = [];
			
        if(!$hashRecoverPassResult['usuarioExiste']) {
            $arrayError = ['error' => array("module"=>"usuario","msg"=>4)];
        }elseif(!$hashRecoverPassResult['emailEnviado']){
            $arrayError = ['error' => array("module"=>"app","msg"=>3)];
        }
        if(count($arrayError)>0){
            return response()->json($arrayError, 400);
        }
        return response()->json($hashRecoverPassResult, 200);
    }

    public function update(Request $request, $id){
        try{
            $hashRecoverPass = new HashRecoverPass();
            $hashRecoverPassResult = $hashRecoverPass->update($request,$id);
            $arrayError = [];
            if(!$hashRecoverPassResult['hashRemovida'] || !$hashRecoverPassResult['atualizado']){
                $arrayError = ['error' => array("module"=>"app","msg"=>3)];
            }
            if(count($arrayError)>0){
                return response()->json($arrayError, 400);
            }
            return response()->json($hashRecoverPassResult, 201);
        }catch(\Exception $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id){
        $usuario = new Usuario();
        $usuarioDeletar = $usuario->delete($id);
        $arrayError = (!$usuarioDeletar['removido'])?['error' => array("module"=>"app","msg"=>3)]:[];
        if(count($arrayError)>0){
            return response()->json($arrayError, 400);
        }
        return response()->json($usuarioResult, 200);     
    }
}
