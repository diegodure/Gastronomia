<?php
	$data = json_decode(file_get_contents("php://input"), true);

	//print_r($data);

	include("../conect.php");

    //Realizamos una consulta para saber el ultimo id de la venta

	$sql = "select max(idVentas) as idV from ventas";
        $result = $con->query($sql);

        //echo ($result->insert_id);
        if($row = mysqli_fetch_row($result)){
            $idV = trim($row[0]);

        }
     //Recorremos e insertamos los datos del json en el detalle de la venta
    $rawdata = array();
    $resta = 0;
    $i = 0;
	foreach($data as $obj){
        $idP = $obj['idProductos'];
        $precio = $obj['PrecioUnitario'];
        $cantidad = $obj['Cantidad'];
        $subT = $precio * $cantidad;
        $condicion = "Unidad";
        $sql2 = "insert into det_ventas (Ventas_idVentas, Productos_idProductos, Cantidad, Precio, subTotal, Condicion_Venta)
        values ('$idV', '$idP', '$cantidad', '$precio', '$subT', '$condicion')";
	    //print ($iva);
	    $result3 = $con->query($sql2);
	}

    if(!$result3){ 
        echo "error";
    }else{
        echo "Orden creada correctamente!";
    }

	$con->close();

?>