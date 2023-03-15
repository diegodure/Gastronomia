<?php
	$data = json_decode(file_get_contents("php://input"));
	$idP = $data->{"idP"};
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
	
	$sql = "update productos set Nombre='$nombre', Descripcion='$descripcion', Costo='$costo', PrecioUnitario='$precioUnitario',PrecioPromocional='$precioPromocional' where idProductos='$idP'";
	
	$results = $con->query($sql);

	if(!$results){ 
    	echo "error";
    }
    else{
    	echo "Producto modificado correctamente!";
    }

	$con->close();
?>