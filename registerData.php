<?php
// Incluye el archivo de conexión a la base de datos
include("conect.php");

// Verifica si el formulario ha sido enviado
if (isset($_POST['login'])) {
    // Captura los datos del formulario
    $nombreEmpresa = $_POST['nombreEmpresa'];
    $nombreFantasia = $_POST['nombreFantasia'];
    $ruc = $_POST['ruc'];
    $user = $_POST['user'];
    $pass = $_POST['pass'];
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $ci = $_POST['ci'];
    $telefono = $_POST['telefono'];
    $estado = 0; 
    $register_date = date('Y-m-d');
    
    // Verifica la conexión
    if ($con->connect_error) {
        die("Conexión fallida: " . $con->connect_error);
    }
    
    // Inserta la empresa en la tabla EmpresaServicio
    $stmt = $con->prepare("INSERT INTO EmpresaServicio (ruc, razon_social, nombre_fantasia, estado, register_date) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("ssiss", $ruc, $nombreEmpresa, $nombreFantasia, $estado, $register_date);
    
    if ($stmt->execute()) {
        // Obtén el ID de la empresa recién insertada
        $empresa_id = $stmt->insert_id;

        // Asume que '1' es el ID de rol predeterminado. Ajusta según sea necesario.
        $roles_idRol = 1;
        
        // Cierra la consulta anterior
        $stmt->close();
        
        // Inserta el usuario en la tabla Usuarios
        $stmt = $con->prepare("INSERT INTO Usuarios (Nombres, Apellidos, User, Pass, Roles_idRol, Ci, Telefono, empresa_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssiisi", $nombre, $apellido, $user, $pass, $roles_idRol, $ci, $telefono, $empresa_id);
        
        if ($stmt->execute()) {
            session_start();
            
            // Éxito al insertar el usuario
            $sql = "SELECT Usuarios.User, Usuarios.Pass, Usuarios.Nombres, Usuarios.Apellidos, 
            Usuarios.idUsuario, Usuarios.empresa_id, Roles.Nombre AS rol 
            FROM Usuarios 
            INNER JOIN Roles ON Usuarios.Roles_idRol = Roles.idRol 
            WHERE User = ? AND Pass = ?";
            
            $stmt = $con->prepare($sql);
            $stmt->bind_param("ss", $user, $pass);
            $stmt->execute();
            $result = $stmt->get_result();
            
            if ($row = $result->fetch_assoc()) {
                $_SESSION["user"] = $row['rol'];
				$_SESSION["idUser"] = $row['idUsuario'];
				$_SESSION["idService"] = $row['empresa_id'];
                echo '<div class="logoLogin"><i class="fas fa-spinner"></i></div>';
                echo '<script> window.location="views/agenda.php"; </script>';
            } else {
                echo "<script>alert('Error al obtener los detalles del usuario.');</script>";
            }
            
            $stmt->close();
        } else {
            // Error al insertar el usuario
            echo "<script>alert('Error al registrar el usuario: " . $stmt->error . "');</script>";
        }
    } else {
        // Error al insertar la empresa
        echo "<script>alert('Error al registrar la empresa: " . $stmt->error . "');</script>";
    }
    
    // Cierra la conexión
    $con->close();
} else {
    // Si el formulario no fue enviado, redirige a la página principal
    header("Location: login.php");
}
?>
