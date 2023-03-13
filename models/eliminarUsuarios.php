<?php
	$data = json_decode(file_get_contents("php://input"));
	$id = $data->{"idUsuario"};
	
	include("../conect.php");

	$sql = "update usuarios set active='1' where idUser='$id'";
	$results = $con->query($sql);

	if(!$results){ 
    	echo "error";
    }else{
    	echo "Usuario eliminado correctamente!";
    }

	$con->close();
?>