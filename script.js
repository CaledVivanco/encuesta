function exportarAExcel() {
  const empresas = JSON.parse(localStorage.getItem("empresas")) || [];

  if (empresas.length === 0) {
    alert("No hay datos para exportar.");
    return;
  }


  const preguntasMap = {
    "1_1": "¿La empresa cuenta con política de seguridad y salud en el trabajo?",
    "1_2": "¿Tiene evidencia de capacitación?",
    "1_3": "¿Se realiza evaluación de riesgos?",
    "1_4": "¿Cuenta con plan de emergencias?",
    "1_5": "¿Realiza actividades de promoción y prevención?",
    "2_1": "¿Cumple normatividad laboral?",
    "2_2": "¿Cuenta con afiliación a seguridad social?",
    "2_3": "Total mujeres",
    "2_4": "Total hombres",
    "2_5": "¿Cuántos trabajadores cumplen condiciones?",
    "observaciones": "Observaciones",
    "compromisos": "Compromisos",
    // Agrega también los campos generales
    "fecha": "Fecha",
    "localidad": "Localidad",
    "barrio": "Barrio",
    "direccion": "Dirección",
    "nit": "NIT",
    "nombreEmpresa": "Nombre o razón social",
    "trabajadores": "Número de trabajadores",
    "actividad": "Actividad económica",
    "riesgo": "Categoría de riesgo",
    "arl": "ARL afiliada",
    "asesoria": "¿Brinda asesoría?",
    "nombreVisita": "Nombre de quien atiende",
    "telefono": "Teléfono de contacto",
    "correo": "Correo electrónico"
  };

  const datosExportar = empresas.map((empresa) => {
    const nuevaEmpresa = {};
    for (const clave in empresa) {
      const nuevaClave = preguntasMap[clave] || clave;
      nuevaEmpresa[nuevaClave] = empresa[clave];
    }
    return nuevaEmpresa;
  });

  const ws = XLSX.utils.json_to_sheet(datosExportar);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Empresas");

  const fecha = new Date().toISOString().split("T")[0]; 
  const nombreArchivo = `Empresas_${fecha}.xlsx`;

  XLSX.writeFile(wb, nombreArchivo);
}
