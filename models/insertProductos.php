<?php

	$data = json_decode(file_get_contents("php://input"));
	$nombre = $data->{"nombre"};
	$descripcion = $data->{"descripcion"};
	if(!empty($data->{"cantidad"})){
		$cantidad = $data->{"cantidad"};
	}else{
		$cantidad = 0;
	}
	if(!empty($data->{"cantidadMin"})){
		$cantidadMin = $data->{"cantidadMin"};
	}else{
		$cantidadMin = 0;
	}
	if(!empty($data->{"precioPromocional"})){
		$precioPromocional = $data->{"precioPromocional"};
	}else{
		$precioPromocional = 0;
	}
	$precioUnitario = $data->{"precioUnitario"};
	$precioMayorista = $data->{"precioMayorista"};
	$proveedor = $data->{"proveedor"};
	include("../conect.php");
	if (!empty($data->{"fechaVencimiento"})) {
		$fechaVencimiento = $data->{"fechaVencimiento"};
		$sql = "insert into productos (idProductos, Nombre, Descripcion, CantidadActual, CantidadMinima, PrecioUnitario, PrecioMayorista, PrecioPromocional, Proveedores_idProveedores, active, Vencimiento, Imagen, CodigoBarra) values (null, '$nombre', '$descripcion','$cantidad', '$cantidadMin', '$precioUnitario', '$precioMayorista', $precioPromocional, '$proveedor', 0, '$fechaVencimiento', null, '0')";
	}else{
		$sql = "insert into productos (idProductos, Nombre, Descripcion, CantidadActual, CantidadMinima, PrecioUnitario, PrecioMayorista, PrecioPromocional, Proveedores_idProveedores, active, Vencimiento, Imagen, CodigoBarra) values (null, '$nombre', '$descripcion','$cantidad', '$cantidadMin', '$precioUnitario', '$precioMayorista', $precioPromocional, '$proveedor', 0, null, null, '0')";
	}
	
	$results = $con->query($sql);

	if(!$results){ 
    	echo "error";
    }
    else{
    	echo "Producto creado correctamente!";
    }

	$con->close();
?>