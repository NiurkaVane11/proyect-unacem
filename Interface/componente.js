/*
   ARCHIVO: components.js
*/

const Components = {
    renderMetrics: function(data) {
        const container = document.getElementById('metricsContainer');
        container.innerHTML = `
            <div class="metric-card danger">
                <div class="metric-label">Proyectos en Riesgo Alto</div>
                <div class="metric-value" style="color: #e74c3c;">${data.proyectosRiesgoAlto}</div>
                <div class="metric-sublabel">Requieren atención inmediata</div>
            </div>
            <div class="metric-card warning">
                <div class="metric-label">Índice de Riesgo General</div>
                <div class="metric-value" style="color: #f39c12;">${data.indiceRiesgoGeneral}/100</div>
                <div class="metric-sublabel">Nivel Medio</div>
            </div>
            <div class="metric-card success">
                <div class="metric-label">Accidentes Prevenidos</div>
                <div class="metric-value" style="color: #27ae60;">${data.accidentesPrevenidos}</div>
                <div class="metric-sublabel">Este mes</div>
            </div>
        `;
    },

    renderGauge: function(data) {
        const container = document.getElementById('gaugeContainer');
        const riesgoLabel = data.probabilidad < 30 ? 'RIESGO BAJO' : 
                           data.probabilidad < 70 ? 'RIESGO MEDIO' : 'RIESGO ALTO';
        const color = data.probabilidad < 30 ? '#27ae60' : 
                     data.probabilidad < 70 ? '#f39c12' : '#e74c3c';
        
        container.innerHTML = `
            <div class="gauge-container">
                <div class="gauge">
                    <div class="gauge-inner">
                        <div class="gauge-value" style="color: ${color};">${data.probabilidad}%</div>
                        <div class="gauge-label">${riesgoLabel}</div>
                    </div>
                </div>
            </div>
            <div class="critical-factor">
                <strong>⚠️ Factor crítico:</strong> ${data.factorCritico}
            </div>
        `;
    },

    renderProjectsTable: function(proyectos, filter = 'todos') {
        const container = document.getElementById('projectsTable');
        
        let filteredProyectos = proyectos;
        if (filter !== 'todos') {
            filteredProyectos = proyectos.filter(p => p.riesgo === filter);
        }
        
        const getTendenciaIcon = (tendencia) => {
            if (tendencia === 'up') return '↗️ Aumentando';
            if (tendencia === 'down') return '↘️ Mejorando';
            return '→ Estable';
        };
        
        const getRiskBadge = (riesgo) => {
            if (riesgo === 'alto') return '<span class="risk-badge risk-high">🔴 ALTO</span>';
            if (riesgo === 'medio') return '<span class="risk-badge risk-medium">🟡 MEDIO</span>';
            return '<span class="risk-badge risk-low">🟢 BAJO</span>';
        };
        
        let html = `
            <thead>
                <tr>
                    <th>Proyecto</th>
                    <th>Ubicación</th>
                    <th>Nivel de Riesgo</th>
                    <th>Tendencia</th>
                </tr>
            </thead>
            <tbody>
        `;
        
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
        
        html += `</tbody>`;
        container.innerHTML = html;
    },

    renderRiskFactors: function(factores) {
        const container = document.getElementById('riskFactorsContainer');
        
        let html = '';
        factores.forEach((factor, idx) => {
            html += `
                <div class="factor-item">
                    <div>
                        <strong>${idx + 1}. ${factor.titulo}</strong>
                        <div style="font-size: 12px; color: #666; margin-top: 5px;">${factor.descripcion}</div>
                    </div>
                    <div>
                        <div class="factor-bar">
                            <div class="factor-fill" style="width: ${factor.porcentaje}%;"></div>
                        </div>
                        <div style="font-size: 12px; color: #666; margin-top: 5px; text-align: right;">${factor.porcentaje}%</div>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
    },

    renderHistoryTable: function(historico) {
        const container = document.getElementById('historyTable');
        
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
    }

    // AGREGAR ESTA NUEVA FUNCIÓN
    ,
    renderEstadisticas: function(year = 2025) {
        const container = document.getElementById('estadisticasTableContainer');
        if (!container) return;
        
        const data = appData.estadisticasHistoricas[year];
        if (!data) return;
        
        let html = `
            <div class="table-responsive">
                <table class="stats-table">
                    <thead>
                        <tr>
                            <th>Mes</th>
                            <th>Eventos Sin Lesión</th>
                            <th>Primeros Auxilios</th>
                            <th>Atención Médica</th>
                            <th>Acc. Incapacitante</th>
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
            const ifClass = row.IF > 10 ? 'text-danger' : row.IF > 5 ? 'text-warning' : 'text-success';
            
            html += `
                <tr>
                    <td><strong>${row.mes}</strong></td>
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
        
        // Calcular totales
        const totales = {
            eventosSinLesion: data.reduce((sum, r) => sum + r.eventosSinLesion, 0),
            primerosAuxilios: data.reduce((sum, r) => sum + r.primerosAuxilios, 0),
            atencionMedica: data.reduce((sum, r) => sum + r.atencionMedica, 0),
            accidenteIncapacitante: data.reduce((sum, r) => sum + r.accidenteIncapacitante, 0),
            accidenteMortal: data.reduce((sum, r) => sum + r.accidenteMortal, 0),
            diasPerdidos: data.reduce((sum, r) => sum + r.diasPerdidos, 0),
            hhtt: data.reduce((sum, r) => sum + r.hhtt, 0)
        };
        
        const ifAnual = (totales.accidenteIncapacitante / totales.hhtt * 1000000).toFixed(2);
        const isAnual = (totales.diasPerdidos / totales.hhtt * 1000000).toFixed(2);
        const iaAnual = (ifAnual * isAnual / 1000).toFixed(2);
        
        html += `
                <tr class="total-row">
                    <td><strong>TOTAL ${year}</strong></td>
                    <td><strong>${totales.eventosSinLesion}</strong></td>
                    <td><strong>${totales.primerosAuxilios}</strong></td>
                    <td><strong>${totales.atencionMedica}</strong></td>
                    <td><strong>${totales.accidenteIncapacitante}</strong></td>
                    <td><strong>${totales.accidenteMortal}</strong></td>
                    <td><strong>${totales.diasPerdidos}</strong></td>
                    <td><strong>${totales.hhtt.toLocaleString()}</strong></td>
                    <td><strong>${ifAnual}</strong></td>
                    <td><strong>${isAnual}</strong></td>
                    <td><strong>${iaAnual}</strong></td>
                </tr>
            </tbody>
        </table>
        </div>
        `;
        
        container.innerHTML = html;
    }
};