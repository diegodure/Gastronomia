<?php

    $data = json_decode(file_get_contents("php://input"));
    $idCompra = $data->{"idCompra"};
    $fecha = $data->{"fecha"};
    include("../conect.php");

    $sql ="select det_compra.Compras_idCompra, productos.Nombre, det_compra.Precio, det_compra.Cantidad from det_compra inner join productos on det_compra.Productos_idProductos=productos.idProductos where Compras_idCompra = '$idCompra'";

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