<?php
	include("../conect.php");
	$data = json_decode($_POST['id']);
	$id = $data->{"id"};
	
	foreach ($_FILES as $archivo) {
	 	$nombre = $_FILES['file']["name"];
	    $datos = base64_encode(file_get_contents($_FILES['file']['tmp_name']));
	    $sql = "update productos set Imagen='$datos' where idProductos='$data'";
	    $results = $con->query($sql);
	}
 	if(!$results){ 
		echo "error";
	}
	else{
		echo "Producto modificado correctamente!";
	}
	$con->close();
?>