/*
   ARCHIVO: reportGenerator.js
   Generador de reportes PDF
*/

function generarReportePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Colores corporativos
    const colorPrimario = [231, 76, 60]; // Rojo UNACEM
    const colorSecundario = [44, 62, 80]; // Gris oscuro
    const colorTexto = [127, 140, 141]; // Gris claro
    
    let yPos = 20; // Posición Y actual
    
    // ========== ENCABEZADO ==========
    // Logo/Título
    doc.setFontSize(24);
    doc.setTextColor(...colorPrimario);
    doc.setFont(undefined, 'bold');
    doc.text('🛡️ LifeGuard', 105, yPos, { align: 'center' });
    
    yPos += 8;
    doc.setFontSize(16);
    doc.setTextColor(...colorSecundario);
    doc.text('UNACEM', 105, yPos, { align: 'center' });
    
    // Slogan
    yPos += 10;
    doc.setFontSize(10);
    doc.setTextColor(...colorTexto);
    doc.setFont(undefined, 'italic');
    doc.text('The solution for your problem', 105, yPos, { align: 'center' });
    yPos += 5;
    doc.text('A sophisticated way to predict', 105, yPos, { align: 'center' });
    
    // Línea separadora
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
    doc.text('📊 INDICADORES CLAVE', 20, yPos);
    
    yPos += 10;
    
    // Cuadro de indicadores
    const indicadores = [
        ['Índice de Frecuencia (IF)', '0.92', '🔴 Alto'],
        ['Índice de Severidad (IS)', '16.33', '🟡 Medio'],
        ['Índice de Accidentabilidad (IA)', '15.02', '🟡 Medio'],
        ['Proyectos en Riesgo Alto', '3', '⚠️ Crítico'],
        ['Accidentes Prevenidos', '45', '✅ Excelente']
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
    
    // ========== SECCIÓN DE 3 COLUMNAS ==========
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...colorPrimario);
    doc.text('📋 ANÁLISIS DETALLADO', 20, yPos);
    
    yPos += 10;
    
    // COLUMNA 1: PREVENCIÓN
    doc.setFontSize(12);
    doc.setTextColor(...colorSecundario);
    doc.text('🛡️ PREVENCIÓN', 20, yPos);
    
    yPos += 7;
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(0, 0, 0);
    const textoPrevencion = [
        '• Capacitaciones realizadas: 45',
        '• Inspecciones ejecutadas: 156',
        '• Incumplimientos corregidos: 92%',
        '• Personal con EPP adecuado: 98%'
    ];
    textoPrevencion.forEach((linea, idx) => {
        doc.text(linea, 22, yPos + (idx * 5));
    });
    
    // COLUMNA 2: LEGALES (al lado)
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...colorSecundario);
    doc.text('⚖️ LEGALES', 80, yPos - 7);
    
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(0, 0, 0);
    const textoLegal = [
        '• Cumplimiento normativo: 100%',
        '• Certificaciones vigentes: ✅',
        '• Auditorías aprobadas: 4/4',
        '• Sanciones: Ninguna'
    ];
    textoLegal.forEach((linea, idx) => {
        doc.text(linea, 82, yPos + (idx * 5));
    });
    
    // COLUMNA 3: ECONÓMICO
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...colorSecundario);
    doc.text('💰 ECONÓMICO', 140, yPos - 7);
    
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(0, 0, 0);
    const textoEconomico = [
        '• Ahorro por prevención: $125K',
        '• Costo de incidentes: $8K',
        '• ROI preventivo: 1,500%',
        '• Inversión en EPP: $15K'
    ];
    textoEconomico.forEach((linea, idx) => {
        doc.text(linea, 142, yPos + (idx * 5));
    });
    
    // ========== PROYECTOS DE ALTO RIESGO ==========
    yPos += 35;
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...colorPrimario);
    doc.text('⚠️ PROYECTOS DE ALTO RIESGO', 20, yPos);
    
    yPos += 10;
    
    const proyectosRiesgo = appData.proyectos
        .filter(p => p.riesgo === 'alto')
        .map(p => [p.nombre, p.ubicacion, '🔴 ALTO', '↗️ Aumentando']);
    
    doc.autoTable({
        startY: yPos,
        head: [['Proyecto', 'Ubicación', 'Nivel', 'Tendencia']],
        body: proyectosRiesgo,
        theme: 'striped',
        headStyles: { 
            fillColor: colorPrimario,
            fontSize: 10
        },
        styles: { 
            fontSize: 9,
            cellPadding: 4
        }
    });
    
    // ========== PIE DE PÁGINA ==========
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(...colorTexto);
        doc.text(
            `Página ${i} de ${pageCount}`,
            105,
            285,
            { align: 'center' }
        );
        doc.text(
            'LifeGuard UNACEM - Sistema Predictivo de Seguridad',
            105,
            290,
            { align: 'center' }
        );
    }
    
    // ========== GUARDAR PDF ==========
    const nombreArchivo = `Reporte_Seguridad_${new Date().getTime()}.pdf`;
    doc.save(nombreArchivo);
}