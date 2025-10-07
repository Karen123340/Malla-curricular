const estadoRamos = JSON.parse(localStorage.getItem("estadoRamos")) || {};

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
  libre: [
    "Libre elección 1", "Libre elección 2", "Libre elección 3", "Libre elección 4",
    "Libre elección 5", "Libre elección 6", "Libre elección 7", "Libre elección 8",
    "Libre elección 9"
  ],
  trabajo: ["Trabajo de grado"]
};

const ramos = { /* Aquí va todo tu objeto de ramos como ya lo tienes */ };

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
  if (!malla) return;
  malla.innerHTML = '';  // Limpiar contenedor de la malla antes de agregar los semestres

  for (let i = 1; i <= 10; i++) {
    const columna = document.createElement("div");
    columna.className = "semestre";
    columna.id = `semestre${i}`;
    columna.innerHTML = `<h2>Semestre ${i}</h2>`; 
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
  if (!datos || !datos.creditos || !datos.semestre) {
    console.error(`ERROR FATAL: Datos incompletos o faltantes para la asignatura: ${nombre}`, datos);
    return;
  }

  const div = document.createElement("div");
  const tipo = tipoAsignatura(nombre);

  div.className = `ramo ${tipo}`;
  div.id = nombre;
  div.innerHTML = `<strong>${nombre}</strong><br><span>${datos.creditos} créditos</span>`;

  const container = document.getElementById(`semestre${datos.semestre}`);
  if (container) container.appendChild(div);

  if (!estadoRamos.hasOwnProperty(nombre)) estadoRamos[nombre] = false;

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
  if (confirm("¿Estás seguro de que deseas reiniciar tu progreso? Todos los datos de tus ramos serán eliminados.")) {
    localStorage.removeItem("estadoRamos");
    location.reload();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  crearContenedoresSemestre();

  Object.entries(ramos).forEach(([nombre, datos]) => {
    crearCaja(nombre, datos);
  });

  actualizarBloqueos();
  actualizarContadores();

  const botonReiniciar = document.getElementById("botonReiniciar");
  if (botonReiniciar) {
    botonReiniciar.addEventListener("click", reiniciarProgreso);
  }
});
