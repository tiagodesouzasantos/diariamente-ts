<?php
use Illuminate\Database\Seeder;

class UsuarioSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(){        
        App\Models\Usuario::create([
            'nome' => 'Tiago',
            'email'=>'tiago.santos@bandeiranteslog.com.br',
            'senha'=>Hash::make('123'),
            'status' => true,
            'telefone' => '(13)3321-5050',
            'telefone' => '(13)99787-5050',
            'fk_id_grupo_atendimento'=>1,
            'fk_id_nivel_dificuldade'=>1,
            'fk_id_departamento'=>1,
            'fk_id_perfil'=>1
        ]);       
    }
}
?>