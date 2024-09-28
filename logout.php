<!DOCTYPE html>
<html>
<head>
    <title>Validando..</title>
    <meta charset="utf-8">
    <link href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="css/general.css">
</head>
<body>
<?php
    session_start();
    session_destroy();
    echo '<div class="logoLogin"><i class="fas fa-spinner"></i></div>';
    echo '<script> window.location= "login.php";</script>';
?>
</body>
</html>