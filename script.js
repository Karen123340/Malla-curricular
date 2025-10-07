/* script.js mejorado
   - Tooltip dinámico: muestra los prerrequisitos pendientes al pasar el mouse.
   - Todo lo demás igual a la versión anterior.
*/

const STORAGE_KEY = "malla_estado_v2";

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

/* Agregar desbloquea -> prerequisitos inversos */
for (const [origen, datos] of Object.entries(ramos)) {
  if (!Array.isArray(datos.desbloquea)) continue;
  for (const dest of datos.desbloquea) {
    if (!ramos[dest]) continue;
    if (!Array.isArray(ramos[dest].prerequisitos)) ramos[dest].prerequisitos = [];
    if (!ramos[dest].prerequisitos.includes(origen)) ramos[dest].prerequisitos.push(origen);
  }
}

const estadoGuardado = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
const nameToId = {}, idToName = {};
const slugify = t => t.normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-zA-Z0-9]+/g,"-").replace(/^-+|-+$/g,"").toLowerCase();

function prerequisitosCumplidos(nombre){
  const prereqs = ramos[nombre].prerequisitos || [];
  return prereqs.every(p => estadoGuardado[p] && estadoGuardado[p].aprobado);
}

function prerequisitosPendientes(nombre){
  const prereqs = ramos[nombre].prerequisitos || [];
  return prereqs.filter(p => !(estadoGuardado[p] && estadoGuardado[p].aprobado));
}

function crearContenedoresSemestre(){
  const malla = document.getElementById("malla-container");
  for (let i=1;i<=10;i++){
    const div = document.createElement("div");
    div.className = `semestre sem${i}`;
    div.innerHTML = `<h2>${i}° Semestre</h2><div class="contenedor-semestre"></div>`;
    malla.appendChild(div);
  }
}

function crearCaja(nombre, datos){
  const id = slugify(nombre);
  nameToId[nombre] = id; idToName[id] = nombre;
  const cont = document.querySelector(`.sem${datos.semestre} .contenedor-semestre`);
  const div = document.createElement("div");
  div.className = "ramo"; div.id = id;
  const saved = estadoGuardado[nombre] || { nota:null, aprobado:false };

  div.innerHTML = `
    <strong>${nombre}</strong>
    <div style="font-size:0.9em;color:#555;margin-top:6px">${datos.creditos} créditos</div>
    <input type="number" class="nota" min="1" max="5" step="0.1" placeholder="" value="${saved.nota ?? ""}">
  `;
  cont.appendChild(div);

  const input = div.querySelector(".nota");
  const ok = prerequisitosCumplidos(nombre);

  if (!ok && !saved.aprobado){
    div.classList.add("bloqueado");
    input.disabled = true;
  }

  // Tooltip dinámico al pasar
  div.addEventListener("mouseenter", ()=>{
    const faltan = prerequisitosPendientes(nombre);
    if (!faltan.length) { div.removeAttribute("title"); return; }
    div.title = "Faltan aprobar: " + faltan.join(", ");
  });

  input.addEventListener("input", e=>{
    const val = parseFloat(e.target.value);
    if (!estadoGuardado[nombre]) estadoGuardado[nombre]={nota:null,aprobado:false};
    if (isNaN(val)){ estadoGuardado[nombre].nota=null; estadoGuardado[nombre].aprobado=false; }
    else {
      estadoGuardado[nombre].nota = parseFloat(val.toFixed(1));
      estadoGuardado[nombre].aprobado = val>=3.0;
    }
    guardarEstado();
    actualizarBloqueos();
    actualizarContadores();
  });
}

function actualizarBloqueos(){
  for (const nombre in ramos){
    const id = nameToId[nombre];
    const div = document.getElementById(id);
    const input = div.querySelector(".nota");
    const saved = estadoGuardado[nombre]||{nota:null,aprobado:false};
    const ok = prerequisitosCumplidos(nombre);

    if (saved.aprobado){div.classList.remove("bloqueado"); input.disabled=false; continue;}
    if (ok){div.classList.remove("bloqueado"); input.disabled=false;}
    else{div.classList.add("bloqueado"); input.disabled=true;}
  }
}

function actualizarContadores(){
  let suma=0, total=0, aprob=0;
  for (const [n,d] of Object.entries(ramos)){
    const e=estadoGuardado[n]; if(!e||e.nota==null) continue;
    const c=d.creditos||0;
    suma+=e.nota*c; total+=c; if(e.aprobado) aprob+=c;
  }
  document.getElementById("papa").textContent = total? (suma/total).toFixed(1):"0.0";
  document.getElementById("pappi").textContent = total? (suma/total).toFixed(1):"0.0";
  document.getElementById("creditosCompletados").textContent = aprob;
  document.getElementById("porcentajeAvance").textContent = ((aprob/168)*100).toFixed(1);
}

function guardarEstado(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(estadoGuardado)); }

function reiniciar(){
  if(confirm("¿Reiniciar progreso?")){ localStorage.removeItem(STORAGE_KEY); location.reload(); }
}

window.addEventListener("DOMContentLoaded", ()=>{
  crearContenedoresSemestre();
  for(const [n,d] of Object.entries(ramos)) crearCaja(n,d);
  actualizarBloqueos();
  actualizarContadores();
  document.getElementById("botonReiniciar").addEventListener("click",reiniciar);
});
