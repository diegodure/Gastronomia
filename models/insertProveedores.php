<?php

	$data = json_decode(file_get_contents("php://input"));
	$nombre = $data->{"nombre"};
	$apellido = $data->{"apellido"};
	$info = $data->{"info"};
	if(!empty($data->{"enterprise"})){
		$empresa = $data->{"enterprise"};
	}else{
		$empresa = "";
	}

	include("../conect.php");

	$sql = "insert into proveedores (idProveedores, Nombre, Apellido, Informacion, Empresa, Active) values (null, '$nombre', '$apellido', '$info', '$empresa', 0)";
	$results = $con->query($sql);

	if(!$results){ 
    	echo "error";
    }
    else{
    	echo "Proveedor creado correctamente!";
    }

	$con->close();
?>