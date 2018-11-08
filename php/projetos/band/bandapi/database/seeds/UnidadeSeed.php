<?php
use Illuminate\Database\Seeder;

class UnidadeSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(){        
        App\Models\Unidade::create([
            'nome' => 'Corporativo I',
            'telefone' => '3221-5050',
            'email'=>'corporativo@bandeiranteslog.com.br',
            'endereco'=>'Rua visconde do rio branco nº2 - 1º Andar',
            'site'=>'http://bandeiranteslog.com.br',
            'cep'=>'00000-000',
            'cpf_cnpj'=>'00.000.000/0000-00',
            'status'=>'true',
            'lat'=>-24.456456,
            'lng'=>-44.654654,
            'fk_id_regiao_estado'=>1
        ]);       
    }
}
?>