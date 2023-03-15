<?php
	$data = json_decode(file_get_contents("php://input"));
	$id = $data->{"idCliente"};
	
	include("../conect.php");

	$sql = "update clientes set Active='1' where idClientes='$id'";
	$results = $con->query($sql);

	if(!$results){ 
    	echo "error";
    }else{
    	echo "Cliente eliminado correctamente!";
    }

	$con->close();
?>