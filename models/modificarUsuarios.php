<?php
	$data = json_decode(file_get_contents("php://input"));
	$idUsuario = $data->{"idUsuario"};
	$nombre = $data->{"nombre"};
	$apellido = $data->{"apellido"};
	$user = $data->{"user"};
	$pass = $data->{"pass"};
	$rol = $data->{"rol"};
	
	include("../conect.php");

	$sql = "update usuarios set User='$user', Pass='$pass', Nombre='$nombre', 
	Apellido='$apellido',Roles_idRoles='$rol' where idUsuarios='$idUsuario'";
	$results = $con->query($sql);

	if(!$results){ 
    	echo "error";
    }
    else{
    	echo "Usuario modificado correctamente!";
    }

	$con->close();
?>