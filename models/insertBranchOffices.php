<?php

	$data = json_decode(file_get_contents("php://input"));
	$idEmpresas = $data->{"idEmpresas"};
	$name = $data->{"name"};
	$description = $data->{"description"};
	$city = $data->{"city"};
	$neighborhood = $data->{"neighborhood"};
	$address = $data->{"address"};
	$phone = $data->{"phone"};
	$country = $data->{"country"};
	if($description == undefined){
		$description = null;
	}
	if($phone == undefined){
		$phone = null;
	}
	include("../conect.php");

	$sql = "insert into sucursal (idSucursal, Empresas_idEmpresas, Nombre, Descripcion, Ciudad, Barrio, Direccion, Telefono, Paises_IdPais) values (null, '$idEmpresas', '$name', '$description', '$city', '$neighborhood', '$address', '$phone', '$country')";
	$con->query($sql);

	if($con -> connect_errno){
    	    die("Error de conexión: " . $con->mysqli_connect_errno() . ", " . $con->mysqli_connect_error());
    	    echo "1";
        }
        else{
        	if(($con->query($sql)!==False)){
	        	echo "0";
        	}else{
        		echo "1";
        	}
        }

	$con->close();
?>