<?php
    // Recibir datos enviados desde el frontend
    $data = json_decode(file_get_contents("php://input"));

    $tipoPedido = $data->{"tipoPedido"};  // 'delivery' o 'pickup'

    include("../conect.php");

    // Consulta para obtener ventas según el tipo de pedido
    if ($tipoPedido == "delivery") {
        $sql = "SELECT ventas.idVentas, ventas.Total, ventas.Fecha, ventas.Estado, clientes.Nombre, clientes.Apellido, clientes.Info 
                FROM ventas 
                INNER JOIN clientes ON ventas.Clientes_idClientes = clientes.idClientes 
                WHERE ventas.TipoPedido = 'delivery' AND ventas.Estado = 0";  // Solo ventas abiertas
    } elseif ($tipoPedido == "pickup") {
        $sql = "SELECT ventas.idVentas, ventas.Total, ventas.Fecha, ventas.Estado, clientes.Nombre, clientes.Apellido, clientes.Info 
                FROM ventas 
                INNER JOIN clientes ON ventas.Clientes_idClientes = clientes.idClientes 
                WHERE ventas.TipoPedido = 'pickup' AND ventas.Estado = 0";  // Solo ventas abiertas
    }

    $results = $con->query($sql);

    $rawdata = array();

    if ($results) {
        while($row = mysqli_fetch_array($results)) {
            $rawdata[] = $row;
        }

        // Enviar los resultados en formato JSON
        echo json_encode($rawdata, JSON_UNESCAPED_UNICODE);
    } else {
        // Si no se encuentran resultados o hay un error en la consulta
        echo json_encode(array());
    }

    $con->close();
?>
