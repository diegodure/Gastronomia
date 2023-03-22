<?php
	$data = json_decode(file_get_contents("php://input"));

	$total = $data->{"total"};
    $idCliente = $data->{"idCliente"};
    $idTable = $data->{"idTable"};
    $idVenta = $data->{"idVenta"};

    $detail = array($data->{"detail"});

    include("../conect.php");

    $sql = "delete from det_ventas where Ventas_idVentas='$idVenta'";
    $result = $con->query($sql);

    if(!$result){
    	echo "error al eliminar el detalle de la venta";
    }else{
    	foreach ($detail as $valor){
	    	foreach($valor as $v){
	    		$PrecioUnitario = $v->{"PrecioUnitario"};
	    		$Cantidad = $v->{"Cantidad"};
	    		$CondicionVenta = "Unidad";
	    		$idVentas = $idVenta;
	    		$idProducto = $v->{"idProductos"};
	    		$subTotal = $PrecioUnitario * $Cantidad; 
	    		$sql2 = "insert into det_ventas (Precio, Cantidad, Condicion_Venta, subTotal, Ventas_idVentas, Productos_idProductos) values ('$PrecioUnitario', '$Cantidad', '$CondicionVenta', '$subTotal', '$idVentas', '$idProducto')";
	    		$result2 = $con->query($sql2);
	    	}
	    }	
    }

    if(!$result2){
    	echo "error";
    }else{
    	$sql3 = "update ventas set Total='$total' where idVentas='$idVentas'";
    	$result3 = $con->query($sql3);
    }

    if(!$result3){
    	echo "error";
    }else{
    	echo "Orden modificada correctamente";
    }

    $con->close();
    
?>