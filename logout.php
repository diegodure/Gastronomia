<?php
    session_start();
    session_destroy();
    echo 'Cerraste sesion';
    echo '<script> window.location= "views/login.php";</script>';
?>