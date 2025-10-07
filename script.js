// script.js - malla completa 10 semestres, prerrequisitos, guardado, P.A.P.P.I. y P.A.P.A.
// Guarda en localStorage bajo 'malla_estado_v3'

const STORAGE_KEY = "malla_estado_v3";

/* ------------------- Datos completos de ramos -------------------
   Usé exactamente la lista que me diste (semestre, créditos, prerequisitos, desbloquea).
   "Matemáticas Basicas" tiene creditos:0 (no cuenta en avance ni en promedio ponderado).
*/
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

  "Modelos Estocásticos": { semestre: 6, creditos: 3, prerequisitos: ["Modelos y Simulación", "Optimización", "Inferencia Estadística Fundamental"], desbloquea: ["Taller Simulación Procesos", "Taller Ingeniería de Producción"] },
  "Gerencia y Gestión de Proyectos": { semestre: 6, creditos: 3, prerequisitos: ["Ingeniería Económica y Análisis de Riesgo"], desbloquea: ["Sistemas de Información"] },
  "Finanzas": { semestre: 6, creditos: 3, prerequisitos: ["Ingeniería Económica y Análisis de Riesgo"] },
  "Taller Ergonomía e Ingeniería de Métodos": { semestre: 6, creditos: 4, prerequisitos: ["Optimización", "Taller de Procesos Metalmecánicos"], desbloquea: ["Taller Ingeniería de Producción"] },
  "Control y Gestión Calidad": { semestre: 6, creditos: 3, prerequisitos: ["Inferencia Estadística Fundamental"] },

  "Taller Simulación Procesos": { semestre: 7, creditos: 3, prerequisitos: ["Modelos Estocásticos"], desbloquea: ["Logística"] },
  "Sistemas de Información": { semestre: 7, creditos: 3, prerequisitos: ["Gerencia y Gestión de Proyectos"], desbloquea: ["Taller Diseño Plantas", "Gestión Tecnológica"] },
  "Seguridad Industrial": { semestre: 7, creditos: 3, prerequisitos: ["Fundamentos de Electricidad y Magnetismo"], desbloquea: ["Taller Diseño Plantas", "Gerencia de Recursos Humanos"] },
  "Taller Ingeniería de Producción": { semestre: 7, creditos: 4, prerequisitos: ["Taller Ergonomía e Ingeniería de Métodos", "Modelos Estocásticos"], desbloquea: ["Taller Diseño Plantas"] },
  "Taller Metodología Investigación": { semestre: 7, creditos: 3, prerequisitos: ["Taller de Invención y Creatividad", "Inferencia Estadística Fundamental"] },

  "Logística": { semestre: 8, creditos: 3, prerequisitos: ["Taller Simulación Procesos"] },
  "Gestión Tecnológica": { semestre: 8, creditos: 3, prerequisitos: ["Sistemas de Información"] },
  "Gerencia de Recursos Humanos": { semestre: 8, creditos: 3, prerequisitos: ["Seguridad Industrial"] },
  "Taller Diseño Plantas": { semestre: 8, creditos: 4, prerequisitos: ["Taller Ingeniería de Producción", "Seguridad Industrial", "Sistemas de Información"] },
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

/* ---------- Normalizar 'desbloquea' hacia prerequisitos (inverso) ---------- */
for (const [origen, datos] of Object.entries(ramos)) {
  if (!Array.isArray(datos.desbloquea)) continue;
  datos.desbloquea.forEach(dest => {
    if (!ramos[dest]) return;
    if (!Array.isArray(ramos[dest].prerequisitos)) ramos[dest].prerequisitos = [];
    if (!ramos[dest].prerequisitos.includes(origen)) ramos[dest].prerequisitos.push(origen);
  });
}

/* ---------- Estado guardado ---------- */
let estado = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");

/* helpers */
function slugify(text){ return String(text).normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-zA-Z0-9]+/g,"-").replace(/^-+|-+$/g,"").toLowerCase(); }
function isAprobada(nombre){ const v = parseFloat(estado[nombre]); return !isNaN(v) && v >= 3.0; }
function pendientes(nombre){ return (ramos[nombre].prerequisitos || []).filter(p => !isAprobada(p)); }

/* ---------- Render (columnas por semestre) ---------- */
function renderMalla(){
  const cont = document.getElementById("malla-container");
  cont.innerHTML = "";
  // agrupar por semestre
  const sems = {};
  for (const [nombre, datos] of Object.entries(ramos)){
    const s = datos.semestre || 1;
    if (!sems[s]) sems[s] = [];
    sems[s].push({ nombre, ...datos });
  }
  // ordenar semestres
  const keys = Object.keys(sems).map(k => parseInt(k)).sort((a,b)=>a-b);

  keys.forEach(snum => {
    const col = document.createElement("div");
    col.className = `semestre sem${snum}`;
    // titulo
    const title = document.createElement("div");
    title.className = "sem-title";
    title.textContent = `Semestre ${snum}`;
    col.appendChild(title);

    // contenedor de materias (vertical)
    const matCont = document.createElement("div");
    matCont.className = "materias";

    sems[snum].forEach(m => {
      const tar = document.createElement("div");
      tar.className = "materia";
      tar.id = slugify(m.nombre);

      // contenido: nombre, creditos, input nota
      tar.innerHTML = `
        <div>
          <div class="nombre">${m.nombre}</div>
          <div class="creditos">${m.creditos} créditos</div>
        </div>
        <div>
          <input class="nota" type="number" step="0.1" min="1.0" max="5.0" placeholder="Nota">
        </div>
      `;

      // poner valor guardado si existe
      const input = tar.querySelector(".nota");
      if (estado[m.nombre] != null && estado[m.nombre] !== "") {
        input.value = parseFloat(estado[m.nombre]).toFixed(1);
      }

      // si hay prereqs y no aprobada => bloquear y tooltip
      const faltan = pendientes(m.nombre);
      if (faltan.length > 0 && !isAprobada(m.nombre)) {
        tar.classList.add("bloqueada");
        tar.setAttribute("data-tooltip", "Faltan: " + faltan.join(", "));
        input.disabled = true;
      }

      // evento input
      input.addEventListener("input", (e) => {
        const raw = e.target.value.trim();
        if (raw === "") {
          delete estado[m.nombre];
        } else {
          let val = parseFloat(raw);
          if (isNaN(val)) { delete estado[m.nombre]; }
          else {
            if (val < 1) val = 1.0;
            if (val > 5) val = 5.0;
            val = parseFloat(val.toFixed(1));
            estado[m.nombre] = val;
            e.target.value = val.toFixed(1);
          }
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(estado));
        actualizarBloqueosYResumen();
      });

      matCont.appendChild(tar);
    });

    col.appendChild(matCont);
    cont.appendChild(col);
  });

  actualizarBloqueosYResumen();
}

/* ---------- Actualizar bloqueos según estado y recalcular resumen ---------- */
function actualizarBloqueosYResumen(){
  // actualizar bloqueos
  for (const nombre of Object.keys(ramos)) {
    const id = slugify(nombre);
    const tarjeta = document.getElementById(id);
    if (!tarjeta) continue;
    const input = tarjeta.querySelector(".nota");
    const faltan = pendientes(nombre);
    const aprob = isAprobada(nombre);

    if (faltan.length > 0 && !aprob) {
      tarjeta.classList.add("bloqueada");
      tarjeta.setAttribute("data-tooltip", "Faltan: " + faltan.join(", "));
      input.disabled = true;
    } else {
      tarjeta.classList.remove("bloqueada");
      tarjeta.removeAttribute("data-tooltip");
      input.disabled = false;
    }

    // marcar aprobado visualmente (line-through or opacity change)
    if (aprob) {
      tarjeta.classList.add("aprobada");
    } else {
      tarjeta.classList.remove("aprobada");
    }
  }

  // calcular promedios y creditos
  calcularResumen();
}

/* ---------- Calcular P.A.P.P.I. (promedio simple) y P.A.P.A. (ponderado), créditos y avance ---------- */
function calcularResumen(){
  const TOTAL_CREDITOS = 168;
  let creditosAprobados = 0;
  let sumaNotas = 0, cuentaNotas = 0;
  let sumaPonderada = 0, sumaCredPonderar = 0;

  for (const [nombre, datos] of Object.entries(ramos)) {
    const raw = estado[nombre];
    if (raw == null || raw === "") continue;
    const nota = parseFloat(raw);
    if (isNaN(nota)) continue;

    // P.A.P.P.I. (promedio simple de notas ingresadas)
    sumaNotas += nota;
    cuentaNotas += 1;

    // P.A.P.A. ponderado por creditos (excluye creditos 0)
    const c = datos.creditos || 0;
    if (c > 0) {
      sumaPonderada += nota * c;
      sumaCredPonderar += c;
    }

    // créditos aprobados (nota >= 3.0)
    if (nota >= 3.0) {
      creditosAprobados += (datos.creditos || 0);
    }
  }

  const pappi = cuentaNotas ? (sumaNotas / cuentaNotas) : 0;
  const papa = sumaCredPonderar ? (sumaPonderada / sumaCredPonderar) : 0;
  const avance = (creditosAprobados / TOTAL_CREDITOS) * 100;

  document.getElementById("pappi").textContent = isNaN(pappi) ? "0.0" : pappi.toFixed(1);
  document.getElementById("papa").textContent = isNaN(papa) ? "0.0" : papa.toFixed(1);
  document.getElementById("creditosCompletados").textContent = creditosAprobados;
  document.getElementById("porcentajeAvance").textContent = isNaN(avance) ? "0.0" : avance.toFixed(1);

  // mostrar u ocultar panel final según scroll (comprobación inicial)
  checkMostrarPanelFinal();
}

/* ---------- Reiniciar progreso ---------- */
function reiniciarProgreso(){
  if (!confirm("¿Deseas reiniciar todo el progreso?")) return;
  estado = {};
  localStorage.removeItem(STORAGE_KEY);
  renderMalla();
  window.scrollTo({ top: 0, behavior: 'instant' });
}

/* ---------- Mostrar panel inferior solo al llegar al final ---------- */
function checkMostrarPanelFinal(){
  const panel = document.getElementById("panel-final");
  const threshold = 6; // px tolerancia
  const atBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - threshold);
  if (atBottom) {
    panel.style.display = "block";
    panel.setAttribute("aria-hidden", "false");
  } else {
    panel.style.display = "none";
    panel.setAttribute("aria-hidden", "true");
  }
}

/* listeners */
window.addEventListener("scroll", checkMostrarPanelFinal);
window.addEventListener("resize", checkMostrarPanelFinal);

/* boton reiniciar */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("botonReiniciar").addEventListener("click", reiniciarProgreso);
  renderMalla();
});
