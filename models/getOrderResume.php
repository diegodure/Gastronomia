<?php

    $data = json_decode(file_get_contents("php://input"));
    include("../conect.php");

    if (isset($data->idTable)) {
        // Pedido en mesa
        $idTable = $data->{"idTable"};
        $active = $data->{"active"};

        $sql = "SELECT ventas.idVentas, ventas.Total, ventas.Fecha, ventas.Estado, clientes.idClientes, clientes.Nombre, clientes.Apellido, clientes.Info 
                FROM ventas 
                INNER JOIN clientes ON ventas.Clientes_idClientes = clientes.idClientes 
                WHERE Mesas_idMesas = '$idTable' AND Estado = '$active'";

    } else if (isset($data->idVentas) && isset($data->tipoPedido)) {
        // Pedido para delivery o pickup
        $idVentas = $data->{"idVentas"};
        
        $sql = "SELECT ventas.idVentas, ventas.Total, ventas.Fecha, ventas.Estado, clientes.idClientes, clientes.Nombre, clientes.Apellido, clientes.Info 
                FROM ventas 
                INNER JOIN clientes ON ventas.Clientes_idClientes = clientes.idClientes 
                WHERE ventas.idVentas = '$idVentas'";
    }

    $results = $con->query($sql);

    $rawdata = array();
    $i = 0;
    while ($row1 = mysqli_fetch_array($results)) {
        $rawdata[$i] = $row1;
        $i++;
    }

    // Obtener detalles del pedido (productos)
    if (isset($rawdata[0]["idVentas"])) {
        $idV = $rawdata[0]["idVentas"];
        $sql2 = "SELECT det_ventas.Ventas_idVentas, det_ventas.Precio as PrecioUnitario, det_ventas.Cantidad, det_ventas.Condicion_Venta, det_ventas.subTotal, productos.idProductos, productos.Nombre, productos.Descripcion 
                FROM det_ventas 
                INNER JOIN productos ON det_ventas.Productos_idProductos = productos.idProductos 
                WHERE Ventas_idVentas = '$idV'";

        $results2 = $con->query($sql2);

        $rawdata2 = array();
        $i2 = 0;
        while ($row2 = mysqli_fetch_array($results2)) {
            $rawdata2[$i2] = $row2;
            $i2++;
        }

        array_push($rawdata, $rawdata2);
    }

    $con->close();
    echo json_encode($rawdata, JSON_UNESCAPED_UNICODE);
?>
