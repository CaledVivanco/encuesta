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
// === Captura del formulario ===
const form = document.getElementById("formTrabajador");
const tabla = document.querySelector("#tablaTrabajadores tbody");
const lista = document.getElementById("listaTrabajadores");
const encabezados = document.getElementById("encabezadosTabla");

// === Guardar registro ===
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const datos = {};
  new FormData(form).forEach((valor, clave) => {
    datos[clave] = valor;
  });

  // Convertir "riesgosIdentificados" (select multiple) a texto
  const riesgosSelect = document.getElementById("riesgosIdentificados");
  datos["riesgosIdentificados"] = Array.from(riesgosSelect.selectedOptions).map(
    (opt) => opt.value
  ).join(", ");

  const trabajadores = JSON.parse(localStorage.getItem("trabajadores")) || [];
  trabajadores.push(datos);
  localStorage.setItem("trabajadores", JSON.stringify(trabajadores));

  alert("✅ Registro guardado correctamente");
  form.reset();
});

// === Mostrar lista de trabajadores ===
document.getElementById("verTrabajadores").addEventListener("click", () => {
  const trabajadores = JSON.parse(localStorage.getItem("trabajadores")) || [];
  lista.style.display = "block";
  tabla.innerHTML = "";

  if (trabajadores.length === 0) {
    tabla.innerHTML = "<tr><td colspan='5'>No hay trabajadores registrados</td></tr>";
    return;
  }

  // Crear encabezados automáticamente
  const claves = Object.keys(trabajadores[0]);
  encabezados.innerHTML = claves.map((c) => `<th>${c}</th>`).join("");

  // Llenar tabla
  trabajadores.forEach((t) => {
    const fila = document.createElement("tr");
    fila.innerHTML = claves.map((c) => `<td>${t[c]}</td>`).join("");
    tabla.appendChild(fila);
  });
});

// === Descargar Excel ===
document.getElementById("descargarExcel").addEventListener("click", () => {
  const trabajadores = JSON.parse(localStorage.getItem("trabajadores")) || [];
  if (trabajadores.length === 0) return alert("No hay datos para exportar");

  // Convertir a CSV
  const encabezados = Object.keys(trabajadores[0]);
  const filas = trabajadores.map((t) =>
    encabezados.map((c) => `"${t[c] || ""}"`).join(",")
  );
  const csv = [encabezados.join(","), ...filas].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "trabajadores.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});

// === Eliminar todos los trabajadores ===
document.getElementById("eliminarTodo").addEventListener("click", () => {
  if (confirm("¿Seguro que desea eliminar todos los registros?")) {
    localStorage.removeItem("trabajadores");
    tabla.innerHTML = "";
    alert("🗑️ Todos los registros fueron eliminados");
  }
});
