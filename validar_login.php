<?php
session_start();

// Usuario y clave temporales
$usuario_valido = "admin";
$clave_valida = "12345";

if ($_POST['usuario'] === $usuario_valido && $_POST['clave'] === $clave_valida) {
    $_SESSION['admin'] = true;
    header("Location: admin.php");
    exit();
} else {
    echo "<script>alert('Credenciales incorrectas');window.location='login.html';</script>";
}
