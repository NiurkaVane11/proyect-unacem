/*
   ARCHIVO: app.js
   Lógica principal del Dashboard LifeGuard - UNACEM
*/

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== 1. INICIALIZACIÓN DE DATOS ==========
    // Cargar todos los componentes con los datos de data.js
    try {
        Components.renderMetrics(appData.metricas);
        Components.renderGauge(appData.gauge);
        Components.renderProjectsTable(appData.proyectos);
        Components.renderRiskFactors(appData.factoresRiesgo);
        
        // Si existe historial en data.js, renderizarlo (opcional según tu HTML)
        if(appData.historico) {
            // Verifica si existe la función antes de llamarla por si acaso
            if(Components.renderHistoryTable) Components.renderHistoryTable(appData.historico);
        }

        // Cargar estadísticas iniciales (Default: 2025)
        // Asegúrate de que el año exista en data.js
        const defaultYear = 2025;
        if(appData.estadisticasHistoricas && appData.estadisticasHistoricas[defaultYear]) {
            Components.renderEstadisticas(defaultYear);
        }
    } catch (error) {
        console.error("Error inicializando componentes:", error);
    }
    
    // ========== 2. REFERENCIAS AL DOM ==========
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');
    const pageTitle = document.getElementById('pageTitle');
    const btnToggle = document.getElementById('btnToggleSidebar');
    const sidebar = document.querySelector('.sidebar');
    
    // Mapeo de títulos para el encabezado según la sección
    const titles = {
        'indicadores': 'Monitoreo de Seguridad Industrial',
        'puntos-vida': 'Programa "Puntos de Vida"',
        'mapas-calor': 'Mapas de Calor - Simulación',
        'proyectos-activos': 'Estado de Riesgo por Área',
        'estadisticas': 'Analítica Predictiva & Históricos',
        'factores-riesgo': 'Factores de Riesgo Críticos',
        'historial': 'Historial de Predicciones'
    };
    
    // ========== 3. LÓGICA DEL SIDEBAR (RESPONSIVE) ==========
    
    // Crear overlay si no existe
    let overlay = document.querySelector('.sidebar-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);
    }
    
    function closeSidebar() {
        if(sidebar) sidebar.classList.remove('active');
        if(overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function openSidebar() {
        if(sidebar) sidebar.classList.add('active');
        if(overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Evento Toggle Hamburguesa
    if (btnToggle) {
        btnToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (sidebar.classList.contains('active')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
    }

    // Cerrar al hacer clic fuera (Overlay)
    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }

    // Navegación
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Activar ítem visualmente
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Cambiar sección
            const sectionId = this.getAttribute('data-section');
            sections.forEach(section => section.classList.remove('active'));
            
            const activeSection = document.getElementById('section-' + sectionId);
            if (activeSection) {
                activeSection.classList.add('active');
            }
            
            // Actualizar Título
            if (pageTitle) {
                pageTitle.textContent = titles[sectionId] || 'Dashboard UNACEM';
            }
            
            // Cerrar menú en móvil automáticamente al seleccionar
            if (window.innerWidth <= 1024) {
                closeSidebar();
            }
        });
    });
    
    // ========== 4. FILTROS Y EVENTOS ==========
    
    // Filtros de Proyectos/Áreas
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            Components.renderProjectsTable(appData.proyectos, filter);
        });
    });
    
    // Filtro de Año para Estadísticas
    const yearFilterStats = document.getElementById('yearFilterStats');
    if (yearFilterStats) {
        yearFilterStats.addEventListener('change', function() {
            const selectedYear = parseInt(this.value);
            Components.renderEstadisticas(selectedYear);
        });
    }

    // Botón de Actualizar (Simulación)
    const btnRefresh = document.querySelector('.btn-refresh');
    if (btnRefresh) {
        btnRefresh.addEventListener('click', function() {
            const originalText = this.textContent;
            this.textContent = '🔄 Procesando...';
            this.disabled = true;
            
            setTimeout(() => {
                updateClock();
                // Aquí podrías llamar a una función para traer nuevos datos aleatorios si quisieras
                // Por ahora solo refrescamos la vista
                Components.renderMetrics(appData.metricas);
                Components.renderGauge(appData.gauge);
                
                this.textContent = originalText;
                this.disabled = false;
                
                // Feedback visual simple
                alert('✅ Modelo Random Forest actualizado con éxito.\nNuevos datos ingestados.');
            }, 1000);
        });
    }
    
    // Botón Generar PDF
    const btnGenerarReporte = document.getElementById('btnGenerarReporte');
    if (btnGenerarReporte) {
        btnGenerarReporte.addEventListener('click', function() {
            const originalText = this.innerHTML; // Guardar el icono
            this.textContent = '⏳ Generando...';
            this.disabled = true;
            
            setTimeout(() => {
                if (typeof generarReportePDF === 'function') {
                    generarReportePDF();
                    // Restaurar botón
                    this.innerHTML = originalText;
                    this.disabled = false;
                } else {
                    console.error("La función generarReportePDF no está cargada.");
                    this.textContent = 'Error';
                }
            }, 800);
        });
    }
    
    // ========== 5. RELOJ ==========
    function updateClock() {
        const updateTimeEl = document.getElementById('updateTime');
        if (!updateTimeEl) return;
        
        const now = new Date();
        const timeString = now.toLocaleTimeString('es-EC', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
        updateTimeEl.textContent = `Actualizado: Hoy ${timeString}`;
    }

    // Iniciar reloj y actualizar cada minuto
    updateClock();
    setInterval(updateClock, 60000);

});