<?php
$conexion = new mysqli("localhost", "root", "", "encuesta");
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

// Recoger datos del formulario
$fecha = $_POST['fecha'];
$localidad = $_POST['localidad'];
$barrio = $_POST['barrio'];
$direccion = $_POST['direccion'];
$nit = $_POST['nit'];
$razon_social = $_POST['razon_social'];
$num_trabajadores = $_POST['num_trabajadores'];
$actividad = $_POST['actividad'];
$riesgo = $_POST['riesgo'];
$arl = $_POST['arl'];
$asesoria = $_POST['asesoria'];
$nombre_visita = $_POST['nombre_visita'];
$telefono = $_POST['telefono'];
$correo = $_POST['correo'];

// Estándares SG-SST
$sg_1_1 = $_POST['sg_1_1'];
$sg_1_2 = $_POST['sg_1_2'];
$sg_1_3 = $_POST['sg_1_3'];
$sg_1_4 = $_POST['sg_1_4'];
$sg_1_5 = $_POST['sg_1_5'];
$sg_1_6 = $_POST['sg_1_6'];
$sg_1_7 = $_POST['sg_1_7'];

// Normatividad laboral
$n_2_1 = $_POST['n_2_1'];
$n_2_2 = $_POST['n_2_2'];
$n_2_3 = $_POST['n_2_3'];
$n_2_4 = $_POST['n_2_4'];
$n_2_5 = $_POST['n_2_5'];
$total_mujeres = $_POST['total_mujeres'];
$total_hombres = $_POST['total_hombres'];
$cuantos_discapacidad = $_POST['cuantos_discapacidad'];

$observaciones = $_POST['observaciones'];
$compromisos = $_POST['compromisos'];

// Insertar en la base de datos
$sql = "INSERT INTO empresas (
    fecha, localidad, barrio, direccion, nit, razon_social, num_trabajadores, actividad,
    riesgo, arl, asesoria, nombre_visita, telefono, correo,
    sg_1_1, sg_1_2, sg_1_3, sg_1_4, sg_1_5, sg_1_6, sg_1_7,
    n_2_1, n_2_2, n_2_3, n_2_4, n_2_5, total_mujeres, total_hombres,
    cuantos_discapacidad, observaciones, compromisos
) VALUES (
    '$fecha', '$localidad', '$barrio', '$direccion', '$nit', '$razon_social', '$num_trabajadores', '$actividad',
    '$riesgo', '$arl', '$asesoria', '$nombre_visita', '$telefono', '$correo',
    '$sg_1_1', '$sg_1_2', '$sg_1_3', '$sg_1_4', '$sg_1_5', '$sg_1_6', '$sg_1_7',
    '$n_2_1', '$n_2_2', '$n_2_3', '$n_2_4', '$n_2_5', '$total_mujeres', '$total_hombres',
    '$cuantos_discapacidad', '$observaciones', '$compromisos'
)";

if ($conexion->query($sql) === TRUE) {
    header("Location: gracias.html");
    exit();
} else {
    echo "Error: " . $conexion->error;
}


$conexion->close();
?>
