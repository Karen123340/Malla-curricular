// Simulación de los ramos y sus créditos
const ramos = {
  "Cálculo Diferencial": { creditos: 4, semestre: 1 },
  "Sociología especial: industrial y del trabajo": { creditos: 3, semestre: 1 },
  "Introducción a la Ingeniería Industrial": { creditos: 2, semestre: 1 },
  "Programación de Computadores": { creditos: 3, semestre: 1 },
  "Cálculo Integral": { creditos: 4, semestre: 2 },
  "Álgebra Lineal": { creditos: 3, semestre: 2 },
  "Taller de Invención y Creatividad": { creditos: 2, semestre: 2 },
  "Programación Orientada a Objetos": { creditos: 3, semestre: 2 },
  "Probabilidad Fundamental": { creditos: 3, semestre: 3 },
  "Ecuaciones Diferenciales": { creditos: 4, semestre: 3 },
  "Fundamentos de Electricidad y Magnetismo": { creditos: 3, semestre: 3 },
  "Fundamentos de Mecánica": { creditos: 3, semestre: 3 },
  "Matematicas Basicas": { creditos: 3, semestre: 1 },
  "Trabajo de grado": { creditos: 10, semestre: 10 }
};

// Recupera el progreso guardado (si existe)
const estadoRamos = JSON.parse(localStorage.getItem("estadoRamos")) || {};

// Clasifica el tipo de asignatura
function tipoAsignatura(nombre) {
  if (nombre.includes("Taller")) return "trabajo";
  if (nombre.includes("Libre")) return "libre";
  if (nombre.includes("Cálculo") || nombre.includes("Matem")) return "fundacion";
  return "disciplinar";
}

// Crea las columnas por semestre
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

// Crea cada materia
function crearCaja(nombre, datos) {
  const div = document.createElement("div");
  const tipo = tipoAsignatura(nombre);
  div.className = `ramo ${tipo}`;
  div.id = nombre;
  const notaGuardada = estadoRamos[nombre]?.nota || "";

  div.innerHTML = `
    <strong>${nombre}</strong><br>
    <span>${datos.creditos} créditos</span><br>
    <label for="nota${nombre}">Nota (1–5):</label>
    <input type="number" id="nota${nombre}" class="nota" min="1" max="5" step="0.1" value="${notaGuardada}" placeholder="Ej: 3.5">
  `;

  const container = document.querySelector(`#semestre${datos.semestre} .contenedor-semestre`);
  if (container) container.appendChild(div);

  const inputNota = div.querySelector("input");
  inputNota.addEventListener("input", () => {
    estadoRamos[nombre] = { nota: inputNota.value };
    localStorage.setItem("estadoRamos", JSON.stringify(estadoRamos));
    calcularPromedios();
  });
}

// Calcula P.A.P.A., P.A.P.P.I. y créditos aprobados
function calcularPromedios() {
  let totalCreditos = 0;
  let sumaPonderada = 0;
  let creditosAprobados = 0;

  const notas = document.querySelectorAll(".nota");

  notas.forEach(input => {
    const nota = parseFloat(input.value);
    const ramo = input.closest(".ramo");
    const nombre = ramo.querySelector("strong").textContent;
    const creditos = ramos[nombre]?.creditos || 0;

    if (!isNaN(nota) && nota >= 1 && nota <= 5) {
      totalCreditos += creditos;
      sumaPonderada += nota * creditos;

      if (nota >= 3.0) {
        ramo.classList.add("aprobado");
        ramo.classList.remove("reprobado");
        creditosAprobados += creditos;
      } else {
        ramo.classList.add("reprobado");
        ramo.classList.remove("aprobado");
      }
    } else {
      ramo.classList.remove("aprobado", "reprobado");
    }
  });

  const promedio = totalCreditos > 0 ? (sumaPonderada / totalCreditos).toFixed(1) : "0.0";
  const porcentaje = ((creditosAprobados / 168) * 100).toFixed(1);

  document.getElementById("papa").textContent = `P.A.P.A.: ${promedio}`;
  document.getElementById("pappi").textContent = `P.A.P.P.I.: ${promedio}`;
  document.getElementById("creditosCompletados").textContent = creditosAprobados;
  document.getElementById("porcentajeAvance").textContent = porcentaje;
}

// Botón de reinicio total
function reiniciarProgreso() {
  if (confirm("¿Deseas reiniciar todo tu progreso?")) {
    localStorage.clear();
    document.querySelectorAll(".nota").forEach(n => (n.value = ""));
    document.querySelectorAll(".ramo").forEach(r => r.classList.remove("aprobado", "reprobado"));
    calcularPromedios();
  }
}

// Inicialización
window.onload = () => {
  crearContenedoresSemestre();
  Object.entries(ramos).forEach(([nombre, datos]) => crearCaja(nombre, datos));
  document.getElementById("botonReiniciar").addEventListener("click", reiniciarProgreso);
  calcularPromedios();
};
