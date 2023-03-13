<?php
	$data = json_decode(file_get_contents("php://input"));
	$id = $data->{"id"};
	$nombre = $data->{"nombre"};
	$descripcion = $data->{"descripcion"};
	$estado = $data->{"estado"};
	
	include("../conect.php");

	$sql = "update configuracion set Estado='$estado' where idConfiguracion='$id'";
	$results = $con->query($sql);

	if(!$results){ 
    	echo "error";
    }
    else{
    	echo "Configuración modificada correctamente!";
    }

	$con->close();
?>