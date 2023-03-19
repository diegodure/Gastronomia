<?php

    $data = json_decode(file_get_contents("php://input"));
    $idTable = $data->{"idTable"};
    $active = $data->{"active"};

    include("../conect.php");

    $sql ="select ventas.idVentas, ventas.Total, ventas.Fecha, ventas.Estado, clientes.idClientes, clientes.Nombre, clientes.Apellido, clientes.Info from ventas inner join clientes on ventas.Clientes_idClientes=clientes.idClientes where Mesas_idMesas='$idTable' and Estado='$active'";

    $results = $con->query($sql);

    $rawdata = array();

    $i = 0;
    while($row1 = mysqli_fetch_array($results)){
        $rawdata[$i] = $row1;
        $i++;
    }

    $idV = $rawdata[0]["idVentas"];
    $sql2 = "select det_ventas.Ventas_idVentas, det_ventas.Precio as PrecioUnitario, det_ventas.Cantidad, det_ventas.Condicion_Venta, det_ventas.subTotal, productos.idProductos, productos.Nombre, productos.Descripcion from det_ventas inner join productos on det_ventas.Productos_idProductos=productos.idProductos where Ventas_idVentas='$idV'";

    $results2 = $con->query($sql2);

    $rawdata2 = array();
    $i2 = 0;

    while($row2 = mysqli_fetch_array($results2)){
        $rawdata2[$i2] = $row2;
        $i2++;
    }

    

    $con->close();

    array_push($rawdata, $rawdata2);
    $myArray = $rawdata;

    echo json_encode($myArray, JSON_UNESCAPED_UNICODE);
?>