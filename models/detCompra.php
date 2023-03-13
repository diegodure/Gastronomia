<?php
	$data = json_decode(file_get_contents("php://input"), true);

	//print_r($data);

	include("../conect.php");

    //Realizamos una consulta para saber el ultimo id de la venta

	$sql = "select max(idCompras) as idC from compras";
        $result = $con->query($sql);

        //echo ($result->insert_id);
        if($row = mysqli_fetch_row($result)){
            $idC = trim($row[0]);

        }
     //Recorremos e insertamos los datos del json en el detalle de la venta
    $rawdata = array();
    $suma = 0;
    $i = 0;
	foreach($data as $obj){
        $idP = $obj['id'];
        $precio = $obj['precio'];
        $cantidad = $obj['cantidad'];
        $subT = $obj['subT'];
        $sql2 = "insert into det_compras (Compras_idCompras, Productos_idProductos, Cantidad, Precio, subTotal, Condicion)
        values ('$idC', '$idP', '$cantidad', '$precio', '$subT','Contado')";
	    //print ($iva);
	    $con->query($sql2);

        $sql3 = "select CantidadActual from productos where idProductos='$idP'";
        $result2 = $con->query($sql3);
        while ($row = mysqli_fetch_array($result2)) {
            $rawdata[$i] = $row;
            
            $suma = $row["CantidadActual"] + $cantidad;
            $sql4 = "update productos set CantidadActual='$suma' where idProductos='$idP'";
            $result3 = $con->query($sql4);
            $i++;
        }
	}
    if(!$result3){ 
        echo "error";
    }else{
        echo "Compra registrada correctamente!";
    }

	$con->close();

?>