# LifeGuard · UNACEM

Dashboard de **monitoreo y predicción de riesgo en seguridad industrial** desarrollado para la *Hackathon Vida Primero* de UNACEM.

🔗 **Demo:** https://niurkavane11.github.io/proyect-unacem/

## Funcionalidades
- **Predicción de riesgo diario** a partir de un modelo Random Forest entrenado con el histórico de accidentes e incidentes 2023–2025
- **Acciones recomendadas** según los factores de riesgo críticos detectados
- **Mapa de calor** de incidentes por área operativa y horario
- Tendencia del **Índice de Frecuencia (IF)** en los últimos 12 meses e histórico oficial de indicadores
- Programa de gamificación **"Puntos de Vida"** con incentivos para el personal
- **Reportes en PDF** generados en el navegador

## Tecnologías
HTML, CSS, JavaScript y jsPDF. El análisis exploratorio y el modelo se hicieron en Python; las imágenes `*.png` son resultados de ese análisis.

## Estructura
| Archivo | Contenido |
|---|---|
| `index.html` | Estructura del dashboard |
| `data.js` | Métricas y resultados del modelo |
| `app.js`, `componente.js` | Lógica e interfaz |
| `heatmap.js` | Mapa de calor |
| `reportGenerator.js` | Exportación a PDF |

## Ejecutar localmente
Abre `index.html` en el navegador. No necesita instalación.
