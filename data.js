/*
   ARCHIVO: data.js
*/

const appData = {
    metricas: {
        proyectosRiesgoAlto: 3,
        indiceRiesgoGeneral: 72,
        accidentesPrevenidos: 45
    },
    gauge: {
        probabilidad: 15,
        factorCritico: "Trabajo en altura en Torre A"
    },
    proyectos: [
        { nombre: "Torre A", ubicacion: "Quito", riesgo: "alto", tendencia: "up" },
        { nombre: "Puente B", ubicacion: "Guayaquil", riesgo: "medio", tendencia: "stable" },
        { nombre: "Planta C", ubicacion: "Cuenca", riesgo: "bajo", tendencia: "down" },
        { nombre: "Edificio D", ubicacion: "Quito", riesgo: "medio", tendencia: "stable" },
        { nombre: "Carretera E", ubicacion: "Manta", riesgo: "alto", tendencia: "up" },
        { nombre: "Terminal F", ubicacion: "Guayaquil", riesgo: "bajo", tendencia: "down" }
    ],
    factoresRiesgo: [
        { 
            titulo: "Condiciones climáticas adversas", 
            descripcion: "Lluvia intensa prevista en zona norte", 
            porcentaje: 40 
        },
        { 
            titulo: "Trabajo en altura sin supervisión", 
            descripcion: "3 proyectos con déficit de supervisores", 
            porcentaje: 35 
        },
        { 
            titulo: "Uso incorrecto de EPP", 
            descripcion: "Detectado en inspección matutina Torre A", 
            porcentaje: 25 
        },
        { 
            titulo: "Fatiga de trabajadores", 
            descripcion: "Horas extras excesivas detectadas", 
            porcentaje: 20 
        },
        { 
            titulo: "Maquinaria sin mantenimiento", 
            descripcion: "2 equipos con mantenimiento vencido", 
            porcentaje: 18 
        }
    ],
    historico: [
        { fecha: "08 Enero 2026", prediccion: 15, accidentes: 0, precision: 100 },
        { fecha: "07 Enero 2026", prediccion: 22, accidentes: 0, precision: 100 },
        { fecha: "06 Enero 2026", prediccion: 68, accidentes: 1, precision: 95 },
        { fecha: "05 Enero 2026", prediccion: 85, accidentes: 2, precision: 92 },
        { fecha: "04 Enero 2026", prediccion: 18, accidentes: 0, precision: 100 },
        { fecha: "03 Enero 2026", prediccion: 45, accidentes: 1, precision: 98 },
        { fecha: "02 Enero 2026", prediccion: 32, accidentes: 0, precision: 100 }
    ],

    // AGREGAR ESTO AL FINAL DE appData (después de historico)
    estadisticasHistoricas: {
        2023: [
            { mes: "Enero", eventosSinLesion: 4, primerosAuxilios: 0, atencionMedica: 1, accidenteIncapacitante: 0, accidenteMortal: 0, diasPerdidos: 0, hhtt: 96193, IF: 0.00, IS: 0.00, IA: 0.00 },
            { mes: "Febrero", eventosSinLesion: 4, primerosAuxilios: 0, atencionMedica: 0, accidenteIncapacitante: 0, accidenteMortal: 0, diasPerdidos: 0, hhtt: 110423, IF: 0.00, IS: 0.00, IA: 0.00 },
            { mes: "Marzo", eventosSinLesion: 4, primerosAuxilios: 3, atencionMedica: 1, accidenteIncapacitante: 0, accidenteMortal: 0, diasPerdidos: 0, hhtt: 96960, IF: 0.00, IS: 0.00, IA: 0.00 },
            { mes: "Abril", eventosSinLesion: 4, primerosAuxilios: 0, atencionMedica: 1, accidenteIncapacitante: 0, accidenteMortal: 0, diasPerdidos: 0, hhtt: 96042, IF: 0.00, IS: 0.00, IA: 0.00 },
            { mes: "Mayo", eventosSinLesion: 3, primerosAuxilios: 0, atencionMedica: 1, accidenteIncapacitante: 0, accidenteMortal: 0, diasPerdidos: 0, hhtt: 95575, IF: 0.00, IS: 0.00, IA: 0.00 },
            { mes: "Junio", eventosSinLesion: 6, primerosAuxilios: 1, atencionMedica: 0, accidenteIncapacitante: 0, accidenteMortal: 0, diasPerdidos: 0, hhtt: 99627, IF: 0.00, IS: 0.00, IA: 0.00 },
            { mes: "Julio", eventosSinLesion: 3, primerosAuxilios: 3, atencionMedica: 2, accidenteIncapacitante: 1, accidenteMortal: 0, diasPerdidos: 70, hhtt: 150543, IF: 6.64, IS: 464.98, IA: 3.09 },
            { mes: "Agosto", eventosSinLesion: 3, primerosAuxilios: 3, atencionMedica: 0, accidenteIncapacitante: 1, accidenteMortal: 0, diasPerdidos: 11, hhtt: 86173, IF: 11.60, IS: 127.65, IA: 1.48 },
            { mes: "Septiembre", eventosSinLesion: 3, primerosAuxilios: 1, atencionMedica: 0, accidenteIncapacitante: 0, accidenteMortal: 0, diasPerdidos: 0, hhtt: 83017, IF: 0.00, IS: 0.00, IA: 0.00 },
            { mes: "Octubre", eventosSinLesion: 3, primerosAuxilios: 2, atencionMedica: 0, accidenteIncapacitante: 0, accidenteMortal: 0, diasPerdidos: 0, hhtt: 83046, IF: 0.00, IS: 0.00, IA: 0.00 },
            { mes: "Noviembre", eventosSinLesion: 4, primerosAuxilios: 0, atencionMedica: 1, accidenteIncapacitante: 0, accidenteMortal: 0, diasPerdidos: 0, hhtt: 79166, IF: 0.00, IS: 0.00, IA: 0.00 },
            { mes: "Diciembre", eventosSinLesion: 2, primerosAuxilios: 2, atencionMedica: 0, accidenteIncapacitante: 0, accidenteMortal: 0, diasPerdidos: 0, hhtt: 79400, IF: 0.00, IS: 0.00, IA: 0.00 }
        ],
        2024: [
            { mes: "Enero", eventosSinLesion: 1, primerosAuxilios: 2, atencionMedica: 2, accidenteIncapacitante: 0, accidenteMortal: 0, diasPerdidos: 0, hhtt: 132952, IF: 0.00, IS: 0.00, IA: 0.00 },
            { mes: "Febrero", eventosSinLesion: 0, primerosAuxilios: 0, atencionMedica: 3, accidenteIncapacitante: 0, accidenteMortal: 0, diasPerdidos: 0, hhtt: 118889, IF: 0.00, IS: 0.00, IA: 0.00 },
            { mes: "Marzo", eventosSinLesion: 0, primerosAuxilios: 0, atencionMedica: 2, accidenteIncapacitante: 0, accidenteMortal: 0, diasPerdidos: 0, hhtt: 128324, IF: 0.00, IS: 0.00, IA: 0.00 },
            { mes: "Abril", eventosSinLesion: 2, primerosAuxilios: 2, atencionMedica: 0, accidenteIncapacitante: 1, accidenteMortal: 0, diasPerdidos: 4, hhtt: 133794, IF: 7.47, IS: 29.90, IA: 0.22 },
            { mes: "Mayo", eventosSinLesion: 1, primerosAuxilios: 2, atencionMedica: 1, accidenteIncapacitante: 0, accidenteMortal: 0, diasPerdidos: 0, hhtt: 142874, IF: 0.00, IS: 0.00, IA: 0.00 },
            { mes: "Junio", eventosSinLesion: 2, primerosAuxilios: 0, atencionMedica: 0, accidenteIncapacitante: 0, accidenteMortal: 0, diasPerdidos: 0, hhtt: 141807, IF: 0.00, IS: 0.00, IA: 0.00 },
            { mes: "Julio", eventosSinLesion: 1, primerosAuxilios: 0, atencionMedica: 0, accidenteIncapacitante: 0, accidenteMortal: 0, diasPerdidos: 0, hhtt: 136191, IF: 0.00, IS: 0.00, IA: 0.00 },
            { mes: "Agosto", eventosSinLesion: 1, primerosAuxilios: 0, atencionMedica: 1, accidenteIncapacitante: 2, accidenteMortal: 0, diasPerdidos: 48, hhtt: 134831, IF: 14.83, IS: 356.00, IA: 5.28 },
            { mes: "Septiembre", eventosSinLesion: 3, primerosAuxilios: 0, atencionMedica: 0, accidenteIncapacitante: 0, accidenteMortal: 0, diasPerdidos: 0, hhtt: 147003, IF: 0.00, IS: 0.00, IA: 0.00 },
            { mes: "Octubre", eventosSinLesion: 1, primerosAuxilios: 0, atencionMedica: 0, accidenteIncapacitante: 0, accidenteMortal: 0, diasPerdidos: 0, hhtt: 165825, IF: 0.00, IS: 0.00, IA: 0.00 },
            { mes: "Noviembre", eventosSinLesion: 4, primerosAuxilios: 0, atencionMedica: 0, accidenteIncapacitante: 0, accidenteMortal: 0, diasPerdidos: 0, hhtt: 189301, IF: 0.00, IS: 0.00, IA: 0.00 },
            { mes: "Diciembre", eventosSinLesion: 5, primerosAuxilios: 0, atencionMedica: 1, accidenteIncapacitante: 1, accidenteMortal: 0, diasPerdidos: 30, hhtt: 151953, IF: 6.58, IS: 197.43, IA: 1.30 }
        ],
        2025: [
            { mes: "Enero", eventosSinLesion: 5, primerosAuxilios: 0, atencionMedica: 0, accidenteIncapacitante: 0, accidenteMortal: 0, diasPerdidos: 0, hhtt: 135307, IF: 0.00, IS: 0.00, IA: 0.00 },
            { mes: "Febrero", eventosSinLesion: 2, primerosAuxilios: 0, atencionMedica: 1, accidenteIncapacitante: 1, accidenteMortal: 0, diasPerdidos: 15, hhtt: 152083, IF: 6.58, IS: 98.63, IA: 0.65 },
            { mes: "Marzo", eventosSinLesion: 3, primerosAuxilios: 1, atencionMedica: 3, accidenteIncapacitante: 0, accidenteMortal: 0, diasPerdidos: 0, hhtt: 163852, IF: 0.00, IS: 0.00, IA: 0.00 },
            { mes: "Abril", eventosSinLesion: 4, primerosAuxilios: 1, atencionMedica: 2, accidenteIncapacitante: 1, accidenteMortal: 0, diasPerdidos: 29, hhtt: 164376, IF: 6.08, IS: 176.43, IA: 1.07 },
            { mes: "Mayo", eventosSinLesion: 2, primerosAuxilios: 0, atencionMedica: 2, accidenteIncapacitante: 2, accidenteMortal: 0, diasPerdidos: 6, hhtt: 141942, IF: 14.09, IS: 42.27, IA: 0.60 },
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