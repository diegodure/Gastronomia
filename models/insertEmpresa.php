<?php
	$data = json_decode(file_get_contents("php://input"));
	$name = $data->{"name"};
	$description = $data->{"description"};
	$city = $data->{"city"};
	$neighborhood = $data->{"neighborhood"};
	$address = $data->{"address"};
	if(empty($data->{"phone"})){
		$phone = 0;
	}else{
		$phone = $data->{"phone"};
	}
	
	$country = $data->{"country"};
	if(empty($data->{"description"})){
		$description = 0;
	}
	
	include("../conect.php");

	$sql = "insert into empresas (idEmpresas, Nombre, Descripcion, Ciudad, Barrio, Dirreccion, Telefono, Paises_IdPais, active) values (null, '$name', '$description', '$city', '$neighborhood', '$address', '$phone', '$country', 0)";
	$results = $con->query($sql);

	if(!$results){ 
    	echo "error";
    }else{
    	echo "Empresa creada correctamente!";
    }

	$con->close();
?>