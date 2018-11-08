<?php
include_once 'TbUsuariosDAO.php';
include_once 'TbHashRecoverPassDAO.php';
include_once 'ConfigsUsuarioDAO.php';
include_once 'TbUsuarioPerfilAcessoDAO.php';
include_once __DIR__.'\..\vetorh\GDFuncionarioBO.php';
include_once __DIR__.'\..\..\secure\Senhas.php';
include_once __DIR__.'\..\..\secure\Random.php';
include_once __DIR__.'\..\..\mail\EmailPadraoBand.php';

class LoginBO{

    public function controller($action,$conexoes,$userData){
        switch($action){
            case 'auth':
                return $this->authLogin($conexoes,$userData);
            break;
            case 'newUser':
                return $this->newUser($conexoes,$userData);
            break;
            case 'recoverPass':
                return $this->recoverPass($conexoes,$userData);
            break;
            case 'getToken':
                return $this->getToken($conexoes,$userData);
            break;
            case 'updatePass':
                return $this->updatePass($conexoes,$userData);
            break;
            default:
            return array();
        }
    }

    public function authLogin($conexoes,$userData){
        try{
            $tbUsuariosDAO = new TbUsuariosDAO();
            $configsUsuarioDAO = new ConfigsUsuarioDAO();

            $user = $tbUsuariosDAO->findByCpf($conexoes['usuariosBand'],$userData);
            $userExist = count($user)>0?true:false;
            $userRH = $this->getColabVetorh($conexoes,$userData);
            $validPass = Senhas::validPass($userData->senha,$user['senha']);
            unset($user['senha']);
            if($userExist){
                $user['foto'] = "data:image/jpeg;base64,".base64_encode(file_get_contents($user['foto']));
                $user['foto'] = $user['foto']=="data:image/jpeg;base64,"?'':$user['foto'];
            }
            return array("user"=>$validPass?$user:null,
                        "userExist"=>$userExist,
                        "userRH"=>$userRH,
                        "validPass"=>$validPass,
                    "a"=>$user);
        }catch(\Exception $e){
            return array("error"=>"Problemas na autenticação!","exception"=>$e->getMessage());
        }
    }

    public function getColabVetorh($conexoes,$userData){
        $gdFuncionarioBO = new GDFuncionarioBO();
        return $gdFuncionarioBO->getByCpf($conexoes['vetorhCon'],$userData);
    }

    public function newUser($conexoes,$userData){
        try{
            $tbUsuariosDAO = new TbUsuariosDAO();   

            $consultaCpf = $this->authLogin($conexoes,$userData->param);
            $userRH = $consultaCpf["userRH"];
            $userData->param->foto = "http://boraceia:8080/rubiweb/imagens/colaboradores/FotColab".$userRH["id_emp"]."-".$userRH["tip_col"]."-".$userRH["matricula"].".jpg";
            $salvar = !$consultaCpf['userExist'] && !$consultaCpf['validPass'] && $consultaCpf['userRH']!=null;

            if($salvar){
                $userData->param->senha = Senhas::encryptPass($userData->param->senha);
                $user = $tbUsuariosDAO->save($conexoes['usuariosBand'],$userData->param);
            }
            return array("userExist"=>$consultaCpf['userExist'],"created"=>$salvar,"colab"=>($consultaCpf['userExist'] && $consultaCpf['userRH']==null));
        }catch(\Exception $e){
            return array("error"=>"Problemas na criação do novo usuário!","exception"=>$e->getMessage());
        }
    }

    public function recoverPass($conexoes,$userData){
        try{
            $tbUsuariosDAO = new TbUsuariosDAO();
            $tbHashRecoverPassDAO = new TbHashRecoverPassDAO();
            $emailPadraoBand =  new EmailPadraoBand();
            $user = $tbUsuariosDAO->findByCpf($conexoes['usuariosBand'],$userData->param);
            if($user!=null){
                $userData->param->hash = date('dmyHms').Random::randomStringsNumbers();
                $tbHashRecoverPassDAO->deleteByCpf($conexoes['usuariosBand'],$userData->param);
                $hash = $tbHashRecoverPassDAO->insert($conexoes['usuariosBand'],$userData->param);
                $ambiente = explode('.',$_SERVER['HTTP_HOST']);
                $links = array(
                    // "dev"=>"http://localhost:3000/#/recoverpass/".$userData->param->hash,
                    "dev"=>"http://dev.new.band/ediband/#/recoverpass/".$userData->param->hash,
                    "web"=>"http://web.bandeiranteslog.com.br/ediband/#/recoverpass/".$userData->param->hash
                );

            }
            $user = json_decode(json_encode($user));
            $user->link = $links[$ambiente[0]];
            $emailEnviado = $emailPadraoBand->sendRecoverPass($user);
            return array("mail"=>$emailEnviado);
        }catch(\Exception $e){
            return array("error"=>"Problemas na recuperação!","exception"=>$e->getMessage());
        }
    }

    public function getToken($conexoes,$userData){
        try{
            $tbHashRecoverPassDAO = new TbHashRecoverPassDAO();
            $token = $tbHashRecoverPassDAO->find($conexoes['usuariosBand'],$userData->param);
            if($token!=null){
                $validToken = true;                                
            }else{
                $validToken = false;
            }
            return array("token"=>$token,"validToken"=>$validToken);
        }catch(\Exception $e){
            return array("error"=>"Problemas na recuperação!","exception"=>$e->getMessage());
        }
    }

    public function updatePass($conexoes,$userData){
        try{
            $tbUsuariosDAO = new TbUsuariosDAO();
            $tbHashRecoverPassDAO = new TbHashRecoverPassDAO();            
            $usuario = array(
                "cpf"=>$userData->param->token->cpf,
                "senha"=>Senhas::encryptPass($userData->param->senha),
                "hash"=>trim($userData->param->token->hash)
            );
            $usuario = json_decode(json_encode($usuario),FALSE);
            $update = $tbUsuariosDAO->updatePass($conexoes['usuariosBand'],$usuario);                      
            if($update){
                $delete = $tbHashRecoverPassDAO->delete($conexoes['usuariosBand'],$usuario);;
            }
            return array("updated"=>$update,"deleted"=>$delete);
        }catch(\Exception $e){
            return array("error"=>"Problemas na recuperação!","exception"=>$e->getMessage());
        }
    }
}
?>