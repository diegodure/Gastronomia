<?php
	$data = json_decode(file_get_contents("php://input"));
	$idUsuario = $data->{"idUsuario"};
	$nombre = $data->{"nombre"};
	$apellido = $data->{"apellido"};
	$user = $data->{"user"};
	$pass = $data->{"pass"};
	$rol = $data->{"rol"};
	$sucursal = $data->{"sucursal"};
	
	include("../conect.php");

	$sql = "update usuarios set User='$user', Pass='$pass', nombre='$nombre', 
	apellido='$apellido',Roles_idRoles='$rol', Sucursal_idSucursal='$sucursal' where idUser='$idUsuario'";
	$results = $con->query($sql);

	if(!$results){ 
    	echo "error";
    }
    else{
    	echo "Usuario modificado correctamente!";
    }

	$con->close();
?>