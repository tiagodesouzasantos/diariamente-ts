<?php

namespace App\Models;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

class TbUsuario extends BaseModel implements AuthenticatableContract, CanResetPasswordContract{
    use Authenticatable, CanResetPassword;
    protected $connection = 'usuariosBandCon';
    protected $fillable = ['cpf','matricula','nome', 'email','pontos','foto','setor','local','senha'];
    protected $hidden = ['senha'];
}
