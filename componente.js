/*
   ARCHIVO: componente.js
   Renderizado de componentes UI para LifeGuard UNACEM
*/

const Components = {
    // 1. Renderizar Tarjetas Superiores (KPIs)
    renderMetrics: function(data) {
        const container = document.getElementById('metricsContainer');
        if (!container) return;

        container.innerHTML = `
            <div class="metric-card danger">
                <div class="metric-label">Áreas Críticas</div>
                <div class="metric-value" style="color: #e74c3c;">${data.proyectosRiesgoAlto}</div>
                <div class="metric-sublabel">Requieren intervención</div>
            </div>
            <div class="metric-card warning">
                <div class="metric-label">Índice de Riesgo (IA)</div>
                <div class="metric-value" style="color: #f39c12;">${data.indiceRiesgoGeneral}/100</div>
                <div class="metric-sublabel">Nivel Medio-Bajo</div>
            </div>
            <div class="metric-card success">
                <div class="metric-label">Accidentes Prevenidos</div>
                <div class="metric-value" style="color: #27ae60;">${data.accidentesPrevenidos}</div>
                <div class="metric-sublabel">Detectados por IVLs</div>
            </div>
        `;
    },

    // 2. Renderizar Medidor de Riesgo (Gauge)
    renderGauge: function(data) {
        const container = document.getElementById('gaugeContainer');
        if (!container) return;

        const riesgoLabel = data.probabilidad < 30 ? 'RIESGO CONTROLADO' : 
                           data.probabilidad < 70 ? 'ALERTA PREVENTIVA' : 'PELIGRO INMINENTE';
        
        const color = data.probabilidad < 30 ? '#27ae60' : 
                     data.probabilidad < 70 ? '#f39c12' : '#e74c3c';
        
        container.innerHTML = `
            <div class="gauge-container">
                <div class="gauge" style="background: conic-gradient(from 0deg, #27ae60 0deg 108deg, #f39c12 108deg 252deg, #e74c3c 252deg 360deg);">
                    <div class="gauge-inner">
                        <div class="gauge-value" style="color: ${color};">${data.probabilidad}%</div>
                        <div class="gauge-label" style="font-size: 10px;">${riesgoLabel}</div>
                    </div>
                </div>
            </div>
            <div class="critical-factor" style="margin-top: 15px;">
                <strong>⚠️ Factor Crítico:</strong> ${data.factorCritico}
            </div>
        `;
        
        // Renderizar acciones preventivas basadas en el riesgo
        this.renderAcciones(data.probabilidad);
    },

    // 3. Renderizar Lista de Acciones Preventivas
    renderAcciones: function(probabilidad) {
        const container = document.getElementById('accionesList');
        const badge = document.getElementById('badgeUrgencia');
        const intro = document.getElementById('prevencionIntro');
        
        if (!container) return;

        let acciones = [];
        if (probabilidad > 60) {
            badge.textContent = "URGENCIA ALTA";
            badge.style.background = "#e74c3c";
            acciones = [
                { icon: "🛑", titulo: "Detener trabajos en altura (Área Molienda)", desc: "Riesgo de caída detectado por falta de IVLs.", prioridad: "alta", plazo: "Inmediato" },
                { icon: "👷", titulo: "Desplegar supervisión reforzada", desc: "Enviar 2 prevencionistas a Cantera.", prioridad: "alta", plazo: "1 hora" }
            ];
        } else if (probabilidad > 30) {
            badge.textContent = "ALERTA MEDIA";
            badge.style.background = "#f39c12";
            acciones = [
                { icon: "📝", titulo: "Incrementar Inspecciones (IVLs)", desc: "Realizar 5 IVLs adicionales en turno tarde.", prioridad: "media", plazo: "Hoy" },
                { icon: "📢", titulo: "Charla de 5 minutos: Manos Seguras", desc: "Reforzar procedimiento de bloqueo LOTOTO.", prioridad: "media", plazo: "Hoy" }
            ];
        } else {
            badge.textContent = "NORMAL";
            badge.style.background = "#27ae60";
            acciones = [
                { icon: "✅", titulo: "Mantener monitoreo estándar", desc: "Sin desviaciones críticas reportadas.", prioridad: "baja", plazo: "Rutina" }
            ];
        }

        let html = '';
        acciones.forEach(acc => {
            const colorClase = acc.prioridad === 'alta' ? '#e74c3c' : acc.prioridad === 'media' ? '#f39c12' : '#27ae60';
            html += `
                <div class="accion">
                    <div class="accion-icono">${acc.icon}</div>
                    <div class="accion-contenido">
                        <h4>${acc.titulo}</h4>
                        <p>${acc.desc}</p>
                        <div class="accion-meta">
                            <span class="plazo">⏱️ ${acc.plazo}</span>
                            <span class="prioridad" style="color: ${colorClase}">Prioridad ${acc.prioridad.toUpperCase()}</span>
                        </div>
                    </div>
                </div>
            `;
        });
        container.innerHTML = html;
    },

    // 4. Renderizar Tabla de Áreas/Proyectos
    renderProjectsTable: function(proyectos, filter = 'todos') {
        const container = document.getElementById('projectsTable');
        if (!container) return;
        
        let filteredProyectos = proyectos;
        if (filter !== 'todos') {
            filteredProyectos = proyectos.filter(p => p.riesgo === filter);
        }
        
        const getTendenciaIcon = (tendencia) => {
            if (tendencia === 'up') return '<span style="color:#e74c3c">↗️ Aumentando</span>';
            if (tendencia === 'down') return '<span style="color:#27ae60">↘️ Disminuyendo</span>';
            return '<span style="color:#7f8c8d">→ Estable</span>';
        };
        
        const getRiskBadge = (riesgo) => {
            if (riesgo === 'alto') return '<span class="risk-badge risk-high">🔴 CRÍTICO</span>';
            if (riesgo === 'medio') return '<span class="risk-badge risk-medium">🟡 ALERTA</span>';
            return '<span class="risk-badge risk-low">🟢 NORMAL</span>';
        };
        
        let html = `
            <thead>
                <tr>
                    <th>Área Operativa</th>
                    <th>Ubicación</th>
                    <th>Nivel de Riesgo</th>
                    <th>Tendencia (IF)</th>
                </tr>
            </thead>
            <tbody>
        `;
        
        if (filteredProyectos.length === 0) {
            html += `<tr><td colspan="4" style="text-align:center; padding: 20px;">No hay áreas en esta categoría.</td></tr>`;
        } else {
            filteredProyectos.forEach(p => {
                html += `
                    <tr>
                        <td><strong>${p.nombre}</strong></td>
                        <td>${p.ubicacion}</td>
                        <td>${getRiskBadge(p.riesgo)}</td>
                        <td>${getTendenciaIcon(p.tendencia)}</td>
                    </tr>
                `;
            });
        }
        
        html += `</tbody>`;
        container.innerHTML = html;
    },

    // 5. Renderizar Factores de Riesgo
    renderRiskFactors: function(factores) {
        const container = document.getElementById('riskFactorsContainer');
        if (!container) return;
        
        let html = '';
        factores.forEach((factor, idx) => {
            const colorBarra = factor.porcentaje > 70 ? '#e74c3c' : '#f39c12';
            html += `
                <div class="factor-item">
                    <div style="flex:1">
                        <strong>${idx + 1}. ${factor.titulo}</strong>
                        <div style="font-size: 12px; color: #666; margin-top: 5px;">${factor.descripcion}</div>
                    </div>
                    <div style="min-width: 120px; text-align: right;">
                        <div class="factor-bar">
                            <div class="factor-fill" style="width: ${factor.porcentaje}%; background-color: ${colorBarra}"></div>
                        </div>
                        <div style="font-size: 12px; color: #666; margin-top: 5px;">Probabilidad: <strong>${factor.porcentaje}%</strong></div>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
    },

    // 6. Renderizar Historial
    renderHistoryTable: function(historico) {
        const container = document.getElementById('historyTable');
        if (!container) return;
        
        const getRiskBadge = (prediccion) => {
            if (prediccion < 30) return '<span class="risk-badge risk-low">' + prediccion + '%</span>';
            if (prediccion < 70) return '<span class="risk-badge risk-medium">' + prediccion + '%</span>';
            return '<span class="risk-badge risk-high">' + prediccion + '%</span>';
        };
        
        let html = `
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Predicción de Riesgo</th>
                    <th>Accidentes Reales</th>
                    <th>Precisión del Modelo</th>
                </tr>
            </thead>
            <tbody>
        `;
        
        historico.forEach(h => {
            html += `
                <tr>
                    <td>${h.fecha}</td>
                    <td>${getRiskBadge(h.prediccion)}</td>
                    <td>${h.accidentes}</td>
                    <td>✅ ${h.precision}%</td>
                </tr>
            `;
        });
        
        html += `</tbody>`;
        container.innerHTML = html;
    },

    // 7. Renderizar Estadísticas Anuales (Tabla Completa)
    renderEstadisticas: function(year = 2025) {
        const container = document.getElementById('estadisticasTableContainer');
        if (!container) return;
        
        // Verificar si existen datos para el año solicitado
        if (!appData.estadisticasHistoricas || !appData.estadisticasHistoricas[year]) {
            container.innerHTML = `<div style="padding:20px; text-align:center;">No hay datos disponibles para el año ${year}</div>`;
            return;
        }
        
        const data = appData.estadisticasHistoricas[year];
        
        let html = `
            <div class="table-responsive">
                <table class="stats-table">
                    <thead>
                        <tr>
                            <th>Mes</th>
                            <th>Eventos Sin Lesión</th>
                            <th>1ros Auxilios</th>
                            <th>Atención Médica</th>
                            <th>Acc. Incapac.</th>
                            <th>Acc. Mortal</th>
                            <th>Días Perdidos</th>
                            <th>HHTT</th>
                            <th>IF</th>
                            <th>IS</th>
                            <th>IA</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        data.forEach(row => {
            // Resaltar valores altos de IF
            const ifClass = row.IF > 10 ? 'text-danger' : row.IF > 5 ? 'text-warning' : '';
            
            html += `
                <tr>
                    <td style="text-align:left; font-weight:bold;">${row.mes}</td>
                    <td>${row.eventosSinLesion}</td>
                    <td>${row.primerosAuxilios}</td>
                    <td>${row.atencionMedica}</td>
                    <td>${row.accidenteIncapacitante}</td>
                    <td>${row.accidenteMortal}</td>
                    <td>${row.diasPerdidos}</td>
                    <td>${row.hhtt.toLocaleString()}</td>
                    <td class="${ifClass}">${row.IF.toFixed(2)}</td>
                    <td>${row.IS.toFixed(2)}</td>
                    <td>${row.IA.toFixed(2)}</td>
                </tr>
            `;
        });
        
        // Calcular totales anuales
        const totales = {
            eventosSinLesion: data.reduce((sum, r) => sum + r.eventosSinLesion, 0),
            primerosAuxilios: data.reduce((sum, r) => sum + r.primerosAuxilios, 0),
            atencionMedica: data.reduce((sum, r) => sum + r.atencionMedica, 0),
            accidenteIncapacitante: data.reduce((sum, r) => sum + r.accidenteIncapacitante, 0),
            accidenteMortal: data.reduce((sum, r) => sum + r.accidenteMortal, 0),
            diasPerdidos: data.reduce((sum, r) => sum + r.diasPerdidos, 0),
            hhtt: data.reduce((sum, r) => sum + r.hhtt, 0)
        };
        
        // Cálculo de indicadores anuales (Fórmulas estándar ANSI/OSHA)
        // IF = (Acc. Incapacitantes * 1,000,000) / HHTT
        const ifAnual = totales.hhtt > 0 ? (totales.accidenteIncapacitante * 1000000 / totales.hhtt).toFixed(2) : "0.00";
        // IS = (Días Perdidos * 1,000,000) / HHTT
        const isAnual = totales.hhtt > 0 ? (totales.diasPerdidos * 1000000 / totales.hhtt).toFixed(2) : "0.00";
        // IA = (IF * IS) / 1000
        const iaAnual = ((parseFloat(ifAnual) * parseFloat(isAnual)) / 1000).toFixed(2);
        
        html += `
                <tr class="total-row">
                    <td>TOTAL ${year}</td>
                    <td>${totales.eventosSinLesion}</td>
                    <td>${totales.primerosAuxilios}</td>
                    <td>${totales.atencionMedica}</td>
                    <td>${totales.accidenteIncapacitante}</td>
                    <td>${totales.accidenteMortal}</td>
                    <td>${totales.diasPerdidos}</td>
                    <td>${totales.hhtt.toLocaleString()}</td>
                    <td>${ifAnual}</td>
                    <td>${isAnual}</td>
                    <td>${iaAnual}</td>
                </tr>
            </tbody>
        </table>
        </div>
        `;
        
        container.innerHTML = html;
    }
};