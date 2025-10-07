/* script.js
   - Usa 'prerequisitos' y/o 'desbloquea' del objeto ramos.
   - Si A.desbloquea incluye B entonces B.prerequisitos incluirá A (normalización).
   - Materia desbloqueada solo cuando TODOS sus prerrequisitos están aprobados (nota >= 3.0).
   - No hay nota por defecto; guarda en localStorage.
*/

const STORAGE_KEY = "malla_estado_v1";

/* --------------------- OBJETO RAMOS (usa los nombres que pegaste) --------------------- */
/* He corregido comas/sintaxis y mantuve las claves tal como las pegaste. */
const ramos = {
  "Matemáticas Basicas": {
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

/* --------------------- NORMALIZAR: si un ramo tiene 'desbloquea', convertirlo en prerequisito del destino --------------------- */
for (const [nombre, datos] of Object.entries(ramos)) {
  const des = datos.desbloquea || [];
  des.forEach(dest => {
    if (!ramos[dest]) {
      console.warn(Desbloquea: destino "${dest}" no existe en ramos (desde "${nombre}"));
      return;
    }
    if (!Array.isArray(ramos[dest].prerequisitos)) ramos[dest].prerequisitos = [];
    if (!ramos[dest].prerequisitos.includes(nombre)) {
      ramos[dest].prerequisitos.push(nombre);
    }
  });
}

/* --------------------- estado guardado --------------------- */
const estadoGuardado = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");

/* mapas nombre<->id seguros */
const nameToId = {}, idToName = {};

/* slugify */
function slugify(text) {
  return text
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

/* crear columnas */
function crearContenedoresSemestre() {
  const malla = document.getElementById("malla-container");
  malla.innerHTML = "";
  for (let i = 1; i <= 10; i++) {
    const col = document.createElement("div");
    col.className = "semestre";
    col.id = semestre${i};
    col.innerHTML = <h2>Semestre ${i}</h2><div class="contenedor-semestre"></div>;
    malla.appendChild(col);
  }
}

/* verifica si todos los prerequisitos de 'nombre' están aprobados */
function verificarPrerequisitos(nombre) {
  const datos = ramos[nombre];
  const prereqs = datos.prerequisitos || [];
  if (prereqs.length === 0) return true;
  return prereqs.every(p => {
    return !!(estadoGuardado[p] && estadoGuardado[p].aprobado === true);
  });
}

/* crea la tarjeta de la materia */
function crearCaja(nombre, datos) {
  const slug = slugify(nombre);
  nameToId[nombre] = slug;
  idToName[slug] = nombre;

  const div = document.createElement("div");
  div.className = "ramo " + tipoClase(nombre);
  div.id = slug;
  div.title = (datos.prerequisitos && datos.prerequisitos.length) ? Prerrequisitos: ${datos.prerequisitos.join(", ")} : "Sin prerrequisitos";

  const saved = estadoGuardado[nombre] || { nota: null, aprobado: false };
  const notaValue = (saved && saved.nota != null) ? saved.nota : "";

  div.innerHTML = `
    <strong>${nombre}</strong><br>
    <small>${datos.creditos} créditos</small><br>
    <input type="number" class="nota" min="1" max="5" step="0.1" placeholder="" value="${notaValue}">
  `;

  const container = document.querySelector(#semestre${datos.semestre} .contenedor-semestre);
  if (container) container.appendChild(div);

  if (saved.aprobado) div.classList.add("aprobado");
  else if (saved.nota != null && !isNaN(saved.nota) && saved.nota < 3.0) div.classList.add("reprobado");

  const input = div.querySelector(".nota");
  const prereqOk = verificarPrerequisitos(nombre);
  if (!prereqOk && !saved.aprobado) {
    div.classList.add("bloqueado");
    input.disabled = true;
  } else {
    input.disabled = false;
  }

  input.addEventListener("input", (e) => {
    const raw = e.target.value.trim();
    const val = raw === "" ? null : parseFloat(raw);
    if (!estadoGuardado[nombre]) estadoGuardado[nombre] = { nota: null, aprobado: false };

    if (val === null || isNaN(val)) {
      estadoGuardado[nombre].nota = null;
      estadoGuardado[nombre].aprobado = false;
      div.classList.remove("aprobado","reprobado");
    } else {
      if (val < 1 || val > 5) {
        estadoGuardado[nombre].nota = null;
        estadoGuardado[nombre].aprobado = false;
        div.classList.remove("aprobado","reprobado");
      } else {
        estadoGuardado[nombre].nota = parseFloat(val.toFixed(1));
        estadoGuardado[nombre].aprobado = estadoGuardado[nombre].nota >= 3.0;
        if (estadoGuardado[nombre].aprobado) {
          div.classList.add("aprobado");
          div.classList.remove("reprobado","bloqueado");
        } else {
          div.classList.add("reprobado");
          div.classList.remove("aprobado");
        }
      }
    }

    guardarEstado();
    actualizarBloqueos();
    actualizarContadores();
  });
}

/* heurística para elegir clase por color */
function tipoClase(nombre) {
  if (/calculo|matem/i.test(nombre)) return "fundacion";
  if (/taller|taller de|taller/i.test(nombre)) return "disciplinar";
  if (/libre/i.test(nombre)) return "libre";
  if (/Trabajo de grado/i.test(nombre)) return "trabajo";
  return "disciplinar";
}

/* actualizar bloqueos de todas las materias */
function actualizarBloqueos() {
  for (const nombre of Object.keys(ramos)) {
    const slug = nameToId[nombre];
    const div = document.getElementById(slug);
    if (!div) continue;
    const input = div.querySelector(".nota");
    const saved = estadoGuardado[nombre] || { nota: null, aprobado: false };
    const prereqOk = verificarPrerequisitos(nombre);

    if (saved.aprobado) {
      div.classList.remove("bloqueado");
      input.disabled = false;
      continue;
    }

    if (prereqOk) {
      div.classList.remove("bloqueado");
      input.disabled = false;
    } else {
      div.classList.add("bloqueado");
      input.disabled = true;
    }
  }
}

/* actualizar contadores y promedios (1 decimal) */
function actualizarContadores() {
  let sumaPonderada = 0, totalCredNota = 0, creditosAprobados = 0;
  for (const [nombre, datos] of Object.entries(ramos)) {
    const estado = estadoGuardado[nombre];
    if (estado && estado.nota != null && !isNaN(estado.nota)) {
      const c = datos.creditos || 0;
      sumaPonderada += estado.nota * c;
      totalCredNota += c;
      if (estado.aprobado) creditosAprobados += c;
    }
  }

  const papa = totalCredNota ? (sumaPonderada / totalCredNota).toFixed(1) : "0.0";
  const pappi = papa;
  const porcentaje = ((creditosAprobados / 168) * 100).toFixed(1);

  document.getElementById("papa").textContent = papa;
  document.getElementById("pappi").textContent = pappi;
  document.getElementById("creditosCompletados").textContent = creditosAprobados;
  document.getElementById("porcentajeAvance").textContent = porcentaje;
}

/* guardar en localStorage */
function guardarEstado() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(estadoGuardado));
}

/* reiniciar */
function reiniciarProgreso() {
  if (!confirm("Deseas reiniciar todo el progreso?")) return;
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
}

/* inicialización */
window.addEventListener("DOMContentLoaded", () => {
  crearContenedoresSemestre();
  for (const [nombre, datos] of Object.entries(ramos)) crearCaja(nombre, datos);
  actualizarBloqueos();
  actualizarContadores();
  const boton = document.getElementById("botonReiniciar");
  if (boton) boton.addEventListener("click", reiniciarProgreso);
});
