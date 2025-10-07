// script.js - malla con prerrequisitos, tooltips y panel final que aparece solo al llegar al bottom

const STORAGE_KEY = "malla_progreso_v1";

/* ---------- RAMOS (tal como los diste) ---------- */
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

/* ---------- Normalizar 'desbloquea' hacia prerequisitos inversos ---------- */
for (const [origen, d] of Object.entries(ramos)) {
  if (!Array.isArray(d.desbloquea)) continue;
  d.desbloquea.forEach(dest => {
    if (!ramos[dest]) return;
    if (!Array.isArray(ramos[dest].prerequisitos)) ramos[dest].prerequisitos = [];
    if (!ramos[dest].prerequisitos.includes(origen)) ramos[dest].prerequisitos.push(origen);
  });
}

/* ---------- Estado (localStorage) ---------- */
let progreso = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");

/* util: slugify para ids seguros */
function slugify(text) {
  return String(text).normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-zA-Z0-9]+/g,"-").replace(/^-+|-+$/g,"").toLowerCase();
}

/* comprueba si todos los prerequisitos de 'nombre' están aprobados (nota >= 3) */
function prereqsCumplen(nombre) {
  const prereqs = ramos[nombre].prerequisitos || [];
  if (prereqs.length === 0) return true;
  return prereqs.every(p => {
    const val = parseFloat(progreso[p]);
    return !isNaN(val) && val >= 3.0;
  });
}

/* devuelve lista de prerequisitos pendientes */
function prereqsPendientes(nombre) {
  const prereqs = ramos[nombre].prerequisitos || [];
  return prereqs.filter(p => {
    const val = parseFloat(progreso[p]);
    return isNaN(val) || val < 3.0;
  });
}

/* ---------- Renderizar malla (filas por semestre) ---------- */
function crearMalla() {
  const cont = document.getElementById("malla");
  cont.innerHTML = "";

  // agrupar por semestre
  const semestres = {};
  for (const [nombre, datos] of Object.entries(ramos)) {
    const s = datos.semestre || 1;
    if (!semestres[s]) semestres[s] = [];
    semestres[s].push({ nombre, ...datos });
  }

  // orden por semestre 1..10
  const keys = Object.keys(semestres).map(x => parseInt(x)).sort((a,b) => a-b);

  keys.forEach(num => {
    const fila = document.createElement("div");
    fila.className = `fila-semestre sem${num}`;

    // título arriba (colorará por CSS .semX .sem-title)
    const title = document.createElement("div");
    title.className = "sem-title";
    title.textContent = `Semestre ${num}`;
    fila.appendChild(title);

    // row de materias
    const row = document.createElement("div");
    row.className = "materias-row";

    // cada materia
    semestres[num].forEach(m => {
      const id = slugify(m.nombre);
      const tarjeta = document.createElement("div");
      tarjeta.className = "materia";
      tarjeta.id = id;

      // contenido
      tarjeta.innerHTML = `
        <div>
          <div class="titulo">${m.nombre}</div>
          <div class="creditos">${m.creditos} créditos</div>
        </div>
        <div>
          <input type="number" class="nota" min="1" max="5" step="0.1" placeholder="Ingresa nota">
        </div>
      `;

      // setear valor si hay en progreso
      const input = tarjeta.querySelector(".nota");
      if (progreso[m.nombre] != null && progreso[m.nombre] !== "") {
        input.value = parseFloat(progreso[m.nombre]).toFixed(1);
      }

      // bloquear si prereqs no cumplidos y no está aprobado
      const pendientes = prereqsPendientes(m.nombre);
      const aprob = (() => {
        const v = parseFloat(progreso[m.nombre]);
        return !isNaN(v) && v >= 3.0;
      })();

      if (pendientes.length > 0 && !aprob) {
        tarjeta.classList.add("bloqueada");
        tarjeta.setAttribute("data-tooltip", "Faltan aprobar: " + pendientes.join(", "));
        input.disabled = true;
      }

      // añadir al row
      row.appendChild(tarjeta);

      // listener para input
      input.addEventListener("input", (e) => {
        const raw = e.target.value.trim();
        const v = raw === "" ? null : parseFloat(raw);
        if (v === null || isNaN(v)) {
          delete progreso[m.nombre];
        } else {
          // validar y guardar con 1 decimal
          let val = v;
          if (val < 1) val = 1.0;
          if (val > 5) val = 5.0;
          val = parseFloat(val.toFixed(1));
          progreso[m.nombre] = val;
          e.target.value = val.toFixed(1);
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progreso));
        actualizarBloqueosYContadores();
      });
    });

    // aplicar clase semX al contenedor para colores
    fila.classList.add(`sem${num}`);

    fila.appendChild(row);
    cont.appendChild(fila);
  });

  // inicial update
  actualizarBloqueosYContadores();
}

/* actualizar bloqueos de todas las materias y tooltips */
function actualizarBloqueosYContadores() {
  // actualizar bloqueos
  for (const [nombre, datos] of Object.entries(ramos)) {
    const id = slugify(nombre);
    const tarjeta = document.getElementById(id);
    if (!tarjeta) continue;
    const input = tarjeta.querySelector(".nota");
    const pendientes = prereqsPendientes(nombre);
    const aprob = (() => {
      const v = parseFloat(progreso[nombre]);
      return !isNaN(v) && v >= 3.0;
    })();

    if (pendientes.length > 0 && !aprob) {
      tarjeta.classList.add("bloqueada");
      tarjeta.setAttribute("data-tooltip", "Faltan aprobar: " + pendientes.join(", "));
      input.disabled = true;
    } else {
      tarjeta.classList.remove("bloqueada");
      tarjeta.removeAttribute("data-tooltip");
      input.disabled = false;
    }
  }

  // calcular contadores y promedios
  calcularResumen();
}

/* calcular P.A.P.P.I. y P.A.P.A., créditos completados y porcentaje */
function calcularResumen() {
  const CREDITOS_TOTALES = 168;
  let creditosAprobados = 0;
  let sumaPonderada = 0;
  let sumaCredNotas = 0;
  let sumaNotas = 0;
  let countNotas = 0;

  for (const [nombre, datos] of Object.entries(ramos)) {
    const notaRaw = progreso[nombre];
    if (notaRaw == null || notaRaw === "") continue;
    const nota = parseFloat(notaRaw);
    if (isNaN(nota)) continue;

    // si la materia tiene créditos (Matemáticas Basicas tiene 0) se considera en ponderado
    const c = datos.creditos || 0;

    // sumar para P.A.P.A. (ponderado)
    sumaPonderada += nota * c;
    sumaCredNotas += c;

    // P.A.P.P.I. = promedio simple de todas las notas ingresadas (no ponderado)
    sumaNotas += nota;
    countNotas += 1;

    // créditos aprobados (nota >= 3.0) - excluir "Matemáticas Basicas" si tiene creditos 0
    if (nota >= 3.0) {
      creditosAprobados += c;
    }
  }

  const pappi = countNotas ? (sumaNotas / countNotas) : 0;
  const papa = (sumaCredNotas > 0) ? (sumaPonderada / sumaCredNotas) : 0;

  // actualizar UI (1 decimal)
  document.getElementById("pappi").textContent = pappi ? pappi.toFixed(1) : "0.0";
  document.getElementById("papa").textContent = papa ? papa.toFixed(1) : "0.0";

  document.getElementById("creditosCompletados").textContent = creditosAprobados;
  const porcentaje = ((creditosAprobados / CREDITOS_TOTALES) * 100);
  document.getElementById("porcentajeAvance").textContent = isNaN(porcentaje) ? "0.0" : porcentaje.toFixed(1);
}

/* reiniciar progreso */
function reiniciarProgreso() {
  if (!confirm("¿Deseas reiniciar todo el progreso?")) return;
  progreso = {};
  localStorage.removeItem(STORAGE_KEY);
  crearMalla();
  // scroll up para ver inicio
  window.scrollTo({ top: 0, behavior: 'instant' });
}

/* mostrar panel solo al llegar al final del scroll */
function checkMostrarPanelFinal() {
  const panel = document.getElementById("panel-final");
  const threshold = 12; // px de tolerancia
  if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - threshold)) {
    // al final: mostrar
    panel.style.display = "block";
    panel.setAttribute("aria-hidden","false");
  } else {
    panel.style.display = "none";
    panel.setAttribute("aria-hidden","true");
  }
}

/* listeners globales */
window.addEventListener("scroll", checkMostrarPanelFinal);
window.addEventListener("resize", checkMostrarPanelFinal);

/* init */
document.getElementById("btnReiniciar").addEventListener("click", reiniciarProgreso);
crearMalla();
checkMostrarPanelFinal();
