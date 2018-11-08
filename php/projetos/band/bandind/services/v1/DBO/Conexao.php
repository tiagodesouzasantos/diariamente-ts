<?php
include_once __DIR__.'/../server/ServerConfigs.php';

class Conexao {
    
    private $connections;
    private $conexao;

    function __construct($selectedConection) {
        try {
            $this->connections = ServerConfigs::getDbCon();
            $dsn = $this->connections[$selectedConection]['dns'];
            $usernameDB = $this->connections[$selectedConection]['usernameDB'];
            $passDB = $this->connections[$selectedConection]['passDB'];

            $this->conexao = new \PDO($dsn, $usernameDB, $passDB,array(PDO::ATTR_TIMEOUT => "-1"));
            $this->conexao->exec("set names utf8");
            return $this->conexao;
        } catch (\Exception $exc) {
            throw $exc;
        }
    }

    public function executeProcedure(\PDOStatement $statement) {
        try {
            $statement->execute();
            return $statement->fetchAll(\PDO::FETCH_ASSOC);
        } catch (PDOException $exc) {
            throw $exc->getMessage();
        }
    }

    public function executeQuery(\PDOStatement $statement) {
        try {
            $statement->execute();
            return $statement->fetchAll(\PDO::FETCH_ASSOC);
        } catch (PDOException $exc) {
            throw $exc->getMessage();
        }
    }

    public function prepare($query) {
        try {
            return $this->conexao->prepare($query);
        } catch (PDOException $exc) {
            throw $exc->getMessage();
        }
    }

}
