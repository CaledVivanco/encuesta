<?php
session_start();
if (!isset($_SESSION['admin'])) {
    header("Location: login.html");
    exit();
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Panel de Administración</title>
</head>
<body>
  <h2>Zona de administrador</h2>

  <a href="exportar_empresas.php" class="btn btn-success">Exportar empresas</a>

  <button type="submit">📤 Descargar Empresas en CSV</button>
</form>


  <br><br>
  <a href="logout.php">Cerrar sesión</a>
</body>
</html>
