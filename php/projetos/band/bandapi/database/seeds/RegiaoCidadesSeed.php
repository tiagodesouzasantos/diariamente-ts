<?php
use Illuminate\Database\Seeder;

class RegiaoCidadesSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(){        
        App\Models\RegiaoCidade::create([
            'nome' => 'Baixada Santista',
            'desc' => str_random(1000)            
        ]);
    }
}
?>