<?php

	$data = json_decode(file_get_contents("php://input"));
	$nombre = $data->{"nombre"};
	$apellido = $data->{"apellido"};
	$user = $data->{"user"};
	$pass = $data->{"pass"};
	$rol = $data->{"rol"};

	include("../conect.php");

	$sql = "insert into usuarios (idUsuarios, Nombre, Apellido, User, Pass, Roles_idRoles) values (null, '$nombre', '$apellido','$user', '$pass', '$rol')";
	$results = $con->query($sql);

	if(!$results){ 
    	echo "error";
    }
    else{
    	echo "Usuario creado correctamente!";
    }

	$con->close();
?>