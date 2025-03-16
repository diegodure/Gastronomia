<?php
	$data = json_decode(file_get_contents("php://input"));

    $estado = $data->{"estado"};
    $idVenta = $data->{"idVenta"};
    $idTable = $data->{"idTable"};
    $tipoPedido = $data->{"tipoPedido"};

    include("../conect.php");

    $sql = "update ventas set Estado='$estado' where idVentas='$idVenta'";
    $result = $con->query($sql);

    if(!$result){
        echo "error";
        $con->close();
        exit();
    }else if($tipoPedido == "mesa"){
        $sql2 = "update mesas set Active=0 where idMesas='$idTable'";
        $result2 = $con->query($sql2);
        if(!$result2){
            echo "error";
            $con->close();
            exit();
        }else{
            echo "Orden cerrada correctamente!";
        }
    }else{
        echo "Orden cerrada correctamente!";
    }

    $con->close();
    
?>