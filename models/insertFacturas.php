<?php
	$data = json_decode(file_get_contents("php://input"));
	$idCliente = $data->{"idCliente"};
	$idTable = $data->{"idTable"};
	$total = $data->{"total"};
	$estado = $data->{"estado"};
	$tableState = $data->{"tableState"};
	//echo($id);

	include("../conect.php");

    $sql = "insert into ventas (idVentas, Fecha, Total, Clientes_idClientes, Mesas_idMesas, Estado) values (null, CURDATE(), '$total', '$idCliente', '$idTable', '$estado')";

    $results = $con->query($sql);

    $sql2 = "update mesas set Active='$tableState' where idMesas='$idTable'";
    $result2 = $con->query($sql2);

	if(!$results && !$result2){ 
    	echo "error";
    }else{
    	echo "Orden creada!";
    }

    $con->close();

?>