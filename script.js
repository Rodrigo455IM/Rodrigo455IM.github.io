const habilidades = [
    {
        titulo: "Programación y Desarrollo",
        descripcion: "Desarrollo de aplicaciones y lógica computacional utilizando diferentes lenguajes y tecnologías web.",
        items: ["C y C++", "HTML, CSS y JavaScript", "Python", "Fundamentos web"]
    },
    {
        titulo: "Sistemas Embebidos",
        descripcion: "Integración de hardware y software para proyectos electrónicos en diversos proyectos y practicas.",
        items: ["Arduino", "ESP32", "VHDL", "Microcontroladores PIC"]
    },
    {
        titulo: "Electrónica y Simulación",
        descripcion: "Diseño y simulación de circuitos electrónicos, con enfoque en el análisis y graficación de respuestas digitales.",
        items: ["Multisim", "LabVIEW", "MATLAB"]
    },
    {
        titulo: "Diseño Digital",
        descripcion: "Creación y edicción de contenido visual y multimedia.",
        items: ["Photoshop", "After Effects", "Blender", "Audacity"]
    },
    {
        titulo: "Machine Learning",
        descripcion: "Modelos básicos de inteligencia artificial y análisis de datos.",
        items: ["Regresión lineal", "Regresión logística", "Clasificación multiclase", "Redes neuronales", "K-Means", "SVM"]
    }
];

const contenedor = document.getElementById("contenedor-habilidades");
let inicio = 0;
let animando = false;

function crearTarjeta(habilidad) {
    return `
        <article class="bloque-habilidad">
            <h3>${habilidad.titulo}</h3>
            <p>${habilidad.descripcion}</p>
            <ul>
                ${habilidad.items.map(item => `<li>${item}</li>`).join("")}
            </ul>
        </article>
    `;
}

function renderInicial() {
    contenedor.innerHTML = "";

    for (let i = 0; i < 3; i++) {
        const indice = (inicio + i) % habilidades.length;
        contenedor.innerHTML += crearTarjeta(habilidades[indice]);
    }
}

function moverDerecha() {
    if (animando) return;
    animando = true;

    const nuevoIndice = (inicio + 3) % habilidades.length;
    contenedor.innerHTML += crearTarjeta(habilidades[nuevoIndice]);

    contenedor.style.transition = "transform 0.6s ease";
    contenedor.style.transform = "translateX(calc(-33.333% - 12px))";

    setTimeout(() => {
        inicio = (inicio + 1) % habilidades.length;
        contenedor.removeChild(contenedor.firstElementChild);

        contenedor.style.transition = "none";
        contenedor.style.transform = "translateX(0)";

        animando = false;
    }, 600);
}

function moverIzquierda() {
    if (animando) return;
    animando = true;

    inicio = (inicio - 1 + habilidades.length) % habilidades.length;
    contenedor.innerHTML = crearTarjeta(habilidades[inicio]) + contenedor.innerHTML;

    contenedor.style.transition = "none";
    contenedor.style.transform = "translateX(calc(-33.333% - 12px))";

    requestAnimationFrame(() => {
        contenedor.style.transition = "transform 0.6s ease";
        contenedor.style.transform = "translateX(0)";
    });

    setTimeout(() => {
        contenedor.removeChild(contenedor.lastElementChild);
        animando = false;
    }, 600);
}

document.getElementById("btn-derecha").addEventListener("click", moverDerecha);
document.getElementById("btn-izquierda").addEventListener("click", moverIzquierda);

renderInicial();

const formulario = document.getElementById("formulario-contacto");

formulario.addEventListener("submit", function (evento) {

    evento.preventDefault();

    alert("Mensaje enviado correctamente");

    formulario.reset();

});

/* =========================
   MODO OSCURO / CLARO
========================= */

const botonModo = document.getElementById("modo-btn");

/* Cargar preferencia guardada */
if (localStorage.getItem("tema") === "claro") {
    document.body.classList.add("modo-claro");
    botonModo.textContent = "☀️";
} else {
    botonModo.textContent = "🌙";
}

/* Cambiar tema al hacer clic */
botonModo.addEventListener("click", () => {

    document.body.classList.toggle("modo-claro");

    if (document.body.classList.contains("modo-claro")) {
        botonModo.textContent = "☀️";
        localStorage.setItem("tema", "claro");
    } else {
        botonModo.textContent = "🌙";
        localStorage.setItem("tema", "oscuro");
    }

});

/* =========================
   MENÚ HAMBURGUESA
========================= */

const botonMenu = document.getElementById("menu-toggle");
const menuNav = document.getElementById("menu-nav");

botonMenu.addEventListener("click", () => {

    menuNav.classList.toggle("activo");

    if (menuNav.classList.contains("activo")) {
        botonMenu.textContent = "✕";
    } else {
        botonMenu.textContent = "☰";
    }

});

/* =========================
   EFECTO ESTELA DEL MOUSE
========================= */

document.addEventListener("mousemove", (e) => {

    const particula = document.createElement("div");

    particula.classList.add("estela");

    particula.style.left = e.pageX + "px";
    particula.style.top = e.pageY + "px";

    document.body.appendChild(particula);

    setTimeout(() => {
        particula.remove();
    }, 600);

});