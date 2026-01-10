/*
   ARCHIVO: reportGenerator.js
   Generador de reportes PDF con Mapa de Calor
*/

function generarReportePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Colores corporativos
    const colorPrimario = [231, 76, 60];
    const colorSecundario = [44, 62, 80];
    const colorTexto = [127, 140, 141];
    
    let yPos = 20;
    
    // ========== LOGO (si existe) ==========
    const logoImg = new Image();
    logoImg.src = 'logo.png';
    
    try {
        doc.addImage(logoImg, 'PNG', 15, yPos - 5, 30, 30);
    } catch (e) {
        console.log('Logo no encontrado');
    }
    
    // ========== ENCABEZADO ==========
    doc.setFontSize(24);
    doc.setTextColor(...colorPrimario);
    doc.setFont(undefined, 'bold');
    doc.text('LifeGuard', 105, yPos, { align: 'center' });
    
    yPos += 8;
    doc.setFontSize(16);
    doc.setTextColor(...colorSecundario);
    doc.text('UNACEM', 105, yPos, { align: 'center' });
    
    yPos += 10;
    doc.setFontSize(10);
    doc.setTextColor(...colorTexto);
    doc.setFont(undefined, 'italic');
    doc.text('The solution for your problem', 105, yPos, { align: 'center' });
    yPos += 5;
    doc.text('A sophisticated way to predict', 105, yPos, { align: 'center' });
    
    yPos += 8;
    doc.setDrawColor(...colorPrimario);
    doc.setLineWidth(0.5);
    doc.line(20, yPos, 190, yPos);
    
    // ========== INFORMACIÓN DEL REPORTE ==========
    yPos += 10;
    doc.setFontSize(12);
    doc.setTextColor(...colorSecundario);
    doc.setFont(undefined, 'bold');
    doc.text('REPORTE MENSUAL DE SEGURIDAD', 105, yPos, { align: 'center' });
    
    yPos += 8;
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    const fecha = new Date().toLocaleDateString('es-EC', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    doc.text(`Fecha de generación: ${fecha}`, 105, yPos, { align: 'center' });
    
    // ========== INDICADORES CLAVE ==========
    yPos += 15;
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...colorPrimario);
    doc.text('INDICADORES CLAVE', 20, yPos);
    
    yPos += 10;
    
    const indicadores = [
        ['Índice de Frecuencia (IF)', '0.92', 'Alto'],
        ['Índice de Severidad (IS)', '16.33', 'Medio'],
        ['Índice de Accidentabilidad (IA)', '15.02', 'Medio'],
        ['Proyectos en Riesgo Alto', '3', 'Crítico'],
        ['Accidentes Prevenidos', '45', 'Excelente']
    ];
    
    doc.autoTable({
        startY: yPos,
        head: [['Indicador', 'Valor', 'Estado']],
        body: indicadores,
        theme: 'grid',
        headStyles: { 
            fillColor: colorPrimario,
            fontSize: 11,
            fontStyle: 'bold'
        },
        styles: { 
            fontSize: 10,
            cellPadding: 5
        },
        columnStyles: {
            0: { cellWidth: 100 },
            1: { cellWidth: 40, halign: 'center' },
            2: { cellWidth: 40, halign: 'center' }
        }
    });
    
    yPos = doc.lastAutoTable.finalY + 15;
    
    // ========== CAPTURAR MAPA DE CALOR ==========
    const heatmapCanvas = document.getElementById('heatmap-canvas');
    
    if (heatmapCanvas) {
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(...colorPrimario);
        doc.text('MAPA DE CALOR - DISTRIBUCIÓN DE RIESGOS', 20, yPos);
        
        yPos += 5;
        
        // Obtener la métrica seleccionada
        const metricSelect = document.getElementById('heatmap-metric');
        const metricaNombre = metricSelect ? metricSelect.options[metricSelect.selectedIndex].text : 'Temperatura';
        
        // Obtener parámetros actuales
        const intensitySlider = document.getElementById('heatmap-intensity');
        const radiusSlider = document.getElementById('heatmap-radius');
        const intensidad = intensitySlider ? intensitySlider.value : '5';
        const radio = radiusSlider ? radiusSlider.value : '25';
        
        doc.setFontSize(9);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(...colorTexto);
        doc.text(`Métrica: ${metricaNombre} | Intensidad: ${intensidad} | Radio: ${radio}px`, 20, yPos);
        
        yPos += 8;
        
        try {
            // Capturar el canvas como imagen
            const heatmapImage = heatmapCanvas.toDataURL('image/png');
            
            // Calcular dimensiones (mantener aspecto 16:9 aproximado)
            const imgWidth = 140
            ; // Ancho del PDF menos márgenes
            const imgHeight = (heatmapCanvas.height / heatmapCanvas.width) * imgWidth;
            
            // Agregar la imagen al PDF
            doc.addImage(heatmapImage, 'PNG', 20, yPos, imgWidth, imgHeight);
            
            yPos += imgHeight + 5;
            
            // Agregar leyenda de colores
            doc.setFontSize(8);
            doc.setTextColor(...colorTexto);
            doc.text('Leyenda: ', 20, yPos);
            
            // Dibujar gradiente de colores como referencia
            const legendY = yPos - 3;
            const colors = [
                { color: [0, 0, 255], label: 'Bajo' },
                { color: [0, 255, 255], label: '' },
                { color: [0, 255, 0], label: 'Medio' },
                { color: [255, 255, 0], label: '' },
                { color: [255, 127, 0], label: '' },
                { color: [255, 0, 0], label: 'Alto' }
            ];
            
            const legendWidth = 60;
            const segmentWidth = legendWidth / colors.length;
            let legendX = 35;
            
            colors.forEach((colorData, i) => {
                doc.setFillColor(...colorData.color);
                doc.rect(legendX, legendY, segmentWidth, 3, 'F');
                
                if (colorData.label) {
                    doc.setTextColor(...colorTexto);
                    doc.text(colorData.label, legendX, yPos + 5);
                }
                
                legendX += segmentWidth;
            });
            
            yPos += 10;
            
        } catch (e) {
            console.error('Error al capturar mapa de calor:', e);
            doc.setFontSize(10);
            doc.setTextColor(200, 0, 0);
            doc.text('Error: No se pudo capturar el mapa de calor', 20, yPos);
            yPos += 10;
        }
    } else {
        console.warn('Canvas heatmap-canvas no encontrado');
    }
    
    // ========== TABLA DE DOBLE ENTRADA: ANÁLISIS DETALLADO ==========
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...colorPrimario);
    doc.text('ANALISIS DETALLADO', 20, yPos);
    
    yPos += 10;
    
    // Datos para la tabla de doble entrada
    const datosAnalisis = [
        [
            'CONTRATISTA',
            'Capacitaciones: 28\nInspecciones: 89\nIncumplimientos: 8%\nEPP adecuado: 96%',
            'Cumplimiento: 100%\nCertificaciones: SI\nAuditorias: 2/2\nSanciones: Ninguna',
            'Ahorro: $72K\nCostos: $5K\nROI: 1,440%\nInversión EPP: $9K'
        ],
        [
            'EMPLEADO',
            'Capacitaciones: 17\nInspecciones: 67\nIncumplimientos: 2%\nEPP adecuado: 99%',
            'Cumplimiento: 100%\nCertificaciones: SI\nAuditorias: 2/2\nSanciones: Ninguna',
            'Ahorro: $53K\nCostos: $3K\nROI: 1,766%\nInversión EPP: $6K'
        ]
    ];
    
    doc.autoTable({
        startY: yPos,
        head: [['TIPO', 'PREVENCIÓN', 'LEGALES', 'ECONÓMICO']],
        body: datosAnalisis,
        theme: 'grid',
        headStyles: { 
            fillColor: colorPrimario,
            fontSize: 11,
            fontStyle: 'bold',
            halign: 'center'
        },
        styles: { 
            fontSize: 9,
            cellPadding: 5,
            lineColor: [200, 200, 200],
            lineWidth: 0.1
        },
        columnStyles: {
            0: { 
                cellWidth: 30, 
                fontStyle: 'bold',
                fillColor: [240, 240, 240],
                halign: 'center',
                valign: 'middle'
            },
            1: { cellWidth: 50 },
            2: { cellWidth: 50 },
            3: { cellWidth: 50 }
        },
        bodyStyles: {
            valign: 'top'
        }
    });
    
    yPos = doc.lastAutoTable.finalY + 10;
    
    // ========== PIE DE PÁGINA ==========
    doc.setFontSize(8);
    doc.setTextColor(...colorTexto);
    doc.setFont(undefined, 'italic');
    doc.text(
        'LifeGuard UNACEM - Sistema Predictivo de Seguridad',
        105,
        yPos,
        { align: 'center' }
    );
    
    yPos += 5;
    doc.text(
        `Pagina 1 de 1`,
        105,
        yPos,
        { align: 'center' }
    );
    
    // ========== GUARDAR PDF ==========
    const nombreArchivo = `Reporte_Seguridad_${new Date().getTime()}.pdf`;
    doc.save(nombreArchivo);
}