<?php
session_start();
?>
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
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    include("conect.php");

    if(isset($_POST['login'])) {
        $usuario = $_POST['user'];
        $pass = $_POST['pass'];

        // Verifica la conexión
        if ($con->connect_error) {
            die("Conexión fallida: " . $con->connect_error);
        }

        // Prepara la consulta SQL usando prepared statements
        $stmt = $con->prepare("SELECT usuarios.User, usuarios.Pass, usuarios.Nombre, usuarios.Apellido, 
            usuarios.idUsuarios, usuarios.empresa_id, roles.Nombre as rol 
            FROM usuarios 
            INNER JOIN roles ON usuarios.Roles_idRoles = roles.idRoles 
            WHERE User = ? AND Pass = ?");
        
        $stmt->bind_param("ss", $usuario, $pass);
        $stmt->execute();
        $result = $stmt->get_result();

        // Verifica si se encontraron resultados
        if ($result->num_rows > 0) {
            $row = $result->fetch_array();
            $_SESSION["user"] = $row['rol'];
            $_SESSION["idUser"] = $row['idUsuarios'];
            $_SESSION["idService"] = $row['empresa_id'];
            echo '<div class="logoLogin"><i class="fas fa-spinner"></i></div>';
            if($_SESSION["user"] == 'Mesero') {
                echo '<script> window.location="views/ventas.php"; </script>';
            } else {
                echo '<script> window.location="views/ventas.php"; </script>';
            }
        } else {
            echo '<script> alert("User o password incorrectos");</script>';
            echo '<script> window.location="../login.php"; </script>';
        }

        // Cierra la declaración y la conexión
        $stmt->close();
        $con->close();
    }
    ?>
</body>
</html>
