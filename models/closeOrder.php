<?php
	$data = json_decode(file_get_contents("php://input"));

    $estado = $data->{"estado"};
    $idVenta = $data->{"idVenta"};
    $idTable = $data->{"idTable"};

    include("../conect.php");

    $sql = "update ventas set Estado='$estado' where idVentas='$idVenta'";
    $result = $con->query($sql);

    if(!$result){
        echo "error";
    }else{
        $sql2 = "update mesas set Active=0 where idMesas='$idTable'";
        $result2 = $con->query($sql2);
        if(!$result2){
            echo "error";
        }else{
            echo "Orden cerrada correctamente!";
        }
    }

    $con->close();
    
?>