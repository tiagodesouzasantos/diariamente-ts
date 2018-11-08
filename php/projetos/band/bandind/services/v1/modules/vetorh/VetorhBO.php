<?php
include_once 'GDTreinamentoBO.php';

class VetorhBO{
    public function controller($action,$conexoes,$userData){
        switch($action){
            case 'treinamento':
                return $this->gdTreinamentoBO($conexoes,$userData);
            break;                
            default:
            return array("msg"=>"Por favor selecione a ação correta!");
        }
    }

    public function gdTreinamentoBO($conexoes,$userData){
        $gdTreinamentoBO = new GDTreinamentoBO();
        return $gdTreinamentoBO->controller($userData->param->actionVth,$conexoes,$userData);
    }

}
?>