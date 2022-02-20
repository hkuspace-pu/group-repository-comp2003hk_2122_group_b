<?php

include "config.php";
use PHPMailer\PHPMailer\PHPMailer;
require_once "C:/Program Files/Ampps/www_project/vue-trees-pwa/vendor/autoload.php";



    
    $str = json_decode(file_get_contents("php://input"));
    if ( $str === FALSE ) {
        $response[] = '{}';
    } else {

    $data = $str;
        
    $request = $data->request;
    

if($request == 5){

    require_once "C:/Program Files/Ampps/www_project/vue-trees-pwa/vendor/autoload.php";
    $mail = new PHPMailer;
    $mail->isSMTP();
    $mail->SMTPDebug = 2;
    $mail->SMTPSecure = 'ssl';  
    $mail->Host = 'smtp.netvigator.com';
    $mail->Port = 465;
    $mail->SMTPAuth = true;
    $mail->Username = 'timmok@netvigator.com';
    $mail->Password = 'XXXXXX';
    $mail->setFrom('timmok@netvigator.com', 'timmok@netvigator.com');
    //$mail->addReplyTo('timmok@netvigator.com', 'timmok@netvigator.com');
    $mail->addAddress('tinmok@gmail.com', 'tim mok');
    $mail->Subject = 'Testing PHPMailer2';
    //$mail->msgHTML(file_get_contents('message.html'), __DIR__);
    $mail->Body = 'This is a plain text message body';
    //$mail->addAttachment('test.txt');
    if (!$mail->send()) {
        echo 'Mailer Error: ' . $mail->ErrorInfo;
    } else {
        echo 'The email message was sent.';
    }
}




} 