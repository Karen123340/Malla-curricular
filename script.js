// ... (código anterior de script.js)

function crearCaja(nombre, datos) {
  const div = document.createElement("div");
  const tipo = tipoAsignatura(nombre);
  
  // CORRECCIÓN CLAVE: Usar template strings para la clase.
  div.className = `ramo ${tipo}`; 
  div.id = nombre;
  
  // CORRECCIÓN CLAVE: Usar template strings para el contenido HTML.
  div.innerHTML = `<strong>${nombre}</strong><br><span>${datos.creditos} créditos</span>`;

  // CORRECCIÓN CLAVE: Usar template strings en el selector.
  const container = document.querySelector(`#semestre${datos.semestre} .contenedor-semestre`);
  if (container) container.appendChild(div);

  if (!estadoRamos.hasOwnProperty(nombre)) estadoRamos[nombre] = false;

  // Lógica de bloqueo/aprobado (mantenida de la última corrección)
  chequearBloqueo(nombre, datos, div);

  if (estadoRamos[nombre]) {
    div.classList.add("aprobado");
    div.classList.remove("bloqueado");
  }

  div.onclick = () => {
    if (div.classList.contains("bloqueado") || estadoRamos[nombre]) return;

    estadoRamos[nombre] = true;
    div.classList.add("aprobado");
    div.classList.remove("bloqueado");
    guardarEstado();
    actualizarBloqueos();
  };
}

// ... (resto del código de script.js)
