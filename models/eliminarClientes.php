<?php
	$data = json_decode(file_get_contents("php://input"));
	$id = $data->{"idCliente"};
	
	include("../conect.php");

	$sql = "update clientes set active='1' where idCliente='$id'";
	$results = $con->query($sql);

	if(!$results){ 
    	echo "error";
    }else{
    	echo "Cliente eliminado correctamente!";
    }

	$con->close();
?>