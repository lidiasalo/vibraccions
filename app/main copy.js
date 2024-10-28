const canvas = document.getElementById("waveCanvas");
const ctx = canvas.getContext("2d");

// Ajustar el ancho y aumentar la altura del canvas
canvas.width = canvas.offsetWidth;
canvas.height = 350; // Aumentar la altura a 350px

// Configuración inicial
const baseY = canvas.height * 0.9; // Posición Y ajustada al tamaño dinámico del canvas
const waveWidth = canvas.width / 200;  // Ancho de cada onda en función del tamaño
const spacing = canvas.width / 100;    // Espaciado entre ondas
const startX = canvas.width * 0.05;   // Posición inicial en X

const wavesPerGroup = 6; // Cantidad de ondas por grupo
const numGroups = 12; // Cantidad de grupos

// Relación de tamaños entre bloques (el primer bloque será el más alto y decrecerá hacia el último)
const sizeRatios = [4, 3.5, 3, 2.75, 3.25, 2, 1, 2.75, 1.5, 1, 0.75, 0.25]; // Tamaño descendente de cada grupo de izquierda a derecha

// Colores degradados que me proporcionaste
const gradientColors = [
    "#8bac7e", "#60b6a1", "#ca985d", "#bb4f5d", "#b04576", "#9b4f80"
];

let time = 0; // Variable de tiempo para controlar el movimiento

// Crear un degradado de color para el canvas
function createGradient() {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0); // Degradado horizontal a lo largo del canvas

    // Añadir los colores proporcionados al degradado
    gradient.addColorStop(0, gradientColors[0]);
    gradient.addColorStop(0.2, gradientColors[1]);
    gradient.addColorStop(0.4, gradientColors[2]);
    gradient.addColorStop(0.6, gradientColors[3]);
    gradient.addColorStop(0.8, gradientColors[4]);
    gradient.addColorStop(1, gradientColors[5]);

    return gradient;
}

// Función para calcular la altura de una onda en un grupo con movimiento ondulante
function calculateWaveHeight(indexInGroup, maxHeight, minHeight, group) {
    const waveSpeed = 0.01; // Controlar la velocidad del movimiento
    const amplitude = (maxHeight - minHeight) / 2; // La amplitud es la mitad de la diferencia entre max y min

    // Aplicar un movimiento ondulante utilizando Math.sin
    return minHeight + amplitude + amplitude * Math.sin(time + indexInGroup + group * waveSpeed);
}

// Función para dibujar y animar las ondas
function drawWaves() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas en cada cuadro
    ctx.lineCap = "round";  // Puntas redondeadas de las ondas
    const gradient = createGradient(); // Crear degradado para cada cuadro

    for (let group = 0; group < numGroups; group++) {
        const sizeMultiplier = sizeRatios[group]; // Multiplicador de tamaño para el grupo actual
        const maxHeight = canvas.height * 0.2 * sizeMultiplier; // Altura máxima ajustada para encajar en el canvas
        const minHeight = canvas.height * 0.05 * sizeMultiplier; // Altura mínima ajustada para encajar en el canvas

        for (let i = 0; i < wavesPerGroup; i++) {
            const heightFactor = calculateWaveHeight(i, maxHeight, minHeight, group); // Altura de la onda dentro del grupo
            const x = startX + (group * wavesPerGroup + i) * spacing; // Posición X para cada onda

            // Dibujar cada barra/onda
            ctx.beginPath();
            ctx.moveTo(x, baseY);               // Inicio en la base Y
            ctx.lineTo(x, baseY - heightFactor); // Subir para crear la altura de la onda
            ctx.lineWidth = waveWidth;          // Grosor de la onda
            ctx.strokeStyle = gradient;         // Aplicar el degradado a cada onda
            ctx.stroke();
        }
    }

    time += 0.03; // Incrementar el tiempo para controlar la velocidad del movimiento

    requestAnimationFrame(drawWaves); // Solicitar el siguiente cuadro para la animación
}

// Iniciar la animación
drawWaves();
