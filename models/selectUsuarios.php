<?php
	
	include("../conect.php");

	$sql = "select usuarios.idUser, usuarios.nombre, usuarios.apellido, usuarios.User, usuarios.Pass, roles.Nombre as Rol, roles.idRoles as rolId, sucursal.Nombre as Sucursal, sucursal.idSucursal as idSucursal from usuarios inner join roles on usuarios.Roles_idRoles=roles.idRoles inner join sucursal on usuarios.Sucursal_idSucursal=sucursal.idSucursal where usuarios.active='0'";


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