<?php

use Illuminate\Database\Seeder;

class DepartamentoSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(){
         App\Models\Departamento::create([
            'nome' => 'Tecnologia Informação',
            'desc' => str_random(100),
            'status'=>true,
            'fk_id_unidade'=>1
        ]);            
    }
}
