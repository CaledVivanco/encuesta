<?php
session_start();
if (!isset($_SESSION['admin'])) {
    header("Location: login.html");
    exit();
}

// Conexión a la base de datos
$conexion = new mysqli("localhost", "root", "", "encuesta");
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

// Configurar encabezados para descargar archivo CSV
header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename=empresas.csv');

// Agregar BOM para que Excel reconozca UTF-8 correctamente
echo "\xEF\xBB\xBF";

// Abrir salida
$output = fopen("php://output", "w");

// Escribir encabezados
fputcsv($output, [
    'Fecha',
    'Localidad',
    'Barrio',
    'Dirección',
    'NIT',
    'Razón Social',
    'N° Trabajadores',
    'Actividad Económica',
    'Categoría de Riesgo',
    'ARL Afiliada',
    'Brinda Asesoría',
    'Nombre de quien atiende',
    'Teléfono',
    'Correo',
    '1.1 Asignación persona SG-SST',
    '1.2 Afiliación SS',
    '1.3 Capacitación SST',
    '1.4 Plan anual trabajo',
    '1.5 Evaluaciones médicas',
    '1.6 Identificación peligros',
    '1.7 Medidas prevención',
    '2.1 Autoevaluación Circular 0082',
    '2.2 Política desconexión laboral',
    '2.3 Política acoso laboral',
    '2.4 Política equidad de género',
    '2.5 Mujeres',
    '2.5 Hombres',
    '2.5 Total personas con discapacidad',
    'Observaciones',
    'Compromisos'
]);

// Consulta a la base de datos
$resultado = $conexion->query("SELECT * FROM empresas");

// Escribir cada fila de resultados
while ($fila = $resultado->fetch_assoc()) {
    fputcsv($output, [
        $fila['fecha'],
        $fila['localidad'],
        $fila['barrio'],
        $fila['direccion'],
        $fila['nit'],
        $fila['razon_social'],
        $fila['num_trabajadores'],
        $fila['actividad'],
        $fila['riesgo'],
        $fila['arl'],
        $fila['asesoria'],
        $fila['nombre_visita'],
        $fila['telefono'],
        $fila['correo'],
        $fila['sg_1_1'],
        $fila['sg_1_2'],
        $fila['sg_1_3'],
        $fila['sg_1_4'],
        $fila['sg_1_5'],
        $fila['sg_1_6'],
        $fila['sg_1_7'],
        $fila['n_2_1'],
        $fila['n_2_2'],
        $fila['n_2_3'],
        $fila['n_2_4'],
        $fila['n_2_5'],
        $fila['total_mujeres'],
        $fila['total_hombres'],
        $fila['cuantos_discapacidad'],
        $fila['observaciones'],
        $fila['compromisos']
    ]);
}

fclose($output);
$conexion->close();
exit;
