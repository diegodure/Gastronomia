<?php
	$data = json_decode(file_get_contents("php://input"));
	$id = $data->{"id"};
	$total = $data->{"total"};
	//echo($id);

	include("../conect.php");

    $sql = "insert into compras (idCompra, Fecha, Total, Usuarios_idUsuarios, Proveedores_idProveedores) values (null, CURDATE(), '$total',1, '$id')";

    $con->query($sql);

    $con->close();

?>