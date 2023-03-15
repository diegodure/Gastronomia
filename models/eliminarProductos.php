<?php
	$data = json_decode(file_get_contents("php://input"));
	$id = $data->{"id"};
	
	include("../conect.php");

	$sql = "update productos set Active='1' where idProductos='$id'";
	$results = $con->query($sql);

	if(!$results){ 
    	echo "error";
    }
    else{
    	echo "Producto eliminado correctamente!";
    }

	$con->close();
?>