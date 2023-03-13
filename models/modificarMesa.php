<?php
	$data = json_decode(file_get_contents("php://input"));
	$nombre = $data->{"nombre"};
	if(!empty($data->{"descripcion"})){
		$descripcion = $data->{"descripcion"};
	}else{
		$descripcion = "";
	}
	$id = $data->{"id"};
	
	include("../conect.php");

	$sql = "update mesas set Nombre='$nombre', Descripcion='$descripcion' where idMesas='$id'";
	$results = $con->query($sql);

	if(!$results){ 
    	echo "error";
    }
    else{
    	echo "Mesa modificada correctamente!";
    }

	$con->close();
?>