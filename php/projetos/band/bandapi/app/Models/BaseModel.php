<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model as EloquentModel;

class BaseModel extends EloquentModel {
    public $timestamps = false;
    
    public function getDateFormat(){
        return 'Y-m-d H:i:s.u';
    }

    public function fromDateTime($value){
        return substr(parent::fromDateTime($value), 0, -3);
    }

}