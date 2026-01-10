/*
   ARCHIVO: heatmap-table.js
   MAPA DE CALOR EN FORMATO TABLA
*/

document.addEventListener('DOMContentLoaded', function() {
    
    // Verificar que estamos en la sección correcta
    const heatmapSection = document.getElementById('section-mapas-calor');
    if (!heatmapSection) {
        console.warn('Sección de mapas de calor no encontrada');
        return;
    }

    // Áreas de la planta
    const areas = [
        '🔥 Horno Rotatorio',
        '⚙️ Molino de Bolas',
        '🪨 Chancadora Primaria',
        '🚛 Zona de Carga',
        '🏗️ Cantera',
        '📦 Almacén de Cemento',
        '⚡ Subestación Eléctrica',
        '🔧 Mantenimiento'
    ];

    // Elementos del DOM
    const tbody = document.getElementById('tableBody');
    const tooltip = document.getElementById('heatmap-tooltip');
    const refreshBtn = document.getElementById('refresh-heatmap');

    /**
     * Determina la clase de intensidad según el valor
     */
    function getIntensityClass(value) {
        if (value === 0) return 'intensity-0';
        if (value <= 2) return 'intensity-1';
        if (value <= 4) return 'intensity-3';
        if (value <= 6) return 'intensity-5';
        if (value <= 8) return 'intensity-7';
        if (value <= 10) return 'intensity-9';
        if (value <= 12) return 'intensity-11';
        return 'intensity-14';
    }

    /**
     * Genera los datos de la tabla
     */
    function generateHeatmapData() {
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        let totalIncidents = 0;
        let maxValue = 0;
        let maxArea = '';
        let hourlyTotals = new Array(12).fill(0);

        // Generar fila para cada área
        areas.forEach(area => {
            const row = document.createElement('tr');
            
            // Celda de área (primera columna)
            const labelCell = document.createElement('td');
            labelCell.className = 'area-label';
            labelCell.textContent = area;
            row.appendChild(labelCell);

            // Generar 12 columnas (una por cada 2 horas)
            for (let i = 0; i < 12; i++) {
                // Generar valor aleatorio (0-14)
                const value = Math.floor(Math.random() * 15);
                
                const cell = document.createElement('td');
                const heatCell = document.createElement('div');
                heatCell.className = `heat-cell ${getIntensityClass(value)}`;
                heatCell.textContent = value;
                
                // Guardar datos en el elemento para el tooltip
                heatCell.dataset.area = area;
                heatCell.dataset.time = `${String(i*2).padStart(2,'0')}:00 - ${String(i*2+2).padStart(2,'0')}:00`;
                heatCell.dataset.value = value;
                
                // Eventos de mouse
                heatCell.addEventListener('mouseenter', showTooltip);
                heatCell.addEventListener('mouseleave', hideTooltip);
                
                cell.appendChild(heatCell);
                row.appendChild(cell);
                
                // Acumular estadísticas
                totalIncidents += value;
                hourlyTotals[i] += value;
                
                if (value > maxValue) {
                    maxValue = value;
                    maxArea = area;
                }
            }
            
            tbody.appendChild(row);
        });

        // Actualizar estadísticas
        updateStatistics(totalIncidents, maxArea, hourlyTotals);
    }

    /**
     * Actualiza las tarjetas de estadísticas
     */
    function updateStatistics(total, criticalArea, hourlyTotals) {
        const totalEl = document.getElementById('totalIncidents');
        const areaEl = document.getElementById('criticalArea');
        const timeEl = document.getElementById('criticalTime');
        const avgEl = document.getElementById('avgIncidents');

        if (totalEl) totalEl.textContent = total;
        
        if (areaEl) {
            // Extraer solo el nombre sin emoji
            const areaName = criticalArea.split(' ').slice(1).join(' ');
            areaEl.textContent = areaName || criticalArea;
        }
        
        if (timeEl) {
            const maxHourIndex = hourlyTotals.indexOf(Math.max(...hourlyTotals));
            timeEl.textContent = `${String(maxHourIndex*2).padStart(2,'0')}:00h`;
        }
        
        if (avgEl) {
            avgEl.textContent = Math.round(total / areas.length);
        }
    }

    /**
     * Muestra el tooltip al pasar el mouse
     */
    function showTooltip(e) {
        if (!tooltip) return;
        
        const rect = e.target.getBoundingClientRect();
        const area = e.target.dataset.area;
        const time = e.target.dataset.time;
        const value = e.target.dataset.value;
        
        tooltip.innerHTML = `
            <strong>${area}</strong><br>
            Horario: ${time}<br>
            Incidentes: ${value}
        `;
        
        tooltip.style.display = 'block';
        tooltip.style.left = (rect.left + rect.width / 2) + 'px';
        tooltip.style.top = (rect.top - 70) + 'px';
        tooltip.style.transform = 'translateX(-50%)';
    }

    /**
     * Oculta el tooltip
     */
    function hideTooltip() {
        if (tooltip) {
            tooltip.style.display = 'none';
        }
    }

    /**
     * Evento del botón Actualizar
     */
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            generateHeatmapData();
            
            // Feedback visual
            refreshBtn.textContent = '⏳ Actualizando...';
            setTimeout(() => {
                refreshBtn.textContent = '🔄 Actualizar Datos';
            }, 500);
        });
    }

    // Generar datos iniciales
    generateHeatmapData();
    
    console.log('✅ Mapa de calor tipo tabla inicializado correctamente');
});