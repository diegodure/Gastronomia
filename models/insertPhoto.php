<?php
	include("../conect.php");
	$sql = "select max(idProductos) as idP from productos";
	$result = $con->query($sql);

  	if($row = mysqli_fetch_row($result)){
  		$idP = trim($row[0]);
	}

	foreach ($_FILES as $archivo) {
	 	$nombre = $_FILES['file']["name"];
	    $datos = base64_encode(file_get_contents($_FILES['file']['tmp_name']));
	    $sql = "update productos set Imagen='$datos' where idProductos='$idP'";
	    $results = $con->query($sql);
	}
 	if(!$results){ 
		echo "error";
	}
	else{
		echo "Producto creado correctamente!";
	}
	$con->close();
?>