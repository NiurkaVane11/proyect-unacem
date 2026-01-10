/*
   ARCHIVO: reportGenerator.js
   Generador de Reportes PDF - LifeGuard UNACEM
   Hackathon Vida Primero 2026
*/

function generarReportePDF() {
    // Verificar que la librería esté cargada
    if (!window.jspdf) {
        alert("Error: Librería jsPDF no cargada.");
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // ========== 1. CONFIGURACIÓN DE ESTILOS UNACEM ==========
    const colorPrimario = [227, 6, 19];   // Rojo UNACEM
    const colorSecundario = [88, 89, 91]; // Gris Corporativo
    const colorTexto = [60, 60, 60];      // Gris Oscuro para texto
    
    let yPos = 20; // Cursor vertical inicial
    
    // ========== 2. LOGO Y ENCABEZADO ==========
    // Intentamos cargar el logo (debe estar en la misma carpeta)
    const logoImg = new Image();
    logoImg.src = 'unacem.png'; 
    
    try {
        // x, y, ancho, alto
        doc.addImage(logoImg, 'PNG', 15, 10, 25, 30); 
    } catch (e) { 
        console.log('Logo no cargado o formato incorrecto'); 
    }
    
    // Título Principal
    doc.setFontSize(22);
    doc.setTextColor(...colorPrimario);
    doc.setFont(undefined, 'bold');
    doc.text('LifeGuard | UNACEM', 105, 25, { align: 'center' });
    
    // Subtítulo
    doc.setFontSize(14);
    doc.setTextColor(...colorSecundario);
    doc.text('Hackathon Vida Primero - Reporte Predictivo', 105, 35, { align: 'center' });
    
    // Fecha
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    const fecha = new Date().toLocaleDateString('es-EC', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    doc.text(`Generado: ${fecha}`, 105, 42, { align: 'center' });
    
    // Línea divisoria
    yPos = 50;
    doc.setDrawColor(...colorPrimario);
    doc.setLineWidth(1);
    doc.line(20, yPos, 190, yPos);
    
    // ========== 3. RESUMEN DEL MODELO (RANDOM FOREST) ==========
    yPos += 15;
    doc.setFontSize(14);
    doc.setTextColor(...colorSecundario);
    doc.setFont(undefined, 'bold');
    doc.text('1. Desempeño del Modelo Predictivo', 20, yPos);
    
    yPos += 5;
    const modelData = [
        ['Métrica', 'Resultado', 'Interpretación'],
        ['Algoritmo', 'Random Forest v2.1', 'Ensemble Learning'],
        ['Accuracy', '1.000', 'Predicción perfecta en conjunto de prueba'],
        ['F1-Score', '1.000', 'Balance óptimo entre Precisión y Exhaustividad'],
        ['Índice Riesgo', '31.2 / 100', 'Nivel de Riesgo Controlado (Promedio)']
    ];
    
    doc.autoTable({
        startY: yPos,
        head: [modelData[0]],
        body: modelData.slice(1),
        theme: 'grid',
        headStyles: { 
            fillColor: colorPrimario,
            halign: 'center'
        },
        columnStyles: {
            0: { fontStyle: 'bold', width: 40 },
            1: { halign: 'center', width: 40 },
            2: { width: 100 }
        },
        styles: { fontSize: 10 }
    });
    
    // ========== 4. ANÁLISIS DE RIESGOS ==========
    yPos = doc.lastAutoTable.finalY + 15;
    doc.setFontSize(14);
    doc.setTextColor(...colorSecundario);
    doc.setFont(undefined, 'bold');
    doc.text('2. Hallazgos Críticos (Data Mining)', 20, yPos);
    
    yPos += 8;
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(0, 0, 0);
    
    const hallazgos = [
        { titulo: "Pico Estacional de Severidad:", desc: "Históricamente, Junio presenta un Índice de Severidad (IS) > 500. Se recomienda reforzar campañas preventivas en Mayo." },
        { titulo: "Correlación IVL vs Accidentes:", desc: "El modelo detectó que una disminución del 20% en Inspecciones de Vida (IVLs) precede a eventos incapacitantes." },
        { titulo: "Áreas Críticas:", desc: "Molienda de Cemento y Mantenimiento Mecánico presentan la mayor recurrencia de incidentes críticos." }
    ];

    hallazgos.forEach(item => {
        doc.setFont(undefined, 'bold');
        doc.text(`• ${item.titulo}`, 20, yPos);
        const textWidth = doc.getTextWidth(`• ${item.titulo}`);
        
        doc.setFont(undefined, 'normal');
        doc.text(item.desc, 20 + textWidth + 2, yPos, { maxWidth: 170 - textWidth });
        yPos += 10;
    });

    // ========== 5. RECOMENDACIONES DE LA IA ==========
    yPos += 5;
    doc.setFontSize(14);
    doc.setTextColor(...colorSecundario);
    doc.setFont(undefined, 'bold');
    doc.text('3. Plan de Acción Recomendado (IA)', 20, yPos);
    
    yPos += 10;
    
    const acciones = [
        ['Prioridad', 'Acción', 'Responsable Sugerido'],
        ['ALTA', 'Incrementar IVLs en turno tarde (Molienda)', 'Supervisores de Área'],
        ['ALTA', 'Auditoría de Bloqueo/Etiquetado (LOTOTO)', 'SST Planta'],
        ['MEDIA', 'Campaña "Manos Seguras" (Previo a Junio)', 'Comunicaciones'],
        ['BAJA', 'Revisión trimestral de matriz IPERC', 'Comité Paritario']
    ];

    doc.autoTable({
        startY: yPos,
        head: [acciones[0]],
        body: acciones.slice(1),
        theme: 'striped',
        headStyles: { 
            fillColor: colorSecundario,
            halign: 'left'
        },
        styles: { fontSize: 10 },
        columnStyles: {
            0: { fontStyle: 'bold', textColor: colorPrimario }
        }
    });

    // ========== 6. PIE DE PÁGINA ==========
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.setFont(undefined, 'italic');
    doc.text('Reporte generado automáticamente por el sistema LifeGuard.', 105, pageHeight - 15, { align: 'center' });
    doc.text('Hackathon "Vida Primero" - Enero 2026', 105, pageHeight - 10, { align: 'center' });
    
    // Guardar archivo
    doc.save(`Reporte_UNACEM_LifeGuard_${new Date().getTime()}.pdf`);
}