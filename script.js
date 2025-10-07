// script.js actualizado con tipos de asignatura y clases CSS por color

const estadoRamos = JSON.parse(localStorage.getItem("estadoRamos")) || {};

// Clasificación por tipo para colores (mantenida igual a la corrección anterior, asumiendo que es la final)
const tipos = {
  fundacion: [
    "Cálculo Diferencial", "Sociología especial: industrial y del trabajo",
    "Introducción a la Ingeniería Industrial", "Programación de Computadores",
    "Cálculo Integral", "Álgebra Lineal", "Taller de Invención y Creatividad",
    "Programación Orientada a Objetos", "Probabilidad Fundamental",
    "Ecuaciones Diferenciales", "Fundamentos de Electricidad y Magnetismo",
    "Fundamentos de Mecánica"
  ],
  disciplinar: [
    "Taller de Herramientas y Problemas", "Economía General",
    "Taller Ciencia y Tecnología Materiales", "Sistema de Costos",
    "Gestión Empresarial", "Cálculo en Varias Variables", "Modelos y Simulación",
    "Ingeniería Económica y Análisis de Riesgo", "Optimización",
    "Taller de Procesos Químicos y Biotecnológicos",
    "Taller de Procesos Metalmecánicos", "Inferencia Estadística Fundamental",
    "Modelos Estocásticos", "Gerencia y Gestión de Proyectos", "Finanzas",
    "Taller Ergonomía e Ingeniería de Métodos", "Control y Gestión Calidad",
    "Taller Simulación Procesos", "Sistemas de Información",
    "Seguridad Industrial", "Taller Ingeniería de Producción",
    "Taller Metodología Investigación", "Logística",
    "Gestión Tecnológica", "Gerencia de Recursos Humanos",
    "Taller Diseño Plantas"
  ],
  optativa: [],
  libre: [
    "Libre elección 1", "Libre elección 2", "Libre elección 3", "Libre elección 4",
    "Libre elección 5", "Libre elección 6", "Libre elección 7", "Libre elección 8",
    "Libre elección 9"
  ],
  trabajo: ["Trabajo de grado"]
};

// El objeto 'ramos' completo (no se muestra aquí por extensión, pero se asume el correcto).
const ramos = {
  // ... (Mantener la estructura del objeto 'ramos' del código original)
      "Cálculo Diferencial": {
    semestre: 1, creditos: 4, prerequisitos: [],
    desbloquea: ["Álgebra Lineal", "Taller de Herramientas y Problemas", "Fundamentos de Mecánica", "Economía General", "Cálculo Integral"]
  },
  "Sociología especial: industrial y del trabajo": {
    semestre: 1, creditos: 3, prerequisitos: []
  },
  "Introducción a la Ingeniería Industrial": {
    semestre: 1, creditos: 3, prerequisitos: [],
    desbloquea: ["Taller de Herramientas y Problemas", "Economía General", "Taller de Invención y Creatividad"]
  },
  // ... (resto del objeto ramos)
  "Taller Diseño Plantas": {
    semestre: 8, creditos: 4, prerequisitos: ["Taller Ingeniería de Producción", "Seguridad Industrial", "Sistemas de Información"]
  },
  "Libre elección 2": { semestre: 8, creditos: 4, prerequisitos: [] },
  "Libre elección 3": { semestre: 9, creditos: 4, prerequisitos: [] },
  "Libre elección 4": { semestre: 9, creditos: 4, prerequisitos: [] },
  "Libre elección 5": { semestre: 9, creditos: 4, prerequisitos: [] },
  "Libre elección 6": { semestre: 9, creditos: 4, prerequisitos: [] },
  "Libre elección 7": { semestre: 10, creditos: 4, prerequisitos: [] },
  "Libre elección 8": { semestre: 10, creditos: 4, prerequisitos: [] },
  "Libre elección 9": { semestre: 10, creditos: 3, prerequisitos: [] },
  "Trabajo de grado": { semestre: 10, creditos: 6, prerequisitos: [] }
};


function tipoAsignatura(nombre) {
  for (const [tipo, lista] of Object.entries(tipos)) {
    if (lista.includes(nombre)) return tipo;
  }
  return "libre";
}

function guardarEstado() {
  localStorage.setItem("estadoRamos", JSON.stringify(estadoRamos));
  actualizarContadores();
}

function crearContenedoresSemestre() {
  const malla = document.getElementById("malla-container");
  if (!malla) { // Añadir chequeo de seguridad
    console.error("Elemento #malla-container no encontrado.");
    return;
  }
  malla.innerHTML = ''; // Limpia el contenedor antes de crear
  for (let i = 1; i <= 10; i++) {
    const columna = document.createElement("div");
    columna.className = "semestre";
    columna.id = `semestre${i}`;
    columna.innerHTML = `<h2>Semestre ${i}</h2><div class="contenedor-semestre"></div>`;
    malla.appendChild(columna);
  }
}

function chequearBloqueo(nombre, datos, div) {
  const estaBloqueado = datos.prerequisitos.length > 0 && 
                        datos.prerequisitos.some(pre => !estadoRamos[pre]);

  if (estaBloqueado) {
    div.classList.add("bloqueado");
  } else {
    div.classList.remove("bloqueado");
  }
}

function crearCaja(nombre, datos) {
  const div = document.createElement("div");
  const tipo = tipoAsignatura(nombre);
  div.className = `ramo ${tipo}`;
  div.id = nombre;
  div.innerHTML = `<strong>${nombre}</strong><br><span>${datos.creditos} créditos</span>`;

  const container = document.querySelector(`#semestre${datos.semestre} .contenedor-semestre`);
  if (container) container.appendChild(div);

  if (!estadoRamos.hasOwnProperty(nombre)) estadoRamos[nombre] = false;

  // Lógica inicial de chequeo de bloqueo
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

function actualizarBloqueos() {
  Object.entries(ramos).forEach(([nombre, datos]) => {
    const div = document.getElementById(nombre);
    if (div && !estadoRamos[nombre]) {
      chequearBloqueo(nombre, datos, div);
    } else if (div && estadoRamos[nombre]) {
      // Asegura que los ramos aprobados mantengan su estado
      div.classList.add("aprobado");
      div.classList.remove("bloqueado");
    }
  });
}

function actualizarContadores() {
  const total = 168;
  let completados = 0;
  for (const [nombre, aprobado] of Object.entries(estadoRamos)) {
    if (aprobado && ramos[nombre]) completados += ramos[nombre].creditos;
  }
  document.getElementById("creditosCompletados").textContent = completados;
  document.getElementById("porcentajeAvance").textContent = ((completados / total) * 100).toFixed(2);
}

function reiniciarProgreso() {
  if (confirm("¿Quieres reiniciar tu progreso?")) {
    localStorage.removeItem("estadoRamos");
    location.reload();
  }
}

// CORRECCIÓN CLAVE: Usar DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  crearContenedoresSemestre();
  Object.entries(ramos).forEach(([nombre, datos]) => {
    crearCaja(nombre, datos);
  });
  actualizarBloqueos(); // Inicializa los estados
  actualizarContadores();
  
  // Asegura que el botón exista antes de agregar el listener
  const botonReiniciar = document.getElementById("botonReiniciar");
  if (botonReiniciar) {
    botonReiniciar.addEventListener("click", reiniciarProgreso);
  }
});
