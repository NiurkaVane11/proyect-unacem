/*
   ARCHIVO: app.js - LIMPIO Y OPTIMIZADO CON RESPONSIVE FIXED
*/

// ========== INICIALIZACIÓN PRINCIPAL ==========
document.addEventListener('DOMContentLoaded', function() {
    
    // Renderizar datos iniciales
    Components.renderMetrics(appData.metricas);
    Components.renderGauge(appData.gauge);
    Components.renderProjectsTable(appData.proyectos);
    Components.renderRiskFactors(appData.factoresRiesgo);
    Components.renderHistoryTable(appData.historico);
    Components.renderEstadisticas(2025);
    
    // ========== ELEMENTOS DOM ==========
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');
    const pageTitle = document.getElementById('pageTitle');
    const btnToggle = document.getElementById('btnToggleSidebar');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    const titles = {
        'indicadores': 'Indicadores',
        'puntos-vida': 'Puntos de Vida',
        'proyectos-activos': 'Proyectos Activos',
        'estadisticas': 'Estadísticas',
        'factores-riesgo': 'Factores de Riesgo',
        'historial': 'Historial de Predicciones'
    };
    
    // ========== CREAR OVERLAY ==========
    let overlay = document.querySelector('.sidebar-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);
    }
    
    // ========== FUNCIONES MENÚ ==========
    function closeSidebar() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function openSidebar() {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // ========== NAVEGACIÓN DEL SIDEBAR ==========
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
            
            // CERRAR MENÚ EN MÓVIL
            if (window.innerWidth <= 1024) {
                setTimeout(closeSidebar, 200);
            }
        });
    });
    
    // ========== MENÚ HAMBURGUESA ==========
    if (btnToggle && sidebar) {
        // Toggle sidebar al hacer clic en el botón
        btnToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (sidebar.classList.contains('active')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });

        // Cerrar al hacer clic en el overlay
        overlay.addEventListener('click', function() {
            closeSidebar();
        });

        // Cerrar al redimensionar a escritorio
        window.addEventListener('resize', function() {
            if (window.innerWidth > 1024) {
                closeSidebar();
            }
        });
    }
    
    // ========== FILTROS DE PROYECTOS ==========
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            Components.renderProjectsTable(appData.proyectos, filter);
        });
    });
    
    // ========== BOTÓN DE ACTUALIZAR ==========
    const btnRefresh = document.querySelector('.btn-refresh');
    if (btnRefresh) {
        btnRefresh.addEventListener('click', function() {
            this.textContent = '🔄 Actualizando...';
            this.disabled = true;
            
            setTimeout(() => {
                updateClock();
                Components.renderMetrics(appData.metricas);
                Components.renderGauge(appData.gauge);
                Components.renderProjectsTable(appData.proyectos);
                
                this.textContent = '🔄 Actualizar';
                this.disabled = false;
                
                alert('✅ Datos actualizados correctamente');
            }, 1500);
        });
    }
    
    


















    // ========== FILTROS ==========
    const periodFilter = document.getElementById('periodFilter');
    if (periodFilter) {
        periodFilter.addEventListener('change', function() {
            console.log('Período seleccionado:', this.value);
            Components.renderHistoryTable(appData.historico);
        });
    }
    
    const yearFilterStats = document.getElementById('yearFilterStats');
    if (yearFilterStats) {
        yearFilterStats.addEventListener('change', function() {
            Components.renderEstadisticas(parseInt(this.value));
        });
    }
    
    // ========== BOTÓN GENERAR REPORTE PDF ==========
    const btnGenerarReporte = document.getElementById('btnGenerarReporte');
    if (btnGenerarReporte) {
        btnGenerarReporte.addEventListener('click', function() {
            this.textContent = '⏳ Generando PDF...';
            this.disabled = true;
            
            setTimeout(() => {
                generarReportePDF();
                
                this.textContent = '📊 Generar Reporte PDF';
                this.disabled = false;
                
                alert('✅ Reporte PDF generado exitosamente!');
            }, 500);
        });
    }
    
    // Inicializar reloj
    updateClock();
    
}); // FIN DOMContentLoaded

// ========== FUNCIÓN ACTUALIZAR RELOJ ==========
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