<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\BaseModel;


class TbHashRecoverPass extends BaseModel{
    protected $connection = 'usuariosBandCon';
    protected $table = 'TB_HASH_RECOVER_PASS';
    protected $fillable = ['hash','cpf'];
}
