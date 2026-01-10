/*
   ARCHIVO: heatmap.js
   MAPA DE CALOR DIGITAL TWIN - ANIMADO Y CONTEXTUAL
*/

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. CONFIGURACIÓN INICIAL
    const canvas = document.getElementById('heatmap-canvas');
    if (!canvas) {
        console.warn('Canvas heatmap-canvas no encontrado');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    const container = canvas.parentElement;
    
    // Elemento para el Tooltip (creado dinámicamente si no existe)
    let tooltip = document.getElementById('heatmap-tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'heatmap-tooltip';
        tooltip.className = 'heatmap-tooltip'; // Asegúrate de tener el CSS correspondiente
        document.body.appendChild(tooltip); // Lo agregamos al body para mejor posicionamiento absoluto
    }

    // Estado del Sistema
    let points = [];
    let isAnimating = true;
    let animationFrameId;
    
    // Configuración Visual
    let config = {
        radius: 35, // Radio base
        blur: 15,
        baseIntensity: 0.6
    };

    // Zonas Industriales (Coordenadas relativas 0.0 - 1.0)
    const zones = [
        { id: 'horno', name: 'Horno Rotatorio', x: 0.7, y: 0.3, risk: 'Alta Temperatura' },
        { id: 'molienda', name: 'Molino de Bolas', x: 0.25, y: 0.65, risk: 'Vibración Excesiva' },
        { id: 'chancadora', name: 'Chancadora 1', x: 0.8, y: 0.7, risk: 'Emisión de Polvo' },
        { id: 'despacho', name: 'Zona de Carga', x: 0.2, y: 0.2, risk: 'Tráfico Vehicular' }
    ];

    // ========== 2. AJUSTE DE TAMAÑO ==========
    function resizeCanvas() {
        canvas.width = container.clientWidth;
        canvas.height = 500; // Altura fija para mantener proporción del mapa de fondo
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // ========== 3. CONTROLES DE UI ==========
    const intensitySlider = document.getElementById('heatmap-intensity');
    const radiusSlider = document.getElementById('heatmap-radius');
    const intensityValue = document.getElementById('intensity-value');
    const radiusValue = document.getElementById('radius-value');

    if (intensitySlider) {
        intensitySlider.addEventListener('input', (e) => {
            config.baseIntensity = parseFloat(e.target.value) / 10; // Normalizar 0-1
            if(intensityValue) intensityValue.textContent = e.target.value;
        });
    }

    if (radiusSlider) {
        radiusSlider.addEventListener('input', (e) => {
            config.radius = parseInt(e.target.value);
            if(radiusValue) radiusValue.textContent = e.target.value + 'px';
        });
    }

    // ========== 4. MOTOR DE DIBUJO (ANIMADO) ==========
    function draw() {
        // Limpiar canvas manteniendo transparencia para ver el fondo CSS
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Usar composición 'lighter' o 'screen' para lograr colores vibrantes al superponerse
        ctx.globalCompositeOperation = 'lighter';

        points.forEach(point => {
            // Animación de respiración: variamos el radio levemente con el tiempo
            const time = Date.now() / 1000;
            const pulse = Math.sin(time * 2 + point.offset) * 0.1 + 1; // +/- 10%
            const currentRadius = config.radius * point.intensity * pulse;

            if (currentRadius <= 0) return;

            const gradient = ctx.createRadialGradient(
                point.x, point.y, 0,
                point.x, point.y, currentRadius
            );

            // Gradiente térmico: Centro blanco/amarillo -> borde rojo/transparente
            // Esto replica el efecto "vibrante" sin iterar píxeles a mano
            const alpha = Math.min(1, point.intensity * config.baseIntensity);
            
            gradient.addColorStop(0, `rgba(255, 255, 200, ${alpha})`);   // Núcleo caliente
            gradient.addColorStop(0.4, `rgba(255, 100, 0, ${alpha * 0.8})`); // Naranja
            gradient.addColorStop(0.8, `rgba(200, 0, 0, ${alpha * 0.4})`);   // Rojo
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(point.x, point.y, currentRadius, 0, Math.PI * 2);
            ctx.fill();
        });

        // Restaurar operación por defecto para otros dibujos si los hubiera
        ctx.globalCompositeOperation = 'source-over';

        if (isAnimating) {
            animationFrameId = requestAnimationFrame(draw);
        }
    }

    // ========== 5. SIMULACIÓN DE ESCENARIOS (DIGITAL TWIN) ==========
    const generateBtn = document.getElementById('generate-heatmap');
    // Buscamos el selector de área si existe, sino usamos default
    const areaSelect = document.querySelector('.form-select') || { value: 'Horno' };

    if (generateBtn) {
        generateBtn.addEventListener('click', () => {
            // Seleccionar zona basada en el dropdown o aleatoria
            const selectedText = areaSelect.value || '';
            let targetZone = zones.find(z => selectedText.includes(z.name.split(' ')[0])) || zones[Math.floor(Math.random() * zones.length)];
            
            loadScenario(targetZone);
        });
    }

    function loadScenario(zone) {
        points = [];
        
        // 1. Crear Cluster Principal (Falla Detectada)
        const centerX = zone.x * canvas.width;
        const centerY = zone.y * canvas.height;
        const numPoints = 25;

        for (let i = 0; i < numPoints; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * 40; // Dispersión
            
            points.push({
                x: centerX + Math.cos(angle) * dist,
                y: centerY + Math.sin(angle) * dist,
                intensity: 0.5 + Math.random() * 0.5, // Intensidad variable
                offset: Math.random() * Math.PI, // Fase de animación dispar
                zoneData: zone // Referencia para el tooltip
            });
        }

        // 2. Ruido de fondo (Otras áreas con actividad normal)
        zones.forEach(z => {
            if (z !== zone && Math.random() > 0.6) {
                points.push({
                    x: z.x * canvas.width,
                    y: z.y * canvas.height,
                    intensity: 0.3,
                    offset: Math.random(),
                    zoneData: { ...z, risk: 'Operación Normal' }
                });
            }
        });

        updateStats();
        if (!isAnimating) {
            isAnimating = true;
            draw();
        }
    }

    // ========== 6. INTERACCIÓN Y TOOLTIPS ==========
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Buscar si el mouse está cerca de algún punto caliente
        // Usamos una búsqueda simple de distancia
        let hit = null;
        for (let p of points) {
            const dist = Math.hypot(p.x - mouseX, p.y - mouseY);
            if (dist < 30) { // Radio de detección
                hit = p;
                break;
            }
        }

        if (hit && hit.zoneData) {
            tooltip.style.display = 'block';
            tooltip.style.left = (e.pageX + 15) + 'px'; // Coordenadas de página para tooltip fixed/absolute
            tooltip.style.top = (e.pageY + 15) + 'px';
            
            // Contenido del Tooltip
            const probability = Math.round(hit.intensity * 100);
            const colorStatus = probability > 70 ? '#ff4757' : '#ffa502';
            
            tooltip.innerHTML = `
                <div style="font-weight:bold; border-bottom:1px solid rgba(255,255,255,0.2); margin-bottom:4px;">
                   📍 ${hit.zoneData.name}
                </div>
                <div>Riesgo: ${hit.zoneData.risk}</div>
                <div>Probabilidad: <span style="color:${colorStatus}; font-weight:bold;">${probability}%</span></div>
            `;
        } else {
            tooltip.style.display = 'none';
        }
    });

    canvas.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
    });

    // Clic para agregar punto manual (Feature original preservada)
    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        points.push({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            intensity: 0.8,
            offset: Math.random(),
            zoneData: { name: 'Punto Manual', risk: 'Reporte de Usuario' }
        });
        updateStats();
    });

    // Limpiar
    const clearBtn = document.getElementById('clear-heatmap');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            points = [];
            updateStats();
        });
    }

    // ========== 7. ESTADÍSTICAS ==========
    function updateStats() {
        const dataPoints = document.getElementById('data-points');
        const maxTemp = document.getElementById('max-temp');
        
        if (dataPoints) dataPoints.textContent = points.length;
        // Simular temperatura basada en densidad
        if (maxTemp) {
            const temp = points.length > 0 ? (35 + points.length * 0.5).toFixed(1) : '--';
            maxTemp.textContent = temp + '°C';
        }
    }

    // Iniciar loop de animación
    draw();
    
    // Cargar un escenario inicial para que no se vea vacío
    setTimeout(() => {
        loadScenario(zones[0]); // Cargar zona Horno por defecto
    }, 500);
});