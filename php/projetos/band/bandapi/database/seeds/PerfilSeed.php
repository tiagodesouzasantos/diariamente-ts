<?php
use Illuminate\Database\Seeder;

class PerfilSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(){        
        App\Models\Perfil::create([
            'nome' => 'Técnico',
            'desc' => str_random(1000)            
        ]);
        
        App\Models\Perfil::create([
            'nome' => 'Solicitante',
            'desc' => str_random(1000)            
        ]);

        App\Models\Perfil::create([
            'nome' => 'Admin',
            'desc' => str_random(1000)            
        ]);
    }
}
?>