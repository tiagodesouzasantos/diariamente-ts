<?php
// GD -> GROUP DATA ( EXISTE MUITAS TABELAS PARA FAZER DAO E BO DE CADA UMA)
// DAO -> DATA ACESS OBJECT ( CLASSE DE ACESSO AO DB)

include_once 'GDFuncionarioDAO.php';

class GDFuncionarioBO{
    public function getByCpf($con,$userData){
        $gdFuncionarioDAO = new GDFuncionarioDAO();
        $funcionarioData = $gdFuncionarioDAO->findByCPF($con,$userData);
        return $funcionarioData[0];
    }
}
?>