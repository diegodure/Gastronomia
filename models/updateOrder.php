<?php
	$data = json_decode(file_get_contents("php://input"));

	$total = $data->{"total"};
    $estado = $data->{"estado"};
    $idCliente = $data->{"idCliente"};
    $idTable = $data->{"idTable"};
    $idVenta = $data->{"idVenta"};
    $tipoPedido = $data->{"tipoPedido"};  // 'mesa', 'delivery', 'pickup'

    $detail = array($data->{"detail"});

    include("../conect.php");

    $sql = "delete from det_ventas where Ventas_idVentas='$idVenta'";
    $result = $con->query($sql);

    if(!$result){
    	echo "error al eliminar el detalle de la venta";
        $con->close();
        exit();
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
    	echo "Error al insertar el detalle de la venta";
        $con->close();
        exit();
    }else{
    	$sql3 = "update ventas set Total='$total', Estado='$estado' where idVentas='$idVentas'";
    	$result3 = $con->query($sql3);
    }

    if ($tipoPedido == "mesa" && $estado == 1) {
        $idTable = $data->{"idTable"};
        $sql4 = "UPDATE mesas SET Active=0 WHERE idMesas='$idTable'";
        $result4 = $con->query($sql4);

        if (!$result4) {
            echo "Error al cerrar la mesa";
            $con->close();
            exit();
        }
    }

    if(!$result3){
    	echo "error";
    }else{
        if($estado == 0){
            echo "Orden modificada correctamente";
        }else{
            if(!$result4){
                echo "error";
            }else{
                echo "Orden cerrada correctamente";
            }
        }
    }

    $con->close();
    
?>