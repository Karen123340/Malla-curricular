const malla = {
      "Matemáticas Basicas": {
    semestre: 1, creditos: 4, prerequisitos: [],
    desbloquea: [ "Cálculo Diferencial"] 
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

const estadoRamos = {};
const contenedor = document.getElementById("contenedor-malla");

function crearMalla() {
  const semestres = {};

  Object.entries(malla).forEach(([nombre, datos]) => {
    if (!semestres[datos.semestre]) {
      const divSem = document.createElement("div");
      divSem.className = "semestre";
      divSem.innerHTML = `<h2>${datos.semestre}° Semestre</h2>`;
      const cont = document.createElement("div");
      cont.className = "contenedor-semestre";
      divSem.appendChild(cont);
      contenedor.appendChild(divSem);
      semestres[datos.semestre] = cont;
    }

    const div = document.createElement("div");
    div.className = "ramo";
    div.id = nombre;
    div.innerHTML = `<strong>${nombre}</strong><br>
    <span>${datos.creditos} créditos</span><br>
    <input type="number" id="nota${nombre}" min="1" max="5" step="0.1" placeholder="Nota">`;
    semestres[datos.semestre].appendChild(div);

    const input = div.querySelector("input");
    input.addEventListener("input", calcularPromedios);
  });

  actualizarBloqueos();
}

function calcularPromedios() {
  let totalCreditos = 0, sumaPonderada = 0;

  Object.entries(malla).forEach(([nombre, datos]) => {
    const nota = parseFloat(document.getElementById(`nota${nombre}`).value);
    if (!isNaN(nota) && datos.creditos > 0) {
      totalCreditos += datos.creditos;
      sumaPonderada += nota * datos.creditos;
      estadoRamos[nombre] = nota >= 3;
    }
  });

  const papa = totalCreditos ? (sumaPonderada / totalCreditos).toFixed(2) : "0.00";
  document.getElementById("creditos").textContent = `${totalCreditos} / 168`;
  document.getElementById("avance").textContent = `${((totalCreditos / 168) * 100).toFixed(1)}%`;
  document.getElementById("papa").textContent = papa;

  actualizarBloqueos();
}

function actualizarBloqueos() {
  Object.entries(malla).forEach(([nombre, datos]) => {
    const div = document.getElementById(nombre);
    const prerreqCumplidos = datos.prerrequisitos.every(p => estadoRamos[p]);
    if (datos.prerrequisitos.length > 0 && !prerreqCumplidos) {
      div.classList.add("bloqueado");
    } else {
      div.classList.remove("bloqueado");
    }
  });
}

document.getElementById("reiniciar").addEventListener("click", () => {
  document.querySelectorAll("input").forEach(inp => inp.value = "");
  Object.keys(estadoRamos).forEach(k => estadoRamos[k] = false);
  calcularPromedios();
});

crearMalla();
