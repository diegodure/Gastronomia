<?php

	include("../conect.php");

	$sql = "select productos.idProductos, productos.Nombre, productos.Descripcion, productos.Costo, productos.PrecioUnitario, productos.PrecioPromocional, productos.Imagen, product_type.idProduct_Type, product_type.Nombre as productType from productos inner join product_type on productos.Product_Type_idProduct_Type=product_type.idProduct_Type where productos.Active='0' && product_type.idProduct_Type='2'";


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