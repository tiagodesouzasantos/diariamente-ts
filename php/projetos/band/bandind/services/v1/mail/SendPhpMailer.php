<?php
/**
* Description of SendPhpMailer
*
* @author Tiago
*/
include_once 'phpmailer/PHPMailerAutoload.php';

class SendPhpMailer {

    public function sendMail(/* $senderMail, $senderName, */ $mailDest, $mailFrom, $subject, $htmlMsg, $attachmentDirectory = null, $newNameToAttachment = null){

        $mail = new PHPMailer();
        $mail->IsSMTP();
        $mail->SMTPOptions = array(
            'ssl' => array(
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            )
        );
        $mail->SMTPAuth = false;
        $mail->Host 	= '172.19.34.23';
        $mail->Port     = '25';

        // Seta os remetentes
        $mail->From 	= 'comunicadoti@bandeiranteslog.com.br';
        $mail->FromName = 'Bandeirantes Logística Integrada';

        // Seta os destinatarios (cliente e vendedor)
        // $mail->addReplyTo("$senderMail", "$senderName");
        $mail->AddAddress( "$mailFrom", "$mailDest" );

        $mail->IsHTML( true );
        $mail->CharSet 	= 'UTF-8';

        $mail->Subject  = $subject;

        $mail->msgHTML($htmlMsg);

        $mail->addAttachment($attachmentDirectory, $newNameToAttachment);

        if (!$mail->send()) {
            return (array("erro" => $mail->ErrorInfo));
        } else {
            return (array("erro" => ""));
        }
    }
}
