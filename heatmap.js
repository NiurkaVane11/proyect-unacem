/*
   ARCHIVO: heatmap.js - MÓDULO DE MAPA DE CALOR
*/

// ========== INICIALIZACIÓN DEL MAPA DE CALOR ==========
document.addEventListener('DOMContentLoaded', function() {
    
    // Configuración del mapa de calor
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
        canvas.width = container.clientWidth - 64;
        canvas.height = 400;
        redrawHeatmap();
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // ========== CONTROLES DE INTENSIDAD Y RADIO ==========
    const intensitySlider = document.getElementById('heatmap-intensity');
    const radiusSlider = document.getElementById('heatmap-radius');
    const intensityValue = document.getElementById('intensity-value');
    const radiusValue = document.getElementById('radius-value');
    
    if (intensitySlider && intensityValue) {
        intensitySlider.addEventListener('input', (e) => {
            currentIntensity = e.target.value;
            intensityValue.textContent = e.target.value;
        });
    }
    
    if (radiusSlider && radiusValue) {
        radiusSlider.addEventListener('input', (e) => {
            currentRadius = e.target.value;
            radiusValue.textContent = e.target.value + 'px';
        });
    }
    
    // ========== GENERAR DATOS ALEATORIOS ==========
    const generateBtn = document.getElementById('generate-heatmap');
    if (generateBtn) {
        generateBtn.addEventListener('click', () => {
            heatmapData = [];
            const numPoints = 30 + Math.floor(Math.random() * 50);
            
            for (let i = 0; i < numPoints; i++) {
                heatmapData.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    intensity: Math.random() * currentIntensity
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
    
    // ========== DIBUJAR MAPA DE CALOR ==========
    function redrawHeatmap() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Crear gradient para cada punto
        heatmapData.forEach(point => {
            const gradient = ctx.createRadialGradient(
                point.x, point.y, 0,
                point.x, point.y, currentRadius
            );
            
            const alpha = point.intensity / 10;
            gradient.addColorStop(0, `rgba(255, 0, 0, ${alpha})`);
            gradient.addColorStop(0.3, `rgba(255, 165, 0, ${alpha * 0.7})`);
            gradient.addColorStop(0.6, `rgba(255, 255, 0, ${alpha * 0.4})`);
            gradient.addColorStop(1, `rgba(0, 255, 0, 0)`);
            
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        });
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
    
}); // FIN DOMContentLoaded