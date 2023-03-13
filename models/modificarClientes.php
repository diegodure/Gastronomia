<?php
	$data = json_decode(file_get_contents("php://input"));
	$id = $data->{"id"};
	$nombre = $data->{"nombre"};
	$apellido = $data->{"apellido"};
	$info = $data->{"info"};
	
	include("../conect.php");

	$sql = "update clientes set Nombre='$nombre', Apellido='$apellido', Info='$info' where idCliente='$id'";
	$results = $con->query($sql);

	if(!$results){ 
    	echo "error";
    }
    else{
    	echo "Cliente modificado correctamente!";
    }

	$con->close();
?>