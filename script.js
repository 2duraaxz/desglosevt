// ===============================
// FUNCION PARA FORMATO LIMPIO
// ===============================

function formato(numero) {
    return parseFloat(numero.toFixed(3));
}

// ===============================
// NAVEGACION PROFESIONAL
// ===============================

function mostrarVentanas(){
    document.getElementById("menuPrincipal").style.display = "none";
    document.getElementById("seccionVentanas").classList.add("active");
}

function mostrarGabinete(){
    document.getElementById("menuPrincipal").style.display = "none";
    document.getElementById("seccionGabinete").classList.add("active");
}

function volverMenu(){
    document.getElementById("menuPrincipal").style.display = "flex";
    document.getElementById("seccionVentanas").classList.remove("active");
    document.getElementById("seccionGabinete").classList.remove("active");
}

// ===============================
// CALCULO PRINCIPAL
// ===============================

function calcular(){

    let nombre = document.getElementById("nombre").value.trim();
    let ancho = parseFloat(document.getElementById("ancho").value);
    let alto = parseFloat(document.getElementById("alto").value);

    if(!nombre || isNaN(ancho) || isNaN(alto)){
        alert("Completa todos los campos correctamente");
        return;
    }

    // FORMULAS

    let jamba = alto - 1;
    let lateral = alto - 0.5;

    let rc = ancho - 0.25;
    let claf = (ancho - 0.5) / 2;

    let vidrioAlto = alto - 4;
    let vidrioAncho = (ancho - 4) / 2;

    let html = `
        <div class="result-box">
            <h3>Desglose</h3>

            <p><b>Jamba:</b> ${formato(jamba)}</p>
            <p><b>Lateral:</b> ${formato(lateral)}</p>
            <p><b>R/C:</b> ${formato(rc)}</p>
            <p><b>CLAF:</b> ${formato(claf)}</p>

            <hr>

            <h3>Vidrio</h3>
            <p><b>Vidrio Alto:</b> ${formato(vidrioAlto)}</p>
            <p><b>Vidrio Ancho:</b> ${formato(vidrioAncho)}</p>

            <div class="small">
                Medida Original: ${ancho} x ${alto}
            </div>
        </div>
    `;

    document.getElementById("resultado").innerHTML = html;

    guardarHistorial(nombre, ancho, alto, vidrioAncho, vidrioAlto);
}

// ===============================
// HISTORIAL
// ===============================

function guardarHistorial(nombre, ancho, alto, rAncho, rAlto){

    let historial = JSON.parse(localStorage.getItem("desgloseVT")) || [];

    historial.push({
        nombre,
        ancho,
        alto,
        rAncho,
        rAlto,
        fecha: new Date().toLocaleString()
    });

    localStorage.setItem("desgloseVT", JSON.stringify(historial));
    mostrarHistorial();
}

function mostrarHistorial(){

    let historial = JSON.parse(localStorage.getItem("desgloseVT")) || [];
    let contenedor = document.getElementById("historial");

    if(!contenedor) return;

    contenedor.innerHTML = "";

    historial.forEach((item, index)=>{
        contenedor.innerHTML += `
        <div class="history-item">
            <b>${item.nombre}</b><br>
            ${item.ancho} x ${item.alto}<br>
            Vidrio: ${formato(item.rAncho)} x ${formato(item.rAlto)}<br>
            <span class="small">${item.fecha}</span><br>
            <button class="delete-btn" onclick="eliminar(${index})">Eliminar</button>
        </div>
        <hr>
        `;
    });
}

function eliminar(index){
    let historial = JSON.parse(localStorage.getItem("desgloseVT")) || [];
    historial.splice(index,1);
    localStorage.setItem("desgloseVT", JSON.stringify(historial));
    mostrarHistorial();
}

function limpiarHistorial(){
    localStorage.removeItem("desgloseVT");
    mostrarHistorial();
}

function toggleHistorial(){
    document.getElementById("panelHistorial").classList.add("active");
    document.getElementById("overlay").classList.add("active");
}

function cerrarHistorial(){
    document.getElementById("panelHistorial").classList.remove("active");
    document.getElementById("overlay").classList.remove("active");
}
function mostrarInfo() {
    document.getElementById("panelInfo").classList.add("active");
}

function cerrarInfo() {
    document.getElementById("panelInfo").classList.remove("active");
}


// ===============================
// INICIO
// ===============================

mostrarHistorial();

