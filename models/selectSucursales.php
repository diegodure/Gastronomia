<?php

	include("../conect.php");

	$sql = "select sucursal.idSucursal, sucursal.Nombre from sucursal inner join empresas on sucursal.Empresas_idEmpresas=empresas.idEmpresas where sucursal.active='0'";


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