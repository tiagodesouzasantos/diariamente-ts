<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::group(array('prefix' => 'api/v1'), function(){

  Route::get('/', function () {
      return response()->json(['message' => '[API] - BandHelp', 'status' => 'Connected']);;
  });
  
  Route::post('auth/login', 'AuthController@authenticate');
  Route::resource('usuarios', 'UsuariosController');
  Route::resource('recoverpass', 'HashRecoverPassController');
  Route::resource('rhusuarios', 'RhUsuariosController');
});

Route::get('/', function () {
    return redirect('api/v1');
});
// Route::get('/', function () {
//     return view('index');
// });
