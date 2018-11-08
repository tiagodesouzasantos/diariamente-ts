<?php
namespace App\Jobs\Mail;
use App\Jobs\Mail\SendPhpMailer;

Class EmailPadraoBand{
    public static function sendRecoverPass($mailData){
        
        $sendPhpMailer = new SendPhpMailer();

        $nomeRemetente = '';
        $emailRemetente = '';
        
        $assunto = 'Recuperação de senha';
        $mensagem = nl2br(                       
            "<div style='background-color: antiquewhite;padding: 10px; border-radius: 10px; width: max-content; width: -moz-max-content;'>".
                "Olá ".ucfirst(strtolower($mailData['nome'])).
                ",<br/>abaixo segue o link para que possa mudar sua senha para uma nova.<br/><br/>".
                "<a href='".$mailData['link']."'>".$mailData['link']."</a><br/>".
                "<p>Esse link continuará ativo até alterar a senha ou gerar um novo.</p>"
        );
        $assinatura = "<br /><br />".
                "<div style='color:#a2a2a2; font-size:9px; font-weight:normal; line-height:130%;'>".
                    "<i>Não responda este e-mail!</i>".
                "</div>".
                "<div style='color:#a2a2a2; font-size:9px; font-weight:normal; line-height:130%; margin-top:10px;'>".
                    "Enviado por Bandeirantes Logística Integrada".
                "</div>".    
                "<div style='color:#a2a2a2; font-size:9px; font-weight:normal; line-height:130%;'>".
                    "Este e-mail foi enviado dia ".date('d/m/Y').
                "</div>".
            "</div>";

        $mensagem.=$assinatura;
        $enviado = $sendPhpMailer->sendMail(/*$emailRemetente,$nomeRemetente,*/$mailData['email'],$mailData['email'],$assunto,$mensagem);
        return $enviado['erro']==""?true:false;
        
    }
}
?>