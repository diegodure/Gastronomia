<?php

    $data = json_decode(file_get_contents("php://input"));
    $idVenta = $data->{"idVenta"};
    $fecha = $data->{"fecha"};
    include("../conect.php");

    $sql ="select det_ventas.Ventas_idVentas, productos.Nombre, det_ventas.Precio, det_ventas.Cantidad from det_ventas inner join productos on det_ventas.Productos_idProductos=productos.idProductos where ventas_idVentas = '$idVenta'";

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