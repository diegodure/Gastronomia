<?php
	$data = json_decode(file_get_contents("php://input"));
	$idCliente = $data->{"idCliente"};
	$idTable = $data->{"idTable"}; // Este campo será NULL para delivery y pickup
	$total = $data->{"total"};
	$estado = $data->{"estado"};
	$tableState = $data->{"tableState"}; // Solo usado para mesas
	$tipoPedido = $data->{"tipoPedido"}; // Nuevo campo: 'mesa', 'delivery', 'pickup'

	include("../conect.php");

	// Si es un pedido para delivery o pickup, no se utiliza el id de la mesa
	if ($tipoPedido == "delivery" || $tipoPedido == "pickup") {
		$sql = "insert into ventas (idVentas, Fecha, Total, Clientes_idClientes, Mesas_idMesas, Estado, TipoPedido) 
		        values (null, CURDATE(), '$total', '$idCliente', NULL, '$estado', '$tipoPedido')";
	} else if ($tipoPedido == "mesa") {
		// Pedido para mesa, se incluye idTable
		$sql = "insert into ventas (idVentas, Fecha, Total, Clientes_idClientes, Mesas_idMesas, Estado, TipoPedido) 
		        values (null, CURDATE(), '$total', '$idCliente', '$idTable', '$estado', '$tipoPedido')";
		// Actualizar el estado de la mesa solo si es un pedido para mesa
		$sql2 = "update mesas set Active='$tableState' where idMesas='$idTable'";
		$result2 = $con->query($sql2);
	}

	$results = $con->query($sql);

	if (!$results || ($tipoPedido == "mesa" && !$result2)) { 
    	echo "error";
    } else {
    	echo "Orden creada!";
    }

    $con->close();
?>
