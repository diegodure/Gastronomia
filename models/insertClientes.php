<?php

	$data = json_decode(file_get_contents("php://input"));
	$nombre = $data->{"nombre"};
	$apellido = $data->{"apellido"};
	$info = $data->{"info"};

	include("../conect.php");

	$sql = "insert into clientes (idCliente, Nombre, Apellido, Info, active) values (null, '$nombre', '$apellido', '$info', 0)";
	$results = $con->query($sql);

	if(!$results){ 
    	echo "error";
    }else{
    	echo "Cliente creado correctamente!";
    }

	$con->close();
?>