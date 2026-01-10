/*
   ARCHIVO: app.js
*/

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    
    // Renderizar datos iniciales
    Components.renderMetrics(appData.metricas);
    Components.renderGauge(appData.gauge);
    Components.renderProjectsTable(appData.proyectos);
    Components.renderRiskFactors(appData.factoresRiesgo);
    Components.renderHistoryTable(appData.historico);
    Components.renderEstadisticas(2025);
    
    // Navegación del Sidebar
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');
    const pageTitle = document.getElementById('pageTitle');
    
    const titles = {
        'indicadores': 'Indicadores',
        'proyectos-activos': 'Proyectos Activos',
        'estadisticas': 'Estadísticas',
        'factores-riesgo': 'Factores de Riesgo',
        'historial': 'Historial de Predicciones',
        'prevencion': 'Lista de Prevención'
    };
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover clase active de todos los items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Agregar clase active al item clickeado
            this.classList.add('active');
            
            // Obtener la sección a mostrar
            const sectionId = this.getAttribute('data-section');
            
            // Ocultar todas las secciones
            sections.forEach(section => section.classList.remove('active'));
            
            // Mostrar la sección seleccionada
            const activeSection = document.getElementById('section-' + sectionId);
            if (activeSection) {
                activeSection.classList.add('active');
            }
            
            // Actualizar el título
            pageTitle.textContent = titles[sectionId] || 'Dashboard';
        });
    });
    
    // Filtros de proyectos
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover active de todos
            filterButtons.forEach(b => b.classList.remove('active'));
            
            // Agregar active al clickeado
            this.classList.add('active');
            
            // Obtener el filtro
            const filter = this.getAttribute('data-filter');
            
            // Re-renderizar la tabla con el filtro
            Components.renderProjectsTable(appData.proyectos, filter);
        });
    });
    
    // Botón de actualizar
    const btnRefresh = document.querySelector('.btn-refresh');
    btnRefresh.addEventListener('click', function() {
        this.textContent = '🔄 Actualizando...';
        this.disabled = true;
        
        // Simular actualización
        setTimeout(() => {
            // Actualizar hora
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const displayHours = hours % 12 || 12;
            const timeString = `Hoy ${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
            document.getElementById('updateTime').textContent = timeString;
            
            // Re-renderizar componentes
            Components.renderMetrics(appData.metricas);
            Components.renderGauge(appData.gauge);
            Components.renderProjectsTable(appData.proyectos);
            
            this.textContent = '🔄 Actualizar';
            this.disabled = false;
            
            alert('✅ Datos actualizados correctamente');
        }, 1500);
    });
    
    // Filtro de período en histórico
    const periodFilter = document.getElementById('periodFilter');
    if (periodFilter) {
        periodFilter.addEventListener('change', function() {
            console.log('Período seleccionado:', this.value);
            Components.renderHistoryTable(appData.historico);
        });
    }
    
    // Filtro de año para estadísticas
    const yearFilterStats = document.getElementById('yearFilterStats');
    if (yearFilterStats) {
        yearFilterStats.addEventListener('change', function() {
            Components.renderEstadisticas(parseInt(this.value));
        });
    }
    
    // Botón generar reporte mensual
 
// Botón generar reporte mensual
const btnGenerarReporte = document.getElementById('btnGenerarReporte');
if (btnGenerarReporte) {
    btnGenerarReporte.addEventListener('click', function() {
        this.textContent = '⏳ Generando PDF...';
        this.disabled = true;
        
        setTimeout(() => {
            generarReportePDF(); // <-- LLAMAR A LA FUNCIÓN
            
            this.textContent = '📄 Generar Reporte Mensual';
            this.disabled = false;
            
            alert('✅ Reporte PDF generado exitosamente!');
        }, 500);
    });
}














    
    // Botón agregar medida de prevención
    const btnAdd = document.querySelector('.btn-add');
    if (btnAdd) {
        btnAdd.addEventListener('click', function() {
            const medida = prompt('Ingrese la nueva medida preventiva:');
            if (medida && medida.trim() !== '') {
                alert('✅ Medida agregada: ' + medida);
                // Aquí podrías agregar la medida a la lista dinámicamente
            }
        });
    }
    
}); // <-- CIERRE DEL DOMContentLoaded

// Función para actualizar la hora en tiempo real
function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    const timeString = `Hoy ${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    const updateTimeEl = document.getElementById('updateTime');
    if (updateTimeEl) {
        updateTimeEl.textContent = timeString;
    }
}

// Actualizar el reloj cada minuto
setInterval(updateClock, 60000);