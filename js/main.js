document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DEL MENÚ DE NAVEGACIÓN HAMBURGUESA ---
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isOpen = navMenu.classList.contains('active');
            navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
        });
    }

    // --- LÓGICA DE LOS BOTONES DE ACCIÓN PRINCIPALES (CTA) ---

    const btnElegirEmocion = document.getElementById('btn-elegir-emocion');
    const btnNoLoSe = document.getElementById('btn-no-lo-se');
    const btnPorQue = document.getElementById('btn-por-que');

    const subMenuEmocion = document.getElementById('sub-emocion');
    const subMenuPorQue = document.getElementById('sub-por-que');
    const galeriaSection = document.getElementById('galeria-section');

    // Función para cerrar todos los menús y secciones abiertas
    const closeAllSubsections = () => {
        subMenuEmocion.classList.remove('active');
        btnElegirEmocion.classList.remove('active');
        subMenuPorQue.classList.remove('active');
        btnPorQue.classList.remove('active');
        galeriaSection.classList.add('hidden');
    };

    // 1. Botón 'Elegir Emoción'
    btnElegirEmocion.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita que el click se propague al documento
        const isActive = subMenuEmocion.classList.contains('active');
        closeAllSubsections();
        if (!isActive) {
            subMenuEmocion.classList.add('active');
            btnElegirEmocion.classList.add('active');
        }
    });

    // 2. Botón 'No lo sé'
    btnNoLoSe.addEventListener('click', (e) => {
        window.location.href = 'no-lo-se.html';
    });

    // 3. Botón '¿Por qué?'
    btnPorQue.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = subMenuPorQue.classList.contains('active');
        closeAllSubsections();
        if (!isActive) {
            subMenuPorQue.classList.add('active');
            btnPorQue.classList.add('active');
        }
    });

    // Cerrar submenús si se hace clic fuera de ellos
    document.addEventListener('click', () => {
        closeAllSubsections();
    });

    // Evitar que el clic dentro de los submenús los cierre
    subMenuEmocion.addEventListener('click', e => e.stopPropagation());
    subMenuPorQue.addEventListener('click', e => e.stopPropagation());

    // Lógica del cuestionario (simplificada)
    const finalizarBtn = document.getElementById('finalizar-cuestionario');
    if(finalizarBtn) {
        finalizarBtn.addEventListener('click', () => {
            const respuestas = document.querySelectorAll('.cuestionario input[type="radio"]:checked');
            if (respuestas.length === 0) {
                alert('Por favor, responde al menos una pregunta.');
                return;
            }

            const conteo = {};
            respuestas.forEach(r => {
                conteo[r.value] = (conteo[r.value] || 0) + 1;
            });

            // Encontrar la emoción más votada
            let emocionMasVotada = '';
            let maxVotos = 0;
            for (const emocion in conteo) {
                if (conteo[emocion] > maxVotos) {
                    maxVotos = conteo[emocion];
                    emocionMasVotada = emocion;
                }
            }

            alert(`La emoción predominante de tu selección es: ${emocionMasVotada}.`);
            // Aquí iría la lógica para enlazar a la sección, por ejemplo:
            window.location.href = `${emocionMasVotada}.html`;
        });
    }

    
});