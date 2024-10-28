// Código para el primer canvas (waveCanvas1)
const canvas1 = document.getElementById("waveCanvas1");
const ctx1 = canvas1.getContext("2d");

// Código para el segundo canvas (waveCanvas2)
const canvas2 = document.getElementById("waveCanvas2");
const ctx2 = canvas2.getContext("2d");

// Ajusta ambos canvas, usando la misma lógica para dibujar las ondas
function setupCanvas(canvas, ctx, isReflectedHorizontally = false, isReflectedVertically = false) {
    canvas.width = canvas.offsetWidth;
    canvas.height = 350; // Altura del canvas

    const baseY = canvas.height * 0.9;
    const waveWidth = canvas.width / 200;
    const spacing = canvas.width / 100;
    const startX = canvas.width * 0.05;
    const wavesPerGroup = 6;
    const numGroups = 12;

    const sizeRatios = [4, 3.5, 3, 2.75, 3.25, 2, 1, 2.75, 1.5, 1, 0.75, 0.25];
    const gradientColors = [
        "#8bac7e", "#60b6a1", "#ca985d", "#bb4f5d", "#b04576", "#9b4f80"
    ];

    let time = 0;

    // Crear un degradado de color para el canvas
    function createGradient() {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, gradientColors[0]);
        gradient.addColorStop(0.2, gradientColors[1]);
        gradient.addColorStop(0.4, gradientColors[2]);
        gradient.addColorStop(0.6, gradientColors[3]);
        gradient.addColorStop(0.8, gradientColors[4]);
        gradient.addColorStop(1, gradientColors[5]);
        return gradient;
    }

    function calculateWaveHeight(indexInGroup, maxHeight, minHeight, group) {
        const waveSpeed = 0.01;
        const amplitude = (maxHeight - minHeight) / 2;
        return minHeight + amplitude + amplitude * Math.sin(time + indexInGroup + group * waveSpeed);
    }

    function drawWaves() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.lineCap = "round";
        const gradient = createGradient();

        // Aplicar transformaciones de reflejo si es necesario
        if (isReflectedHorizontally || isReflectedVertically) {
            ctx.save(); // Guardar el estado antes de reflejar

            // Reflejar horizontalmente
            if (isReflectedHorizontally) {
                ctx.translate(canvas.width, 0);
                ctx.scale(-1, 1);
            }

            // Reflejar verticalmente
            if (isReflectedVertically) {
                ctx.translate(0, canvas.height);
                ctx.scale(1, -1);
            }
        }

        for (let group = 0; group < numGroups; group++) {
            const sizeMultiplier = sizeRatios[group];
            const maxHeight = canvas.height * 0.2 * sizeMultiplier;
            const minHeight = canvas.height * 0.05 * sizeMultiplier;

            for (let i = 0; i < wavesPerGroup; i++) {
                const heightFactor = calculateWaveHeight(i, maxHeight, minHeight, group);
                const x = startX + (group * wavesPerGroup + i) * spacing;

                ctx.beginPath();
                ctx.moveTo(x, baseY);
                ctx.lineTo(x, baseY - heightFactor);
                ctx.lineWidth = waveWidth;
                ctx.strokeStyle = gradient;
                ctx.stroke();
            }
        }

        time += 0.03;

        // Restaurar el contexto si se aplicaron transformaciones
        if (isReflectedHorizontally || isReflectedVertically) {
            ctx.restore(); // Restaurar el estado después de reflejar
        }

        requestAnimationFrame(drawWaves);
    }

    drawWaves();
}

// Configurar el primer canvas normalmente
setupCanvas(canvas1, ctx1);

// Configurar el segundo canvas reflejado horizontal y verticalmente
setupCanvas(canvas2, ctx2, true, true); // Reflejado en ambas direcciones
