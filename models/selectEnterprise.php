<?php

	include("../conect.php");

	$sql = "select empresas.idEmpresas, empresas.Nombre, empresas.Descripcion, empresas.Ciudad, empresas.Barrio, empresas.Dirreccion, empresas.Telefono, paises.Nombre as Pais, paises.idPais as idPais from empresas inner join paises on empresas.Paises_idPais = paises.idPais where empresas.active = '0'";


	$results = $con->query($sql);


	$rawdata = array();

	$i = 0;

	if (!$results) {
   		echo "error";
	}else{
		while ($row = mysqli_fetch_array($results)) {
			$rawdata[$i] = $row;
			$i++;

		}
		$myArray = $rawdata;
		echo json_encode($myArray, JSON_UNESCAPED_UNICODE);
	}
	$con->close();

?>