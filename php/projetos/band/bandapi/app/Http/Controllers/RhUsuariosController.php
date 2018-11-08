<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use Hash;
use App\Repositories\Auth\AuthRepository AS Auth;

class RhUsuariosController extends Controller{
    public function __construct(){
    }
        
    public function index(){        
        return response()->json(["error"=>"Página inativa"],403);
    }
    public function show($id){
        try{
            $auth = new Auth();
            $authResult = $auth->auth(array("cpf"=>$id,"senha"=>""));
            // $arrayError = ($authResult==null)?['error' => array("module"=>"usuario","msg"=>4)]:[];
            // if(count($arrayError)>0){
            //     return response()->json($arrayError, 401);
            // }
            return response()->json($authResult, 201);        
        }catch(\Exception $exc){
            $error = array("message"=>"Problems","exc"=>$exc);
            return response()->json($error,404);  
        }
    }

    public function store(Request $request){
        return response()->json(["error"=>"Página inativa"],403);
    }

    public function update(Request $request, $id){
        return response()->json(["error"=>"Página inativa"],403);
    }

    public function destroy($id){
        return response()->json(["error"=>"Página inativa"],403);  
    }
}
