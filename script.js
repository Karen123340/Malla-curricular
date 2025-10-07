// === Datos de la malla ===
const ramos = {
  "Matemáticas Basicas": { semestre: 1, creditos: 0, prerequisitos: [], desbloquea: ["Cálculo Diferencial"] },
  "Cálculo Diferencial": { semestre: 1, creditos: 4, prerequisitos: [], desbloquea: ["Álgebra Lineal", "Taller de Herramientas y Problemas", "Fundamentos de Mecánica", "Economía General", "Cálculo Integral"] },
  "Sociología especial: industrial y del trabajo": { semestre: 1, creditos: 3, prerequisitos: [] },
  "Introducción a la Ingeniería Industrial": { semestre: 1, creditos: 3, prerequisitos: [], desbloquea: ["Taller de Herramientas y Problemas", "Economía General", "Taller de Invención y Creatividad"] },
  "Programación de Computadores": { semestre: 1, creditos: 3, prerequisitos: [], desbloquea: ["Programación Orientada a Objetos"] },

  "Cálculo Integral": { semestre: 2, creditos: 4, prerequisitos: ["Cálculo Diferencial"], desbloquea: ["Cálculo en Varias Variables", "Fundamentos de Electricidad y Magnetismo", "Ecuaciones Diferenciales", "Probabilidad Fundamental"] },
  "Álgebra Lineal": { semestre: 2, creditos: 4, prerequisitos: ["Cálculo Diferencial"], desbloquea: ["Ecuaciones Diferenciales", "Optimización"] },
  "Taller de Invención y Creatividad": { semestre: 2, creditos: 3, prerequisitos: ["Introducción a la Ingeniería Industrial"], desbloquea: ["Gestión Empresarial"] },
  "Programación Orientada a Objetos": { semestre: 2, creditos: 3, prerequisitos: ["Programación de Computadores"], desbloquea: ["Taller de Herramientas y Problemas"] },
  "Libre elección 1": { semestre: 2, creditos: 3, prerequisitos: [] },

  "Cálculo en Varias Variables": { semestre: 3, creditos: 4, prerequisitos: ["Cálculo Integral"], desbloquea: ["Ingeniería Económica y Análisis de Riesgo", "Optimización", "Modelos y Simulación"] },
  "Fundamentos de Mecánica": { semestre: 3, creditos: 4, prerequisitos: ["Cálculo Diferencial"], desbloquea: ["Taller Ciencia y Tecnología Materiales", "Fundamentos de Electricidad y Magnetismo"] },
  "Economía General": { semestre: 3, creditos: 3, prerequisitos: ["Cálculo Diferencial", "Introducción a la Ingeniería Industrial"], desbloquea: ["Gestión Empresarial", "Sistema de Costos"] },
  "Taller de Herramientas y Problemas": { semestre: 3, creditos: 3, prerequisitos: ["Cálculo Diferencial", "Introducción a la Ingeniería Industrial", "Programación Orientada a Objetos"], desbloquea: ["Sistema de Costos", "Modelos y Simulación"] },
  "Probabilidad Fundamental": { semestre: 3, creditos: 4, prerequisitos: ["Cálculo Integral"], desbloquea: ["Modelos y Simulación", "Inferencia Estadística Fundamental"] },

  "Ecuaciones Diferenciales": { semestre: 4, creditos: 4, prerequisitos: ["Álgebra Lineal", "Cálculo Integral"], desbloquea: ["Modelos y Simulación"] },
  "Fundamentos de Electricidad y Magnetismo": { semestre: 4, creditos: 4, prerequisitos: ["Cálculo Integral"], desbloquea: ["Seguridad Industrial"] },
  "Sistema de Costos": { semestre: 4, creditos: 4, prerequisitos: ["Taller de Herramientas y Problemas"], desbloquea: ["Ingeniería Económica y Análisis de Riesgo"] },
  "Gestión Empresarial": { semestre: 4, creditos: 3, prerequisitos: ["Taller de Invención y Creatividad", "Economía General"] },
  "Taller Ciencia y Tecnología Materiales": { semestre: 4, creditos: 4, prerequisitos: ["Fundamentos de Mecánica"], desbloquea: ["Taller de Procesos Químicos y Biotecnológicos", "Taller de Procesos Metalmecánicos"] },

  "Modelos y Simulación": { semestre: 5, creditos: 3, prerequisitos: ["Cálculo en Varias Variables", "Taller de Herramientas y Problemas", "Ecuaciones Diferenciales", "Probabilidad Fundamental"], desbloquea: ["Modelos Estocásticos"] },
  "Optimización": { semestre: 5, creditos: 3, prerequisitos: ["Álgebra Lineal", "Cálculo en Varias Variables"], desbloquea: ["Taller Ergonomía e Ingeniería de Métodos", "Modelos Estocásticos"] },
  "Ingeniería Económica y Análisis de Riesgo": { semestre: 5, creditos: 3, prerequisitos: ["Sistema de Costos", "Cálculo en Varias Variables"], desbloquea: ["Finanzas", "Gerencia y Gestión de Proyectos"] },
  "Taller de Procesos Químicos y Biotecnológicos": { semestre: 5, creditos: 3, prerequisitos: ["Taller Ciencia y Tecnología Materiales"] },
  "Taller de Procesos Metalmecánicos": { semestre: 5, creditos: 3, prerequisitos: ["Taller Ciencia y Tecnología Materiales"], desbloquea: ["Taller Ergonomía e Ingeniería de Métodos"] },
  "Inferencia Estadística Fundamental": { semestre: 5, creditos: 4, prerequisitos: ["Probabilidad Fundamental"], desbloquea: ["Control y Gestión Calidad", "Modelos Estocásticos", "Taller Metodología Investigación"] },

  // ... (continúa igual hasta Trabajo de Grado, mismo formato)
};

// === Renderizado dinámico ===
const contenedor = document.getElementById("contenedor");
const resumen = document.getElementById("resumen");
let progreso = JSON.parse(localStorage.getItem("progreso")) || {};

function crearMalla() {
  const semestres = {};
  for (const [nombre, datos] of Object.entries(ramos)) {
    if (!semestres[datos.semestre]) semestres[datos.semestre] = [];
    semestres[datos.semestre].push({ nombre, ...datos });
  }

  Object.keys(semestres).sort((a, b) => a - b).forEach(num => {
    const col = document.createElement("div");
    col.className = `semestre sem${num}`;
    const titulo = document.createElement("h2");
    titulo.textContent = `${num}° Semestre`;
    col.appendChild(titulo);

    semestres[num].forEach(ramo => {
      const div = document.createElement("div");
      div.className = "materia";
      div.innerHTML = `
        <strong>${ramo.nombre}</strong><br>
        <span>${ramo.creditos} créditos</span><br>
        <select>
          <option value="">—</option>
          <option value="1">1.0</option>
          <option value="2">2.0</option>
          <option value="3">3.0</option>
          <option value="4">4.0</option>
          <option value="5">5.0</option>
        </select>
      `;
      const select = div.querySelector("select");
      select.value = progreso[ramo.nombre] || "";
      select.addEventListener("change", e => {
        progreso[ramo.nombre] = e.target.value;
        localStorage.setItem("progreso", JSON.stringify(progreso));
        actualizarBloqueos();
        actualizarResumen();
      });
      col.appendChild(div);
    });
    contenedor.appendChild(col);
  });

  actualizarBloqueos();
  actualizarResumen();
}

// === Lógica de prerrequisitos ===
function actualizarBloqueos() {
  document.querySelectorAll(".materia").forEach(div => {
    const nombre = div.querySelector("strong").textContent;
    const ramo = ramos[nombre];
    if (!ramo) return;
    const cumplidos = ramo.prerequisitos.every(p => progreso[p] && progreso[p] >= 3);
    const pendientes = ramo.prerequisitos.filter(p => !progreso[p] || progreso[p] < 3);
    const select = div.querySelector("select");

    if (cumplidos || ramo.prerequisitos.length === 0) {
      div.classList.remove("bloqueada");
      select.disabled = false;
      div.removeAttribute("data-tooltip");
    } else {
      div.classList.add("bloqueada");
      select.disabled = true;
      div.setAttribute("data-tooltip", `Prerrequisitos pendientes: ${pendientes.join(", ")}`);
    }
  });
}

// === Cálculo de créditos y promedios ===
function actualizarResumen() {
  let creditosTotales = 168;
  let creditosCompletos = 0;
  let sumNotas = 0;
  let sumNotasPonderadas = 0;

  for (const [nombre, nota] of Object.entries(progreso)) {
    const ramo = ramos[nombre];
    if (!ramo || nombre === "Matemáticas Basicas") continue;
    const n = parseFloat(nota);
    if (n >= 3) creditosCompletos += ramo.creditos;
    if (!isNaN(n)) {
      sumNotas += n;
      sumNotasPonderadas += n * ramo.creditos;
    }
  }

  const pappi = sumNotas ? (sumNotas / Object.keys(progreso).length).toFixed(2) : "0.00";
  const papa = sumNotasPonderadas ? (sumNotasPonderadas / creditosTotales).toFixed(2) : "0.00";
  const avance = ((creditosCompletos / creditosTotales) * 100).toFixed(1);

  document.getElementById("creditos").textContent = `${creditosCompletos} / ${creditosTotales}`;
  document.getElementById("avance").textContent = `${avance}%`;
  document.getElementById("pappi").textContent = pappi;
  document.getElementById("papa").textContent = papa;
}

// === Reiniciar progreso ===
document.getElementById("reiniciar").addEventListener("click", () => {
  if (confirm("¿Deseas reiniciar todo el progreso?")) {
    localStorage.removeItem("progreso");
    progreso = {};
    contenedor.innerHTML = "";
    crearMalla();
  }
});

// === Inicialización ===
crearMalla();
