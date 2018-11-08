<?php
use Illuminate\Database\Seeder;

class GrupoAtendimentoSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(){        
        App\Models\GrupoAtendimento::create([
            'nome' => 'Infra Estrutura',
            'desc' => str_random(1000)            
        ]);
        App\Models\GrupoAtendimento::create([
            'nome' => 'Sistemas',
            'desc' => str_random(1000)            
        ]);
    }
}
?>