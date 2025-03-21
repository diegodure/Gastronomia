<?php
// Mostrar errores en PHP (para depuración, quitar en producción)
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Content-Type: application/json; charset=UTF-8");

include("../conect.php");

// Leer JSON recibido
$data = json_decode(file_get_contents("php://input"));

if (!$data || !isset($data->fecha1) || !isset($data->fecha2)) {
    echo json_encode(["error" => "Datos inválidos o incompletos"]);
    exit;
}

// Escapar valores para evitar inyección SQL
$fecha1 = mysqli_real_escape_string($con, $data->fecha1);
$fecha2 = mysqli_real_escape_string($con, $data->fecha2);

// Consulta de ventas
$sqlVentas = "SELECT 
                ventas.idVentas, 
                SUM(ventas.Total) as totalVentas, 
                ventas.Fecha 
              FROM ventas 
              WHERE ventas.Fecha BETWEEN '$fecha1' AND '$fecha2' 
              GROUP BY ventas.Fecha 
              ORDER BY ventas.idVentas DESC";

$resultVentas = $con->query($sqlVentas);

if (!$resultVentas) {
    echo json_encode(["error" => "Error en la consulta de ventas: " . $con->error]);
    exit;
}

$ventas = [];
while ($row = mysqli_fetch_assoc($resultVentas)) {
    $ventas[] = $row;
}

// Consulta de compras
$sqlCompras = "SELECT 
                compras.idCompra, 
                SUM(compras.Total) as totalCompras, 
                compras.Fecha 
              FROM compras 
              WHERE compras.Fecha BETWEEN '$fecha1' AND '$fecha2' 
              GROUP BY compras.Fecha 
              ORDER BY compras.idCompra DESC";

$resultCompras = $con->query($sqlCompras);

if (!$resultCompras) {
    echo json_encode(["error" => "Error en la consulta de compras: " . $con->error]);
    exit;
}

$compras = [];
while ($row = mysqli_fetch_assoc($resultCompras)) {
    $compras[] = $row;
}

// Cerrar conexión
$con->close();

// Devolver los datos como un objeto JSON con claves
echo json_encode(["ventas" => $ventas, "compras" => $compras], JSON_UNESCAPED_UNICODE);
?>
