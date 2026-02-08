<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';                       //gmail SMTP server set to send through
    $mail->SMTPAuth   = true;
    $mail->Username   = 'jophits@gmail.com';                     //SMTP username (your gmail account)
    $mail->Password   = 'YOUR_APP_PASSWORD_HERE';                               //SMTP password (your gmail password or app password)
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = 465;

    //Recipients
    $mail->setFrom('jophits@gmail.com', 'J');         //Set the sender of the message (your email address)
    $mail->addAddress('DHIYA_EMAIL_HERE', 'Dhiya');     //Add a recipient (Dhiya's email address)

    //Content
    $mail->isHTML(true);
    $mail->Subject = '❤️';
    $mail->Body    = 'wt if im serious,gn❤️<br><br>~j';

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
