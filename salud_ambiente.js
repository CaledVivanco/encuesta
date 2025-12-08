function guardarAmbiental() {
    const form = document.getElementById('formSaludAmbiente');
    const datos = new FormData(form);

    let riesgosSeleccionados = [];
    document.querySelectorAll("input[name='riesgos']:checked").forEach(chk => {
        riesgosSeleccionados.push(chk.value);
    });

    const registro = {
        fecha: datos.get('fecha'),
        barrio: datos.get('barrio'),
        direccion: datos.get('direccion'),
        razon: datos.get('razon'),
        trabajadores: datos.get('trabajadores'),
        actividad: datos.get('actividad'),
        arl: datos.get('arl'),
        atendio: datos.get('atendio'),
        telefono: datos.get('telefono'),
        correo: datos.get('correo'),

        identificacion: datos.get('identificacion'),
        identificacionCuales: datos.get('identificacionCuales'),
        fichas: datos.get('fichas'),
        almacenamiento: datos.get('almacenamiento'),
        epp: datos.get('epp'),
        residuos: datos.get('residuos'),
        transporte: datos.get('transporte'),
        explosion: datos.get('explosion'),
        auxilios: datos.get('auxilios'),
        incendios: datos.get('incendios'),
        ambiente: datos.get('ambiente'),
        asesoria: datos.get('asesoria'),
        capacitaciones: datos.get('capacitaciones'),

        riesgos: riesgosSeleccionados,
        observaciones: datos.get('observaciones'),
        compromisos: datos.get('compromisos')
    };

    let lista = JSON.parse(localStorage.getItem("ambientales")) || [];
    lista.push(registro);
    localStorage.setItem("ambientales", JSON.stringify(lista));

    alert("Registro guardado correctamente ✔");
    form.reset();
}
document.getElementById('identificacionSelect').addEventListener('change', function() {
    const div = document.getElementById('identificacionCuales');
    div.style.display = (this.value === "Sí") ? "block" : "none";
});
