<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDepartamentoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('departamentos', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nome', 255);           
            $table->longText('desc');                       
            $table->enum('status', ['yes', 'no']);
            $table->integer('fk_id_unidade')->unsigned();
            $table->foreign('fk_id_unidade')
                ->references('id')
                ->on('unidades')
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
        Schema::drop('departamentos');
    }
}
