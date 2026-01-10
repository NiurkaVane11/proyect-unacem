/*
   ARCHIVO: reportGenerator.js
   Generador de reportes PDF
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
    // Intenta cargar el logo
    const logoImg = new Image();
    logoImg.src = 'unacem.png';
    
    // Agregar logo (40x40 píxeles)
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
    
    // ========== SECCIÓN DE 3 COLUMNAS ==========
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...colorPrimario);
    doc.text('ANALISIS DETALLADO', 20, yPos);
    
    yPos += 10;
    
    // Posiciones X de las columnas
    const col1X = 20;
    const col2X = 80;
    const col3X = 140;
    const colWidth = 55;
    
    // COLUMNA 1: PREVENCIÓN
    doc.setFontSize(12);
    doc.setTextColor(...colorSecundario);
    doc.text('PREVENCION', col1X, yPos);
    
    yPos += 7;
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(0, 0, 0);
    const textoPrevencion = [
        'Capacitaciones realizadas: 45',
        'Inspecciones ejecutadas: 156',
        'Incumplimientos corregidos: 92%',
        'Personal con EPP adecuado: 98%'
    ];
    textoPrevencion.forEach((linea, idx) => {
        doc.text(linea, col1X, yPos + (idx * 5), { maxWidth: colWidth });
    });
    
    // COLUMNA 2: LEGALES
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...colorSecundario);
    doc.text('LEGALES', col2X, yPos - 7);
    
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(0, 0, 0);
    const textoLegal = [
        'Cumplimiento normativo: 100%',
        'Certificaciones vigentes: SI',
        'Auditorias aprobadas: 4/4',
        'Sanciones: Ninguna'
    ];
    textoLegal.forEach((linea, idx) => {
        doc.text(linea, col2X, yPos + (idx * 5), { maxWidth: colWidth });
    });
    
    // COLUMNA 3: ECONÓMICO
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...colorSecundario);
    doc.text('ECONOMICO', col3X, yPos - 7);
    
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(0, 0, 0);
    const textoEconomico = [
        'Ahorro por prevencion: $125K',
        'Costo de incidentes: $8K',
        'ROI preventivo: 1,500%',
        'Inversion en EPP: $15K'
    ];
    textoEconomico.forEach((linea, idx) => {
        doc.text(linea, col3X, yPos + (idx * 5), { maxWidth: colWidth });
    });
    
    // LÍNEAS DIVISORIAS VERTICALES entre columnas
    const lineStartY = yPos - 10;
    const lineEndY = yPos + 15;
    
    doc.setDrawColor(...colorTexto);
    doc.setLineWidth(0.3);
    
    // Línea entre Prevención y Legales
    doc.line(col2X - 5, lineStartY, col2X - 5, lineEndY);
    
    // Línea entre Legales y Económico
    doc.line(col3X - 5, lineStartY, col3X - 5, lineEndY);
    
    // ========== PIE DE PÁGINA ==========
    yPos += 30;
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

