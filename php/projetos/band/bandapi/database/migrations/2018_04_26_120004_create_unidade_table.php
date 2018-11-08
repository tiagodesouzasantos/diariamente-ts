<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUnidadeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('unidades', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nome', 255);
            $table->string('telefone', 30);            
            $table->string('email', 255);            
            $table->longText('endereco');            
            $table->string('site',255);            
            $table->string('cep',50);            
            $table->string('cpf_cnpj',50);            
            $table->enum('status', ['yes', 'no']);          
            $table->float('lat', 3,8);          
            $table->float('lng', 3,8);
            $table->integer('fk_id_regiao_estado')->unsigned();
            $table->foreign('fk_id_regiao_estado')
                ->references('id')
                ->on('regiao_cidades')
                ->onDelete('cascade');     
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('unidades');
    }
}
