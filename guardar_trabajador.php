<?php
$conexion = new mysqli("localhost", "root", "", "encuestas");

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

$nombre = $_POST['nombre'];
$edad = $_POST['edad'];
$ocupacion = $_POST['ocupacion'];
$ingresos = $_POST['ingresos'];

$sql = "INSERT INTO trabajadores (nombre, edad, ocupacion, ingresos)
        VALUES ('$nombre', '$edad', '$ocupacion', '$ingresos')";

if ($conexion->query($sql) === TRUE) {
    echo "¡Encuesta enviada correctamente!";
} else {
    echo "Error: " . $conexion->error;
}

$conexion->close();
?>
