<?php

	session_start();
?>
<!DOCTYPE html>
<html>
<head>
	<title>Validando..</title>
	<meta charset="utf-8">
</head>
<body>
	<?php

		include("conect.php");
		if(isset($_POST['login'])){

			$usuario = $_POST['user'];
			$pass = $_POST['pass'];
			$sql = "select usuarios.User, usuarios.Pass, roles.Nombre as rol from usuarios inner join roles on usuarios.Roles_idRoles=roles.idRoles where User='$usuario' and Pass='$pass'";
			$result = $con->query($sql);
			if($result = $con->query($sql)){
				$row = $result->fetch_array();
				$_SESSION["user"] = $row['rol'];
				echo 'Iniciando sesion para '.$_SESSION['user'].' ';
				echo '<script> window.location="views/clientes.php"; </script>';
			}else{
				echo '<script> alert("User o password incorrectos");</script>';
				echo '<script> window.location="views/login.php"; </script>';
			}
		}
	?>
</body>
</html>