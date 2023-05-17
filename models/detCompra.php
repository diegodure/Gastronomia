<?php
	$data = json_decode(file_get_contents("php://input"), true);

	//print_r($data);

	include("../conect.php");

    //Realizamos una consulta para saber el ultimo id de la venta

	$sql = "select max(idCompra) as idC from compras";
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
        $sql2 = "insert into det_compra (Cantidad, Precio, SubTotal, Productos_idProductos, Compras_idCompra)
        values ('$cantidad', '$precio', '$subT', '$idP', '$idC')";
	    //print ($iva);
	    $result2 = $con->query($sql2);

	}
    if(!$result2){ 
        echo "error";
    }else{
        echo "Compra registrada correctamente!";
    }

	$con->close();

?>