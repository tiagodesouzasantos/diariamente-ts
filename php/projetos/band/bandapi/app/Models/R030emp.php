<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class R030emp extends Model{
    protected $connection = 'vetorhCon';
    protected $table = 'R030EMP';
    protected $fillable = ['numemp','apeemp'];
}
