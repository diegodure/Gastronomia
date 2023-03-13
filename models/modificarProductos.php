<?php
	$data = json_decode(file_get_contents("php://input"));
	$idP = $data->{"idP"};
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
		$sql = "update productos set Nombre='$nombre', Descripcion='$descripcion', CantidadActual='$cantidad', 
	CantidadMinima='$cantidadMin',PrecioUnitario='$precioUnitario',PrecioMayorista='$precioMayorista',PrecioPromocional='$precioPromocional', Proveedores_idProveedores='$proveedor', Vencimiento='$fechaVencimiento' where idProductos='$idP'";
	}else{
		$sql = "update productos set Nombre='$nombre', Descripcion='$descripcion', CantidadActual='$cantidad', 
	CantidadMinima='$cantidadMin',PrecioUnitario='$precioUnitario',PrecioMayorista='$precioMayorista',PrecioPromocional='$precioPromocional', Proveedores_idProveedores='$proveedor', Vencimiento=null where idProductos='$idP'";
	}

	
	$results = $con->query($sql);

	if(!$results){ 
    	echo "error";
    }
    else{
    	echo "Producto modificado correctamente!";
    }

	$con->close();
?>