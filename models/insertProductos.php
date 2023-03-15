<?php

	$data = json_decode(file_get_contents("php://input"));
	$nombre = $data->{"nombre"};
	$descripcion = $data->{"descripcion"};
	if(!empty($data->{"costo"})){
		$costo = $data->{"costo"};
	}else{
		$costo = 0;
	}
	if(!empty($data->{"precioPromocional"})){
		$precioPromocional = $data->{"precioPromocional"};
	}else{
		$precioPromocional = 0;
	}
	$precioUnitario = $data->{"precioUnitario"};
	include("../conect.php");
	
	$sql = "insert into productos (idProductos, Nombre, Descripcion, Costo, PrecioUnitario, PrecioPromocional, Active,Imagen) values (null, '$nombre', '$descripcion', '$costo', '$precioUnitario', $precioPromocional, 0,null)";
	
	
	$results = $con->query($sql);

	if(!$results){ 
    	echo "error";
    }
    else{
    	echo "Producto creado correctamente!";
    }

	$con->close();
?>