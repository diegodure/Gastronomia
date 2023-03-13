<?php

	$data = json_decode(file_get_contents("php://input"));
	$nombre = $data->{"nombre"};
	$apellido = $data->{"apellido"};
	$user = $data->{"user"};
	$pass = $data->{"pass"};
	$rol = $data->{"rol"};
	$sucursal = $data->{"sucursal"};
	

	include("../conect.php");

	$sql = "insert into usuarios (idUser, User, Pass, nombre, apellido, Roles_idRoles, Sucursal_idSucursal, active) values (null, '$nombre', '$apellido','$user', '$pass', '$rol', '$sucursal', 0)";
	$results = $con->query($sql);

	if(!$results){ 
    	echo "error";
    }
    else{
    	echo "Usuario creado correctamente!";
    }

	$con->close();
?>