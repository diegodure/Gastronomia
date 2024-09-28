<?php
    session_start();
    include("conect.php");

    if(isset($_SESSION['user'])){
        echo '<script> window.location="views/pacientes.php";</script>';
    }
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"/>
  <title>Login</title>
	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css">
  <!-- CSS  -->
   <link href="css/login.css" type="text/css" rel="stylesheet" media="screen,projection"/>
</head>
<body>
 <div class="container">
        <div class="card card-container">
            <div style="text-align:center;">
                <small style="font-weight: bolder;color: #286090;">Campos Obligatorios(*)</small>
            </div>
            <br>
            <form method="post" accept-charset="utf-8" action="registerData.php" name="loginform" autocomplete="off" role="form" class="form-signin">
                <input class="form-control" placeholder="Nombre de la empresa (*)" name="nombreEmpresa" type="text" value="" autofocus="" required>
                <input class="form-control" placeholder="Nombre de fantasía" name="nombreFantasia" type="text" value="">
                <input class="form-control" placeholder="Ruc (*)" name="ruc" type="text" value="">
                    <div style="text-align:center;margin-bottom: 10px;">
                        <small style="font-weight: bolder;color: #286090;">Datos de usuario admin</small>    
                    </div>
                <input class="form-control" placeholder="Usuario (*)" name="user" type="text" value="" required>
                <input class="form-control" placeholder="Contraseña (*)" name="pass" type="password" value="" autocomplete="off" required>
                <input class="form-control" placeholder="Nombre (*)" name="nombre" type="text" value="" required>
                <input class="form-control" placeholder="Apellido (*)" name="apellido" type="text" value="" required>
                <input class="form-control" placeholder="Ci (*)" name="ci" type="text" value="" required>
                <input class="form-control" placeholder="Teléfono (*)" name="telefono" type="text" value="" required>
                <button type="submit" class="btn btn-lg btn-success btn-block btn-signin" name="login" id="submit">Registrarse</button>
            </form><!-- /form -->
            
        </div><!-- /card-container -->
    </div><!-- /container -->
  </body>
</html>

