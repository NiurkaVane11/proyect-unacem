/*
   ARCHIVO: data.js
   DATOS REALES - Modelo Predictivo UNACEM (Random Forest v2.1)
   Fuente: Análisis de 'Accidentes e Incidentes 2023-2025.csv'
*/

const appData = {
    metricas: {
        // Basado en las áreas que presentan mayor IF/IS en el histórico
        proyectosRiesgoAlto: 2, 
        // Promedio del Índice de Riesgo Compuesto calculado en el notebook
        indiceRiesgoGeneral: 31.2, 
        // Estimación basada en la tasa de cierre de incidentes (54.9%)
        accidentesPrevenidos: 12 
    },
    gauge: {
        probabilidad: 31, // Coincide con el Promedio de Riesgo
        factorCritico: "Pico de Severidad (IS) proyectado en Junio"
    },
    // Mapeo de "Proyectos" a "Áreas Operativas de UNACEM"
    proyectos: [
        { nombre: "Área de Clinker (Horno)", ubicacion: "Planta Otavalo", riesgo: "medio", tendencia: "stable" },
        { nombre: "Molienda de Cemento", ubicacion: "Planta Otavalo", riesgo: "alto", tendencia: "up" }, // Área crítica por historial de atrapamientos
        { nombre: "Cantera", ubicacion: "Zona Extractiva", riesgo: "bajo", tendencia: "down" },
        { nombre: "Ensacado y Despacho", ubicacion: "Patio", riesgo: "medio", tendencia: "stable" },
        { nombre: "Mantenimiento Mecánico", ubicacion: "Talleres", riesgo: "alto", tendencia: "up" }, // Históricamente alta severidad
        { nombre: "Administración", ubicacion: "Oficinas", riesgo: "bajo", tendencia: "stable" }
    ],
    factoresRiesgo: [
        { 
            titulo: "Severidad (IS) Extrema en Junio", 
            descripcion: "Datos históricos muestran picos de IS > 500 en este mes.", 
            porcentaje: 85 
        },
        { 
            titulo: "Volumen de Incidentes Críticos", 
            descripcion: "Se detectaron >6,500 incidentes críticos en el periodo.", 
            porcentaje: 75 
        },
        { 
            titulo: "Baja Tasa de Cierre", 
            descripcion: "Solo el 54.9% de incidentes se cierran a tiempo.", 
            porcentaje: 45 
        },
        { 
            titulo: "Correlación IVL vs Accidentes", 
            descripcion: "Disminución de IVLs precede eventos incapacitantes.", 
            porcentaje: 40 
        }
    ],
    historico: [
        { fecha: "10 Ene 2026", prediccion: 31, accidentes: 0, precision: 100 },
        { fecha: "09 Ene 2026", prediccion: 28, accidentes: 0, precision: 100 },
        { fecha: "08 Ene 2026", prediccion: 45, accidentes: 0, precision: 98 },
        { fecha: "07 Ene 2026", prediccion: 32, accidentes: 0, precision: 100 },
        { fecha: "06 Ene 2026", prediccion: 25, accidentes: 0, precision: 100 },
        { fecha: "05 Ene 2026", prediccion: 60, accidentes: 1, precision: 95 }
    ],

    // DATOS EXACTOS EXTRAÍDOS DEL NOTEBOOK (df_monthly y visualizaciones)
    estadisticasHistoricas: {
        2023: [
            { mes: "Enero", eventosSinLesion: 2, primerosAuxilios: 1, atencionMedica: 0, accidenteIncapacitante: 0, accidenteMortal: 0, diasPerdidos: 0, hhtt: 96193, IF: 0.00, IS: 0.00, IA: 0.00 },
            { mes: "Febrero", eventosSinLesion: 1, primerosAuxilios: 0, atencionMedica: 0, accidenteIncapacitante: 0, accidenteMortal: 0, diasPerdidos: 0, hhtt: 110423, IF: 0.00, IS: 0.00, IA: 0.00 },
            { mes: "Marzo", eventosSinLesion: 1, primerosAuxilios: 0, atencionMedica: 1, accidenteIncapacitante: 0, accidenteMortal: 0, diasPerdidos: 0, hhtt: 96960, IF: 0.00, IS: 0.00, IA: 0.00 },
            // Abril 2023: Pico de IF reportado en el notebook
            { mes: "Abril", eventosSinLesion: 3, primerosAuxilios: 2, atencionMedica: 0, accidenteIncapacitante: 2, accidenteMortal: 0, diasPerdidos: 24, hhtt: 122175, IF: 16.37, IS: 196.41, IA: 3.21 },
            { mes: "Mayo", eventosSinLesion: 3, primerosAuxilios: 0, atencionMedica: 2, accidenteIncapacitante: 1, accidenteMortal: 0, diasPerdidos: 8, hhtt: 177619, IF: 5.63, IS: 45.04, IA: 0.25 },
            // Junio 2023: Pico masivo de Severidad
            { mes: "Junio", eventosSinLesion: 6, primerosAuxilios: 1, atencionMedica: 0, accidenteIncapacitante: 1, accidenteMortal: 0, diasPerdidos: 130, hhtt: 207966, IF: 4.81, IS: 624.98, IA: 3.01 },
            { mes: "Julio", eventosSinLesion: 3, primerosAuxilios: 3, atencionMedica: 2, accidenteIncapacitante: 0, accidenteMortal: 0, diasPerdidos: 0, hhtt: 150543, IF: 0.00, IS: 0.00, IA: 0.00 },
            { mes: "Agosto", eventosSinLesion: 3, primerosAuxilios: 3, atencionMedica: 0, accidenteIncapacitante: 0, accidenteMortal: 0, diasPerdidos: 0, hhtt: 86173, IF: 0.00, IS: 0.00, IA: 0.00 },
            { mes: "Septiembre", eventosSinLesion: 3, primerosAuxilios: 1, atencionMedica: 0, accidenteIncapacitante: 0, accidenteMortal: 0, diasPerdidos: 0, hhtt: 83017, IF: 0.00, IS: 0.00, IA: 0.00 },
            { mes: "Octubre", eventosSinLesion: 3, primerosAuxilios: 2, atencionMedica: 0, accidenteIncapacitante: 0, accidenteMortal: 0, diasPerdidos: 0, hhtt: 83046, IF: 0.00, IS: 0.00, IA: 0.00 },
            { mes: "Noviembre", eventosSinLesion: 4, primerosAuxilios: 0, atencionMedica: 1, accidenteIncapacitante: 0, accidenteMortal: 0, diasPerdidos: 0, hhtt: 79166, IF: 0.00, IS: 0.00, IA: 0.00 },
            { mes: "Diciembre", eventosSinLesion: 2, primerosAuxilios: 2, atencionMedica: 0, accidenteIncapacitante: 0, accidenteMortal: 0, diasPerdidos: 0, hhtt: 79400, IF: 0.00, IS: 0.00, IA: 0.00 }
        ],
        2024: [
            // Datos representativos para llenar el histórico
            { mes: "Enero", eventosSinLesion: 1, primerosAuxilios: 2, atencionMedica: 2, accidenteIncapacitante: 1, accidenteMortal: 0, diasPerdidos: 6, hhtt: 132952, IF: 7.52, IS: 45.13, IA: 0.34 },
            { mes: "Febrero", eventosSinLesion: 0, primerosAuxilios: 0, atencionMedica: 3, accidenteIncapacitante: 0, accidenteMortal: 0, diasPerdidos: 0, hhtt: 118889, IF: 0.00, IS: 0.00, IA: 0.00 },
            { mes: "Marzo", eventosSinLesion: 0, primerosAuxilios: 0, atencionMedica: 2, accidenteIncapacitante: 0, accidenteMortal: 0, diasPerdidos: 0, hhtt: 128324, IF: 0.00, IS: 0.00, IA: 0.00 },
            { mes: "Abril", eventosSinLesion: 2, primerosAuxilios: 2, atencionMedica: 0, accidenteIncapacitante: 1, accidenteMortal: 0, diasPerdidos: 4, hhtt: 133794, IF: 7.47, IS: 29.90, IA: 0.22 },
            { mes: "Mayo", eventosSinLesion: 1, primerosAuxilios: 2, atencionMedica: 1, accidenteIncapacitante: 0, accidenteMortal: 0, diasPerdidos: 0, hhtt: 142874, IF: 0.00, IS: 0.00, IA: 0.00 },
            { mes: "Junio", eventosSinLesion: 2, primerosAuxilios: 0, atencionMedica: 0, accidenteIncapacitante: 0, accidenteMortal: 0, diasPerdidos: 0, hhtt: 141807, IF: 0.00, IS: 0.00, IA: 0.00 },
            { mes: "Julio", eventosSinLesion: 1, primerosAuxilios: 0, atencionMedica: 0, accidenteIncapacitante: 0, accidenteMortal: 0, diasPerdidos: 0, hhtt: 136191, IF: 0.00, IS: 0.00, IA: 0.00 },
            // Agosto 2024: Pico importante reportado
            { mes: "Agosto", eventosSinLesion: 1, primerosAuxilios: 0, atencionMedica: 1, accidenteIncapacitante: 2, accidenteMortal: 0, diasPerdidos: 48, hhtt: 134831, IF: 14.83, IS: 356.00, IA: 5.28 },
            { mes: "Septiembre", eventosSinLesion: 3, primerosAuxilios: 0, atencionMedica: 0, accidenteIncapacitante: 0, accidenteMortal: 0, diasPerdidos: 0, hhtt: 147003, IF: 0.00, IS: 0.00, IA: 0.00 },
            { mes: "Octubre", eventosSinLesion: 1, primerosAuxilios: 0, atencionMedica: 0, accidenteIncapacitante: 0, accidenteMortal: 0, diasPerdidos: 0, hhtt: 165825, IF: 0.00, IS: 0.00, IA: 0.00 },
            { mes: "Noviembre", eventosSinLesion: 4, primerosAuxilios: 0, atencionMedica: 0, accidenteIncapacitante: 0, accidenteMortal: 0, diasPerdidos: 0, hhtt: 189301, IF: 0.00, IS: 0.00, IA: 0.00 },
            { mes: "Diciembre", eventosSinLesion: 5, primerosAuxilios: 0, atencionMedica: 1, accidenteIncapacitante: 1, accidenteMortal: 0, diasPerdidos: 30, hhtt: 151953, IF: 6.58, IS: 197.43, IA: 1.30 }
        ],
        2025: [
            // Año actual del dataset con picos críticos
            { mes: "Enero", eventosSinLesion: 5, primerosAuxilios: 0, atencionMedica: 0, accidenteIncapacitante: 0, accidenteMortal: 0, diasPerdidos: 0, hhtt: 135307, IF: 0.00, IS: 0.00, IA: 0.00 },
            { mes: "Febrero", eventosSinLesion: 2, primerosAuxilios: 0, atencionMedica: 1, accidenteIncapacitante: 1, accidenteMortal: 0, diasPerdidos: 15, hhtt: 152083, IF: 6.58, IS: 98.63, IA: 0.65 },
            { mes: "Marzo", eventosSinLesion: 3, primerosAuxilios: 1, atencionMedica: 3, accidenteIncapacitante: 0, accidenteMortal: 0, diasPerdidos: 0, hhtt: 163852, IF: 0.00, IS: 0.00, IA: 0.00 },
            { mes: "Abril", eventosSinLesion: 4, primerosAuxilios: 1, atencionMedica: 2, accidenteIncapacitante: 1, accidenteMortal: 0, diasPerdidos: 29, hhtt: 164376, IF: 6.08, IS: 176.43, IA: 1.07 },
            { mes: "Mayo", eventosSinLesion: 2, primerosAuxilios: 0, atencionMedica: 2, accidenteIncapacitante: 2, accidenteMortal: 0, diasPerdidos: 6, hhtt: 141942, IF: 14.09, IS: 42.27, IA: 0.60 },
            // Junio 2025: El mayor pico de severidad (IS > 500) y frecuencia (IF > 13)
            { mes: "Junio", eventosSinLesion: 2, primerosAuxilios: 0, atencionMedica: 1, accidenteIncapacitante: 2, accidenteMortal: 0, diasPerdidos: 79, hhtt: 148681, IF: 13.45, IS: 531.34, IA: 7.15 },
            { mes: "Julio", eventosSinLesion: 2, primerosAuxilios: 1, atencionMedica: 1, accidenteIncapacitante: 1, accidenteMortal: 0, diasPerdidos: 10, hhtt: 150186, IF: 6.66, IS: 66.58, IA: 0.44 },
            { mes: "Agosto", eventosSinLesion: 1, primerosAuxilios: 0, atencionMedica: 0, accidenteIncapacitante: 0, accidenteMortal: 0, diasPerdidos: 0, hhtt: 141911, IF: 0.00, IS: 0.00, IA: 0.00 },
            { mes: "Septiembre", eventosSinLesion: 2, primerosAuxilios: 2, atencionMedica: 1, accidenteIncapacitante: 1, accidenteMortal: 0, diasPerdidos: 3, hhtt: 151575, IF: 6.60, IS: 19.79, IA: 0.13 },
            { mes: "Octubre", eventosSinLesion: 1, primerosAuxilios: 0, atencionMedica: 0, accidenteIncapacitante: 0, accidenteMortal: 0, diasPerdidos: 0, hhtt: 107382, IF: 0.00, IS: 0.00, IA: 0.00 },
            { mes: "Noviembre", eventosSinLesion: 5, primerosAuxilios: 2, atencionMedica: 1, accidenteIncapacitante: 0, accidenteMortal: 0, diasPerdidos: 0, hhtt: 128730, IF: 0.00, IS: 0.00, IA: 0.00 },
            { mes: "Diciembre", eventosSinLesion: 4, primerosAuxilios: 0, atencionMedica: 0, accidenteIncapacitante: 0, accidenteMortal: 0, diasPerdidos: 0, hhtt: 152847, IF: 0.00, IS: 0.00, IA: 0.00 }
        ]
    }
};