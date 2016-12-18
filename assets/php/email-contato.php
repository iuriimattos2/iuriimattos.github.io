<?php

header("Access-Control-Allow-Origin: *");

$nome = $_GET['nome'];

$tel = $_GET['tel'];

$messagem = $_GET['messagem'];

$destinatario = "iuriimattos@gmail.com"; ////// TROCAR DESTINATARIO DO EMAIL

$headers = "MIME-Version: 1.0\n";
$headers .= 'From: Contato <' . $email .'>' . "\r\n";
$headers .= "Content-Type: text/html; charset=\"UTF-8\"\n\n";
$assunto = 'Contato';
$mensagem = '
<html>
    <head>
        <title>Meu Site</title>
    </head>
    <body>
        <table cellspacing="0" cellpadding="0" style="width:100%;border-bottom:1px solid #eee;font-size:12px;line-height:135%;font-family:Helvetica,Arial, sans-serif">
            <tr style="background-color:#F5F5F5">
                <th style="vertical-align:top;color:#222;text-align:left;padding:7px 9px 7px 9px;border-top:1px solid #eee;">
                    <span>Nome: </span>
                </th>
                <td style="vertical-align:top;color:#333;width:60%;padding:7px 9px 7px 0;border-top:1px solid #eee;">
                    <div>' . $nome . '</div>
                </td>
            </tr>
            <tr style="background-color:#FFFFFF">
                <th style="vertical-align:top;color:#222;text-align:left;padding:7px 9px 7px 9px;border-top:1px solid #eee;">
                    <span>E-mail para contato: </span>
                </th>
                <td style="vertical-align:top;color:#333;width:60%;padding:7px 9px 7px 0;border-top:1px solid #eee;">
                    <div>'. $tel . '</div>
                </td>
            </tr>
            <tr style="background-color:#F5F5F5">
                <th style="vertical-align:top;color:#222;text-align:left;padding:7px 9px 7px 9px;border-top:1px solid #eee;">
                    <span>Mensagem: </span>
                </th>
                <td style="vertical-align:top;color:#333;width:60%;padding:7px 9px 7px 0;border-top:1px solid #eee;">
                    <div>'. $texto . '</div>
                </td>
            </tr>
        </table>
    </body>
</html>
';

$enviou = mail($destinatario, $assunto, $mensagem, $headers);
if ($enviou) {
    // echo "Email enviado com sucesso, em breve entraremos em contato";
    writeMsg(1);
}else {
    writeMsg(2);

    echo "Erro";
}

function writeMsg(n) {
    if(n==1)
    return "Mensagem enviada. Obrigado pelo contato";
    if(n==2)
    return "Erro";    
}
?>