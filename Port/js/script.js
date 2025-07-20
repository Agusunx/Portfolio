document.addEventListener('DOMContentLoaded', () => {
    // 1. Efecto de aparición (fade-in y slide-up) para las secciones al hacer scroll
    const sections = document.querySelectorAll('section');

    const fadeInOnScroll = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;

            // Si la sección está visible en la ventana (más del 15% de la altura de la pantalla)
            if (sectionTop < screenHeight * 0.85 && sectionTop > -section.offsetHeight * 0.5) {
                section.classList.add('visible');
            } else {
                // Opcional: Para resetear la animación si se sale de vista (menos común en portfolios)
                // section.classList.remove('visible');
            }
        });
    };

    // Ejecutar al cargar y al hacer scroll
    window.addEventListener('scroll', fadeInOnScroll);
    fadeInOnScroll(); // Ejecutar al inicio para que las secciones en la vista inicial aparezcan


    // 2. Destacar el enlace de navegación activo al hacer scroll
    const navLinks = document.querySelectorAll('nav ul li a');

    const highlightNavLink = () => {
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            // Ajustar el offset para que el enlace se active un poco antes de llegar al top de la sección
            if (scrollY >= sectionTop - 100 && scrollY < sectionTop + sectionHeight - 100) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSectionId)) {
                link.classList.add('active');
            }
        });
    };

    // Ejecutar al cargar y al hacer scroll
    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink(); // Ejecutar al inicio

    // 3. Smooth scroll para los enlaces de ancla (ya lo hace el CSS, esto es un extra)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Solo para enlaces internos (que empiezan con #)
            if (this.hash !== '') {
                e.preventDefault(); // Evita el comportamiento predeterminado del salto de ancla

                const targetId = this.hash;
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    // Calcula la posición a la que scrolllear (ajustando por si hay un fixed header)
                    const offsetTop = targetElement.offsetTop - (document.querySelector('header').offsetHeight || 0); 
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });

                    // Cierra el menú hamburguesa si está abierto (solo si aplicas Bootstrap o un menú JS)
                    // const navbarCollapse = document.getElementById('navbarNav');
                    // if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    //     new bootstrap.Collapse(navbarCollapse, { toggle: false }).hide();
                    // }
                }
            }
        });
    });
});