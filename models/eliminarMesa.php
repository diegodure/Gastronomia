<?php
	$data = json_decode(file_get_contents("php://input"));
	$id = $data->{"id"};
	
	include("../conect.php");

	$sql = "update mesas set Active='1' where idMesas='$id'";
	$results =$con->query($sql);

	if(!$results){ 
    	echo "error";
    }
    else{
    	echo "Mesa eliminada correctamente!";
    }

	$con->close();
?>