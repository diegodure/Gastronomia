<?php
	$data = json_decode(file_get_contents("php://input"));
	$nombre = $data->{"nombre"};
	$apellido = $data->{"apellido"};
	$info = $data->{"info"};
	if(!empty($data->{"empresa"})){
		$empresa = $data->{"empresa"};
	}else{
		$empresa = "";
	}
	$id = $data->{"id"};
	
	include("../conect.php");

	$sql = "update proveedores set Nombre='$nombre', Apellido='$apellido',Informacion='$info',Empresa='$empresa' where idProveedores='$id'";
	$results = $con->query($sql);

	if(!$results){ 
    	echo "error";
    }
    else{
    	echo "Proveedor modificado correctamente!";
    }

	$con->close();
?>