<?php

    $data = json_decode(file_get_contents("php://input"));
    $idVenta = $data->{"idVenta"};
    $fecha = $data->{"fecha"};
    include("../conect.php");

    $sql ="select det_compras.Compras_idCompras, productos.Nombre, det_compras.Precio, det_compras.Cantidad from det_compras inner join productos on det_compras.Productos_idProductos=productos.idProductos where Compras_idCompras = '$idVenta'";

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