/*
   ARCHIVO: heatmap.js
   Funcionalidad de Mapas de Calor para LifeGuard UNACEM
*/

document.addEventListener('DOMContentLoaded', function() {
    
    // Referencias al DOM
    const canvas = document.getElementById('heatmap-canvas');
    if (!canvas) return; // Si no estamos en la vista, salir
    
    const ctx = canvas.getContext('2d');
    const container = canvas.parentElement;
    
    // Estado del heatmap
    let points = [];
    let config = {
        radius: 25,
        maxIntensity: 10,
        blur: 15,
        gradient: {
            0.2: 'blue',
            0.4: 'cyan',
            0.6: 'lime',
            0.8: 'yellow',
            1.0: 'red'
        }
    };

    // ========== 1. AJUSTAR TAMAÑO DEL CANVAS ==========
    function resizeCanvas() {
        if (!container) return;
        canvas.width = container.clientWidth;
        canvas.height = 400; // Altura fija o dinámica
        draw();
    }
    
    window.addEventListener('resize', resizeCanvas);
    // Inicializar tamaño
    setTimeout(resizeCanvas, 100); 
    
    // ========== 2. CONTROLES ==========
    const intensitySlider = document.getElementById('heatmap-intensity');
    const radiusSlider = document.getElementById('heatmap-radius');
    const intensityValue = document.getElementById('intensity-value');
    const radiusValue = document.getElementById('radius-value');
    
    if (intensitySlider) {
        intensitySlider.addEventListener('input', (e) => {
            // Ajustamos la intensidad global simulando mayor "peso" en cada punto
            config.maxIntensity = 15 - parseInt(e.target.value); 
            if (intensityValue) intensityValue.textContent = e.target.value;
            draw();
        });
    }
    
    if (radiusSlider) {
        radiusSlider.addEventListener('input', (e) => {
            config.radius = parseInt(e.target.value);
            if (radiusValue) radiusValue.textContent = e.target.value + 'px';
            draw();
        });
    }
    
    // ========== 3. GENERAR DATOS (SIMULACIÓN INDUSTRIAL) ==========
    const generateBtn = document.getElementById('generate-heatmap');
    if (generateBtn) {
        generateBtn.addEventListener('click', () => {
            generateIndustrialData();
        });
    }
    
    function generateIndustrialData() {
        points = [];
        const numCentros = 3 + Math.floor(Math.random() * 3); // 3 a 5 áreas críticas
        
        for (let c = 0; c < numCentros; c++) {
            // Centro del foco de riesgo
            const centerX = Math.random() * canvas.width;
            const centerY = Math.random() * canvas.height;
            const numPointsInCluster = 20 + Math.floor(Math.random() * 30);
            
            // Dispersión alrededor del centro (Cluster)
            for (let i = 0; i < numPointsInCluster; i++) {
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 60; // Radio de dispersión
                
                points.push({
                    x: centerX + Math.cos(angle) * distance,
                    y: centerY + Math.sin(angle) * distance,
                    value: Math.random() // Intensidad individual 0-1
                });
            }
        }
        
        draw();
        updateStats();
    }
    
    // ========== 4. LIMPIAR MAPA ==========
    const clearBtn = document.getElementById('clear-heatmap');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            points = [];
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            resetStats();
        });
    }
    
    // ========== 5. INTERACCIÓN (CLICK PARA AGREGAR RIESGO) ==========
    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Agregar un clúster pequeño al hacer clic
        for(let i=0; i<5; i++) {
            points.push({
                x: x + (Math.random() * 20 - 10),
                y: y + (Math.random() * 20 - 10),
                value: Math.random()
            });
        }
        
        draw();
        updateStats();
    });
    
    // ========== 6. MOTOR DE DIBUJO ==========
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (points.length === 0) return;

        // 1. Dibujar sombras (puntos negros con transparencia)
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext('2d');
        
        points.forEach(point => {
            tempCtx.beginPath();
            const alpha = 1 / config.maxIntensity; 
            tempCtx.globalAlpha = alpha;
            // Gradiente radial para cada punto
            const gradient = tempCtx.createRadialGradient(point.x, point.y, 0, point.x, point.y, config.radius);
            gradient.addColorStop(0, 'rgba(0,0,0,1)');
            gradient.addColorStop(1, 'rgba(0,0,0,0)');
            
            tempCtx.fillStyle = gradient;
            tempCtx.arc(point.x, point.y, config.radius, 0, Math.PI * 2);
            tempCtx.fill();
        });
        
        // 2. Colorear basado en la opacidad acumulada
        const imageData = tempCtx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const colorGradient = createColorGradient();
        
        for (let i = 0; i < data.length; i += 4) {
            const alpha = data[i + 3]; // Canal Alpha es la "temperatura"
            if (alpha > 0) {
                const colorIndex = alpha * 4; // Mapear 0-255 a índice del gradiente
                
                // Asignar color RGB del gradiente
                data[i] = colorGradient[colorIndex];     // R
                data[i + 1] = colorGradient[colorIndex + 1]; // G
                data[i + 2] = colorGradient[colorIndex + 2]; // B
                // Mantener alpha pero suavizado
                data[i + 3] = alpha < 255 ? alpha * 1.5 : 255; 
            }
        }
        
        ctx.putImageData(imageData, 0, 0);
    }
    
    // Crear paleta lineal de colores (1px width canvas)
    function createColorGradient() {
        const canvasGradient = document.createElement('canvas');
        const ctxGradient = canvasGradient.getContext('2d');
        canvasGradient.width = 256;
        canvasGradient.height = 1;
        
        const grad = ctxGradient.createLinearGradient(0, 0, 256, 1);
        for (const pos in config.gradient) {
            grad.addColorStop(parseFloat(pos), config.gradient[pos]);
        }
        
        ctxGradient.fillStyle = grad;
        ctxGradient.fillRect(0, 0, 256, 1);
        
        return ctxGradient.getImageData(0, 0, 256, 1).data;
    }
    
    // ========== 7. ESTADÍSTICAS ==========
    function updateStats() {
        if (points.length === 0) {
            resetStats();
            return;
        }
        
        // Simulación de métricas basadas en densidad
        const density = points.length;
        // Asumiendo que el "calor" máximo depende de la superposición, 
        // simplificamos para la demo:
        const max = Math.min(100, (density / 5) + Math.random() * 10);
        const min = Math.max(10, Math.random() * 20);
        const avg = (max + min) / 2;
        
        setText('max-temp', max.toFixed(1) + '°');
        setText('min-temp', min.toFixed(1) + '°');
        setText('avg-temp', avg.toFixed(1) + '°');
        setText('data-points', density);
    }
    
    function resetStats() {
        setText('max-temp', '--');
        setText('min-temp', '--');
        setText('avg-temp', '--');
        setText('data-points', '0');
    }
    
    function setText(id, val) {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
    }
    
    // Generar datos iniciales al cargar
    setTimeout(generateIndustrialData, 500);
});