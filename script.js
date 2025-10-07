const estadoRamos = JSON.parse(localStorage.getItem("estadoRamos")) || {};

const tipos = {
  fundacion: [
    "Cálculo Diferencial", "Sociología especial: industrial y del trabajo",
    "Introducción a la Ingeniería Industrial", "Programación de Computadores",
    "Cálculo Integral", "Álgebra Lineal", "Taller de Invención y Creatividad",
    "Programación Orientada a Objetos", "Probabilidad Fundamental",
    "Ecuaciones Diferenciales", "Fundamentos de Electricidad y Magnetismo",
    "Fundamentos de Mecánica", "Matematicas Basicas"
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

const ramos = {
     "Matematicas Basicas"
       semestre: 1, creditos: 4, prerequisitos: [],
    desbloquea: ["Cálculo Diferencial"]
  },
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
  "Programación de Computadores": {
    semestre: 1, creditos: 3, prerequisitos: [],
    desbloquea: ["Programación Orientada a Objetos"]
  },
  "Cálculo Integral": {
    semestre: 2, creditos: 4, prerequisitos: ["Cálculo Diferencial"],
    desbloquea: ["Cálculo en Varias Variables", "Fundamentos de Electricidad y Magnetismo", "Ecuaciones Diferenciales", "Probabilidad Fundamental"]
  },
  "Álgebra Lineal": {
    semestre: 2, creditos: 4, prerequisitos: ["Cálculo Diferencial"],
    desbloquea: ["Ecuaciones Diferenciales", "Optimización"]
  },
  "Taller de Invención y Creatividad": {
    semestre: 2, creditos: 3, prerequisitos: ["Introducción a la Ingeniería Industrial"],
    desbloquea: ["Gestión Empresarial"]
  },
  "Programación Orientada a Objetos": {
    semestre: 2, creditos: 3, prerequisitos: ["Programación de Computadores"],
    desbloquea: ["Taller de Herramientas y Problemas"]
  },
  "Libre elección 1": {
    semestre: 2, creditos: 3, prerequisitos: []
  },
  "Cálculo en Varias Variables": {
    semestre: 3, creditos: 4, prerequisitos: ["Cálculo Integral"],
    desbloquea: ["Ingeniería Económica y Análisis de Riesgo", "Optimización", "Modelos y Simulación"]
  },
  "Fundamentos de Mecánica": {
    semestre: 3, creditos: 4, prerequisitos: ["Cálculo Diferencial"],
    desbloquea: ["Taller Ciencia y Tecnología Materiales", "Fundamentos de Electricidad y Magnetismo"]
  },
  "Economía General": {
    semestre: 3, creditos: 3, prerequisitos: ["Cálculo Diferencial", "Introducción a la Ingeniería Industrial"],
    desbloquea: ["Gestión Empresarial", "Sistema de Costos"]
  },
  "Taller de Herramientas y Problemas": {
    semestre: 3, creditos: 3, prerequisitos: ["Cálculo Diferencial", "Introducción a la Ingeniería Industrial", "Programación Orientada a Objetos"],
    desbloquea: ["Sistema de Costos", "Modelos y Simulación"]
  },
  "Probabilidad Fundamental": {
    semestre: 3, creditos: 4, prerequisitos: ["Cálculo Integral"],
    desbloquea: ["Modelos y Simulación", "Inferencia Estadística Fundamental"]
  },
  "Ecuaciones Diferenciales": {
    semestre: 4, creditos: 4, prerequisitos: ["Álgebra Lineal", "Cálculo Integral"],
    desbloquea: ["Modelos y Simulación"]
  },
  "Fundamentos de Electricidad y Magnetismo": {
    semestre: 4, creditos: 4, prerequisitos: ["Cálculo Integral"],
    desbloquea: ["Seguridad Industrial"]
  },
  "Sistema de Costos": {
    semestre: 4, creditos: 4, prerequisitos: ["Taller de Herramientas y Problemas"],
    desbloquea: ["Ingeniería Económica y Análisis de Riesgo"]
  },
  "Gestión Empresarial": {
    semestre: 4, creditos: 3, prerequisitos: ["Taller de Invención y Creatividad", "Economía General"]
  },
  "Taller Ciencia y Tecnología Materiales": {
    semestre: 4, creditos: 4, prerequisitos: ["Fundamentos de Mecánica"],
    desbloquea: ["Taller de Procesos Químicos y Biotecnológicos", "Taller de Procesos Metalmecánicos"]
  },
  "Modelos y Simulación": {
    semestre: 5, creditos: 3, prerequisitos: ["Cálculo en Varias Variables", "Taller de Herramientas y Problemas", "Ecuaciones Diferenciales", "Probabilidad Fundamental"],
    desbloquea: ["Modelos Estocásticos"]
  },
  "Optimización": {
    semestre: 5, creditos: 3, prerequisitos: ["Álgebra Lineal", "Cálculo en Varias Variables"],
    desbloquea: ["Taller Ergonomía e Ingeniería de Métodos", "Modelos Estocásticos"]
  },
  "Ingeniería Económica y Análisis de Riesgo": {
    semestre: 5, creditos: 3, prerequisitos: ["Sistema de Costos", "Cálculo en Varias Variables"],
    desbloquea: ["Finanzas", "Gerencia y Gestión de Proyectos"]
  },
  "Taller de Procesos Químicos y Biotecnológicos": {
    semestre: 5, creditos: 3, prerequisitos: ["Taller Ciencia y Tecnología Materiales"]
  },
  "Taller de Procesos Metalmecánicos": {
    semestre: 5, creditos: 3, prerequisitos: ["Taller Ciencia y Tecnología Materiales"],
    desbloquea: ["Taller Ergonomía e Ingeniería de Métodos"]
  },
  "Inferencia Estadística Fundamental": {
    semestre: 5, creditos: 4, prerequisitos: ["Probabilidad Fundamental"],
    desbloquea: ["Control y Gestión Calidad", "Modelos Estocásticos", "Taller Metodología Investigación"]
  },
  "Modelos Estocásticos": {
    semestre: 6, creditos: 3, prerequisitos: ["Modelos y Simulación", "Optimización", "Inferencia Estadística Fundamental"],
    desbloquea: ["Taller Simulación Procesos", "Taller Ingeniería de Producción"]
  },
  "Gerencia y Gestión de Proyectos": {
    semestre: 6, creditos: 3, prerequisitos: ["Ingeniería Económica y Análisis de Riesgo"],
    desbloquea: ["Sistemas de Información"]
  },
  "Finanzas": {
    semestre: 6, creditos: 3, prerequisitos: ["Ingeniería Económica y Análisis de Riesgo"]
  },
  "Taller Ergonomía e Ingeniería de Métodos": {
    semestre: 6, creditos: 4, prerequisitos: ["Optimización", "Taller de Procesos Metalmecánicos"],
    desbloquea: ["Taller Ingeniería de Producción"]
  },
  "Control y Gestión Calidad": {
    semestre: 6, creditos: 3, prerequisitos: ["Inferencia Estadística Fundamental"]
  },
  "Taller Simulación Procesos": {
    semestre: 7, creditos: 3, prerequisitos: ["Modelos Estocásticos"],
    desbloquea: ["Logística"]
  },
  "Sistemas de Información": {
    semestre: 7, creditos: 3, prerequisitos: ["Gerencia y Gestión de Proyectos"],
    desbloquea: ["Taller Diseño Plantas", "Gestión Tecnológica"]
  },
  "Seguridad Industrial": {
    semestre: 7, creditos: 3, prerequisitos: ["Fundamentos de Electricidad y Magnetismo"],
    desbloquea: ["Taller Diseño Plantas", "Gerencia de Recursos Humanos"]
  },
  "Taller Ingeniería de Producción": {
    semestre: 7, creditos: 4, prerequisitos: ["Taller Ergonomía e Ingeniería de Métodos", "Modelos Estocásticos"],
    desbloquea: ["Taller Diseño Plantas"]
  },
  "Taller Metodología Investigación": {
    semestre: 7, creditos: 3, prerequisitos: ["Taller de Invención y Creatividad", "Inferencia Estadística Fundamental"]
  },
  "Logística": {
    semestre: 8, creditos: 3, prerequisitos: ["Taller Simulación Procesos"]
  },
  "Gestión Tecnológica": {
    semestre: 8, creditos: 3, prerequisitos: ["Sistemas de Información"]
  },
  "Gerencia de Recursos Humanos": {
    semestre: 8, creditos: 3, prerequisitos: ["Seguridad Industrial"]
  },
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
  calcularPromedios();
}

function crearContenedoresSemestre() {
  const malla = document.getElementById("malla-container");
  for (let i = 1; i <= 10; i++) {
    const columna = document.createElement("div");
    columna.className = "semestre";
    columna.id = `semestre${i}`;
    columna.innerHTML = `<h2>Semestre ${i}</h2><div class="contenedor-semestre"></div>`;
    malla.appendChild(columna);
  }
}

function crearCaja(nombre, datos) {
  const div = document.createElement("div");
  const tipo = tipoAsignatura(nombre);
  div.className = `ramo ${tipo}`;
  div.id = nombre;
  div.innerHTML = `<strong>${nombre}</strong><br><span>${datos.creditos} créditos</span><br>
                  <label for="nota${nombre}">Nota: </label>
                  <input type="number" id="nota${nombre}" class="nota" min="1" max="7" step="0.1">`;

  const container = document.querySelector(`#semestre${datos.semestre} .contenedor-semestre`);
  if (container) container.appendChild(div);

  if (!estadoRamos.hasOwnProperty(nombre)) estadoRamos[nombre] = false;

  const inputNota = document.getElementById(`nota${nombre}`);
  inputNota.addEventListener("input", function() {
    calcularPromedios();
  });
}

function calcularPromedios() {
  let totalCreditosSemestrales = 0;
  let sumaPonderadaSemestral = 0;

  let totalCreditosCarrera = 0;
  let sumaPonderadaCarrera = 0;

  Object.entries(ramos).forEach(([nombre, datos]) => {
    const nota = parseFloat(document.getElementById(`nota${nombre}`)?.value || 0);
    if (nota && nota >= 1 && nota <= 7) {
      const creditos = datos.creditos;

      totalCreditosSemestrales += creditos;
      sumaPonderadaSemestral += creditos * nota;

      totalCreditosCarrera += creditos;
      sumaPonderadaCarrera += creditos * nota;
    }
  });

  const promedioSemestral = (sumaPonderadaSemestral / totalCreditosSemestrales).toFixed(2);
  document.getElementById("pappi").textContent = `P.A.P.P.I.: ${promedioSemestral}`;

  const promedioCarrera = (sumaPonderadaCarrera / totalCreditosCarrera).toFixed(2);
  document.getElementById("papa").textContent = `P.A.P.A.: ${promedioCarrera}`;
}

function reiniciarProgreso() {
  if (confirm("¿Quieres reiniciar tu progreso?")) {
    Object.keys(estadoRamos).forEach(k => estadoRamos[k] = false);
    guardarEstado();
    location.reload();
  }
}

window.onload = () => {
  crearContenedoresSemestre();
  Object.entries(ramos).forEach(([nombre, datos]) => {
    crearCaja(nombre, datos);
  });
  calcularPromedios();
  document.getElementById("botonReiniciar").addEventListener("click", reiniciarProgreso);
};
