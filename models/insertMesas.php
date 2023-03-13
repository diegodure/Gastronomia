<?php

	$data = json_decode(file_get_contents("php://input"));
	$nombre = $data->{"nombre"};
	if(!empty($data->{"descripcion"})){
		$descripcion = $data->{"descripcion"};
	}else{
		$descripcion = "";
	}

	include("../conect.php");

	$sql = "insert into mesas (idMesas, Nombre, Descripcion, Active) values (null, '$nombre', '$descripcion', 0)";
	$results = $con->query($sql);

	if(!$results){ 
    	echo "error";
    }
    else{
    	echo "Mesa creada correctamente!";
    }

	$con->close();
?>