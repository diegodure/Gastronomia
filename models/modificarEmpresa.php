<?php
	$data = json_decode(file_get_contents("php://input"));
	$idE = $data->{"id"};
	$nombre = $data->{"nombre"};
	if(empty($data->{"descripcion"})){
		$descripcion = "";
	}else{
		$descripcion = $data->{"descripcion"};
	}
	$ciudad = $data->{"ciudad"};
	$barrio = $data->{"barrio"};
	$direccion = $data->{"direccion"};
	if(!empty($data->{"telefono"})){
		$telefono = $data->{"telefono"};
	}else{
		$telefono = 0;
	}
	$idPais = $data->{"idPais"};
	
	include("../conect.php");

	$sql = "update empresas set Nombre='$nombre', Descripcion='$descripcion', Ciudad='$ciudad', 
	Barrio='$barrio',Dirreccion='$direccion',Telefono='$telefono', Paises_idPais='$idPais' where idEmpresas='$idE'";
	$results = $con->query($sql);

	if(!$results){ 
    	echo "error";
    }
    else{
    	echo "Empresa modificada correctamente!";
    }

	$con->close();
?>