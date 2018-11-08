<?php
use Illuminate\Database\Seeder;

class NivelDificuldadeSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(){        
        App\Models\NivelDificuldade::create([
            'nome' => 'Junior',
            'desc' => str_random(1000)            
        ]);
        App\Models\NivelDificuldade::create([
            'nome' => 'Pleno',
            'desc' => str_random(1000)            
        ]);
        App\Models\NivelDificuldade::create([
            'nome' => 'Senior',
            'desc' => str_random(1000)            
        ]);
    }
}
?>