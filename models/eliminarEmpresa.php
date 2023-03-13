<?php
	$data = json_decode(file_get_contents("php://input"));
	$idE = $data->{"idEmpresa"};
	
	include("../conect.php");

	$sql = "update empresas set active='1' where idEmpresas='$idE'";
	$results = $con->query($sql);

	if(!$results){ 
    	echo "error";
    }else{
    	echo "empresa eliminada correctamente!";
    }

	$con->close();
?>