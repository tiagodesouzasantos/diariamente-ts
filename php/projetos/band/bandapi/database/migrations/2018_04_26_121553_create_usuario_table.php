<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsuarioTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nome', 255);           
            $table->string('email',255)->unique();                       
            $table->string('senha',255);                       
            $table->enum('status', ['yes', 'no']);
            $table->string('telefone',100);                       
            $table->string('celular',100);   

            // ###################################################
            $table->integer('fk_id_grupo_atendimento')->unsigned();
            $table->foreign('fk_id_grupo_atendimento')
                    ->references('id')
                    ->on('grupo_atendimentos')
                    ->onDelete('cascade'); 
            // ###################################################
            $table->integer('fk_id_nivel_dificuldade')->unsigned();
            $table->foreign('fk_id_nivel_dificuldade')
                    ->references('id')
                    ->on('nivel_dificuldades')
                    ->onDelete('cascade'); 
            // ###################################################
            $table->integer('fk_id_departamento')->unsigned();
            $table->foreign('fk_id_departamento')
                    ->references('id')
                    ->on('departamentos')
                    ->onDelete('cascade');  
            // ###################################################
            $table->integer('fk_id_perfil')->unsigned();
            $table->foreign('fk_id_perfil')
                    ->references('id')
                    ->on('perfils')
                    ->onDelete('cascade');     
            // ###################################################
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
        Schema::drop('usuarios');
    }
}
