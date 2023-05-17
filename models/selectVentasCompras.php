<?php

    $data = json_decode(file_get_contents("php://input"));
    $fecha1 = $data->{"fecha1"};
    $fecha2 = $data->{"fecha2"};

    include("../conect.php");

    $sql ="select ventas.idVentas, SUM(ventas.Total) as totalVentas, ventas.Fecha from ventas where Ventas.Fecha >= '$fecha1' and Ventas.Fecha <= '$fecha2' group by ventas.Fecha order by ventas.idVentas DESC";

    $results = $con->query($sql);

    $rawdata = array();

    $i = 0;

    while($row = mysqli_fetch_array($results)){
        $rawdata[$i] = $row;
        $i++;

    }

    $sql2 = "select compras.idCompra, SUM(compras.Total) as totalCompras, compras.Fecha from compras where compras.Fecha >= '$fecha1' and compras.Fecha <= '$fecha2' group by compras.Fecha order by compras.idCompra DESC";

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