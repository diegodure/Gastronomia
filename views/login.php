<?php
    session_start();
    include("../conect.php");

    if(isset($_SESSION['user'])){
        echo '<script> window.location="clientes.php";</script>';
    }else{
        $title = "Login";
    }
?>
<!DOCTYPE html>
<html lang="es">
<?php
    include("head.php");
?>
<body ng-app="login">
 <div class="container" ng-controller="LoginCtrl">

    <div class="card card-container">
        <div>
            <img id="profile-img" class="profile-img-card" src="../img/avatar_2x.png" />
            <p id="profile-name" class="profile-name-card"></p>
            <form method="post" accept-charset="utf-8" action="../ingreso.php" name="loginform" autocomplete="off" role="form" class="form-signin">
            
                <span id="reauth-email" class="reauth-email"></span>
                <input class="form-control" placeholder="Usuario" name="user" type="text" value="" autofocus="" required>
                <input class="form-control" placeholder="Contraseña" name="pass" type="password" value="" autocomplete="off" required>
                <button type="submit" class="btn btn-lg btn-success btn-block btn-signin" name="login" id="submit">Iniciar Sesión</button>
            </form><!-- /form -->
        </div>
    </div>
         
    </div><!-- /container -->

  </body>
  <?php
    include("footer.php");
?>
</html>

