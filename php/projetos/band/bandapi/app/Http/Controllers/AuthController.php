<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use Tymon\JWTAuth\Facades\JWTAuth;
use Hash;
use App\Repositories\Auth\AuthRepository AS Auth;

class AuthController extends Controller{
	public function authenticate(Request $request) {
		try{
			
			$credentials = $request->only('cpf', 'senha');
			$auth = new Auth();
			$authResult = $auth->auth($credentials);
			$arrayError = [];
			
			if($authResult['usuarioRh']==null && $authResult['usuario']==null) {
				$arrayError = ['error' => array("module"=>"usuario","msg"=>4)];
			}elseif(!$authResult['senhaValida'] && $authResult['usuario']!=null){
				$arrayError = ['error' => array("module"=>"usuario","msg"=>1)];
			}elseif($authResult['usuarioRh']!=null && $authResult['usuario']==null){
				$arrayError = ['error' => array("module"=>"usuario","msg"=>5)];				
			}

			if(count($arrayError)>0){
				return response()->json($arrayError, 401);
			}

			$token = JWTAuth::fromUser($authResult['usuario']);
			
			$objectToken = JWTAuth::setToken($token);
			$expiration = JWTAuth::decode($objectToken->getToken())->get('exp');
			$apiToken = array(
				"tokenData"=>array(
					'access_token' => $token,
					'token_type' => 'Bearer',
					'expires_in' => \Config::get('jwt.ttl') * 60
				)
			);
			$apiResult = array_merge($authResult,$apiToken);
			return response()->json($apiResult);
		}catch(\Exception $e){
			return response()->json([
				'error' => $e->getMessage()
			], 401);
		}
	}
}
