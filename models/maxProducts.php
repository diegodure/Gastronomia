<?php

    $data = json_decode(file_get_contents("php://input"));
    $fecha1 = $data->{"fecha1"};
    $fecha2 = $data->{"fecha2"};

    include("../conect.php");

    $sql ="select det_ventas.Ventas_idVentas, det_ventas.Condicion_Venta, det_ventas.Precio, ventas.Fecha, productos.Nombre, productos.Costo, productos.PrecioUnitario, productos.PrecioPromocional, SUM(det_ventas.Cantidad) as CantidadVentas, SUM(det_ventas.subTotal) as TotalVentas from det_ventas inner join productos on det_ventas.Productos_idProductos=productos.idProductos inner join ventas on det_ventas.Ventas_idVentas=ventas.idVentas where Ventas.Fecha >= '$fecha1' and Ventas.Fecha <= '$fecha2' group by Productos.idProductos, det_ventas.Condicion_Venta order by SUM(det_ventas.Cantidad) DESC";

    $results = $con->query($sql);

    $rawdata = array();

    $i = 0;

    while($row = mysqli_fetch_array($results)){
        $rawdata[$i] = $row;
        $i++;

    }

    $con->close();

    $myArray = $rawdata;
    echo json_encode($myArray, JSON_UNESCAPED_UNICODE);
?>