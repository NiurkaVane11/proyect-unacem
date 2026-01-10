/*
   ARCHIVO: heatmap.js - MAPA DE CALOR MEJORADO CON COLORES VIBRANTES
*/

document.addEventListener('DOMContentLoaded', function() {
    
    const canvas = document.getElementById('heatmap-canvas');
    if (!canvas) {
        console.warn('Canvas heatmap-canvas no encontrado');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    let heatmapData = [];
    let currentRadius = 25;
    let currentIntensity = 5;
    
    // ========== AJUSTAR TAMAÑO DEL CANVAS ==========
    function resizeCanvas() {
        const container = canvas.parentElement;
        canvas.width = container.clientWidth - 48;
        canvas.height = 450;
        redrawHeatmap();
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // ========== CONTROLES ==========
    const intensitySlider = document.getElementById('heatmap-intensity');
    const radiusSlider = document.getElementById('heatmap-radius');
    const intensityValue = document.getElementById('intensity-value');
    const radiusValue = document.getElementById('radius-value');
    
    if (intensitySlider && intensityValue) {
        intensitySlider.addEventListener('input', (e) => {
            currentIntensity = parseFloat(e.target.value);
            intensityValue.textContent = e.target.value;
            redrawHeatmap();
        });
    }
    
    if (radiusSlider && radiusValue) {
        radiusSlider.addEventListener('input', (e) => {
            currentRadius = parseFloat(e.target.value);
            radiusValue.textContent = e.target.value + 'px';
            redrawHeatmap();
        });
    }
    
    // ========== GENERAR DATOS ALEATORIOS ==========
    const generateBtn = document.getElementById('generate-heatmap');
    if (generateBtn) {
        generateBtn.addEventListener('click', () => {
            heatmapData = [];
            const numPoints = 40 + Math.floor(Math.random() * 60);
            
            for (let i = 0; i < numPoints; i++) {
                heatmapData.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    intensity: 3 + Math.random() * 7 // Mayor intensidad base
                });
            }
            
            redrawHeatmap();
            updateStats();
        });
    }
    
    // ========== LIMPIAR MAPA ==========
    const clearBtn = document.getElementById('clear-heatmap');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            heatmapData = [];
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            resetStats();
        });
    }
    
    // ========== AGREGAR PUNTOS CON CLIC ==========
    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        heatmapData.push({
            x: x,
            y: y,
            intensity: currentIntensity
        });
        
        redrawHeatmap();
        updateStats();
    });
    
    // ========== DIBUJAR MAPA DE CALOR MEJORADO ==========
    function redrawHeatmap() {
        // Limpiar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Crear un canvas temporal para el efecto de calor
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext('2d');
        
        // Dibujar cada punto con gradiente radial
        heatmapData.forEach(point => {
            const gradient = tempCtx.createRadialGradient(
                point.x, point.y, 0,
                point.x, point.y, currentRadius
            );
            
            // Gradiente de blanco (centro caliente) a transparente
            const alpha = Math.min(point.intensity / 10, 1);
            gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
            gradient.addColorStop(0.4, `rgba(255, 255, 255, ${alpha * 0.6})`);
            gradient.addColorStop(0.7, `rgba(255, 255, 255, ${alpha * 0.3})`);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            tempCtx.fillStyle = gradient;
            tempCtx.fillRect(0, 0, canvas.width, canvas.height);
        });
        
        // Obtener los datos de imagen
        const imageData = tempCtx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // Aplicar mapa de colores vibrante
        for (let i = 0; i < data.length; i += 4) {
            const alpha = data[i + 3] / 255; // Normalizar alpha
            
            if (alpha > 0) {
                // Mapa de colores: azul -> cyan -> verde -> amarillo -> naranja -> rojo
                let r, g, b;
                
                if (alpha < 0.2) {
                    // Azul oscuro
                    r = 0;
                    g = 0;
                    b = 255 * (alpha / 0.2);
                } else if (alpha < 0.4) {
                    // Azul a Cyan
                    const t = (alpha - 0.2) / 0.2;
                    r = 0;
                    g = 255 * t;
                    b = 255;
                } else if (alpha < 0.6) {
                    // Cyan a Verde
                    const t = (alpha - 0.4) / 0.2;
                    r = 0;
                    g = 255;
                    b = 255 * (1 - t);
                } else if (alpha < 0.75) {
                    // Verde a Amarillo
                    const t = (alpha - 0.6) / 0.15;
                    r = 255 * t;
                    g = 255;
                    b = 0;
                } else if (alpha < 0.9) {
                    // Amarillo a Naranja
                    const t = (alpha - 0.75) / 0.15;
                    r = 255;
                    g = 255 * (1 - t * 0.5);
                    b = 0;
                } else {
                    // Naranja a Rojo
                    const t = (alpha - 0.9) / 0.1;
                    r = 255;
                    g = 127 * (1 - t);
                    b = 0;
                }
                
                data[i] = r;
                data[i + 1] = g;
                data[i + 2] = b;
                data[i + 3] = Math.min(255, alpha * 255 * 1.5); // Mayor opacidad
            }
        }
        
        // Dibujar el resultado final
        ctx.putImageData(imageData, 0, 0);
    }
    
    // ========== ACTUALIZAR ESTADÍSTICAS ==========
    function updateStats() {
        if (heatmapData.length === 0) {
            resetStats();
            return;
        }
        
        const intensities = heatmapData.map(p => p.intensity);
        const max = Math.max(...intensities);
        const min = Math.min(...intensities);
        const avg = intensities.reduce((a, b) => a + b, 0) / intensities.length;
        
        const maxTemp = document.getElementById('max-temp');
        const minTemp = document.getElementById('min-temp');
        const avgTemp = document.getElementById('avg-temp');
        const dataPoints = document.getElementById('data-points');
        
        if (maxTemp) maxTemp.textContent = max.toFixed(1);
        if (minTemp) minTemp.textContent = min.toFixed(1);
        if (avgTemp) avgTemp.textContent = avg.toFixed(1);
        if (dataPoints) dataPoints.textContent = heatmapData.length;
    }
    
    // ========== RESETEAR ESTADÍSTICAS ==========
    function resetStats() {
        const maxTemp = document.getElementById('max-temp');
        const minTemp = document.getElementById('min-temp');
        const avgTemp = document.getElementById('avg-temp');
        const dataPoints = document.getElementById('data-points');
        
        if (maxTemp) maxTemp.textContent = '--';
        if (minTemp) minTemp.textContent = '--';
        if (avgTemp) avgTemp.textContent = '--';
        if (dataPoints) dataPoints.textContent = '--';
    }
    
    // ========== GENERAR DATOS INICIALES ==========
    if (generateBtn) {
        generateBtn.click();
    }
    
});