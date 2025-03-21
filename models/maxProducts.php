<?php
// Mostrar errores en PHP (para depuración, quitar en producción)
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Content-Type: application/json; charset=UTF-8");

// Conectar a la base de datos
include("../conect.php");

// Leer el JSON recibido
$data = json_decode(file_get_contents("php://input"));

if (!$data || !isset($data->fecha1) || !isset($data->fecha2)) {
    echo json_encode(["error" => "Datos inválidos o incompletos"]);
    exit;
}

$fecha1 = $data->fecha1;
$fecha2 = $data->fecha2;

// Escapar las variables para evitar inyección SQL
$fecha1 = mysqli_real_escape_string($con, $fecha1);
$fecha2 = mysqli_real_escape_string($con, $fecha2);

// Consulta SQL
$sql = "SELECT 
            det_ventas.Ventas_idVentas, 
            det_ventas.Condicion_Venta, 
            det_ventas.Precio, 
            ventas.Fecha, 
            productos.Nombre, 
            productos.Costo, 
            productos.PrecioUnitario, 
            productos.PrecioPromocional, 
            SUM(det_ventas.Cantidad) as CantidadVentas, 
            SUM(det_ventas.subTotal) as TotalVentas 
        FROM det_ventas 
        INNER JOIN productos ON det_ventas.Productos_idProductos = productos.idProductos 
        INNER JOIN ventas ON det_ventas.Ventas_idVentas = ventas.idVentas 
        WHERE ventas.Fecha BETWEEN '$fecha1' AND '$fecha2' 
        GROUP BY productos.idProductos, det_ventas.Condicion_Venta 
        ORDER BY SUM(det_ventas.Cantidad) DESC";

// Ejecutar la consulta y manejar errores
$results = $con->query($sql);

if (!$results) {
    echo json_encode(["error" => "Error en la consulta SQL: " . $con->error]);
    exit;
}

// Obtener los resultados en un array
$rawdata = [];
while ($row = mysqli_fetch_assoc($results)) {
    $rawdata[] = $row;
}

// Cerrar conexión
$con->close();

// Devolver los datos en formato JSON
echo json_encode($rawdata, JSON_UNESCAPED_UNICODE);
?>
