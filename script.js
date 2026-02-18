// ==========================================
//  AGUSTÍN NAVARRO — Portfolio script.js
// ==========================================

// ---- NAVBAR SCROLL ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ---- HAMBURGER / MOBILE MENU ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

function closeMobileMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
}

// ---- SCROLL REVEAL ----
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // Staggered delay based on siblings
            const siblings = [...entry.target.parentElement.children].filter(el => el.classList.contains('reveal'));
            const idx = siblings.indexOf(entry.target);
            entry.target.style.transitionDelay = (idx * 0.08) + 's';
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => revealObserver.observe(el));

// ---- ACTIVE NAV LINK ----
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(l => l.style.color = '');
            const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
            if (active) active.style.color = '#c8f135';
        }
    });
}, { threshold: 0.4 });

sections.forEach(s => activeObserver.observe(s));

// ---- SMOOTH SCROLL NAV ----
navLinks.forEach(link => {
    link.addEventListener('click', e => {
        const hash = link.getAttribute('href');
        if (!hash.startsWith('#')) return;
        e.preventDefault();
        const target = document.querySelector(hash);
        if (target) {
            const offset = target.offsetTop - 80;
            window.scrollTo({ top: offset, behavior: 'smooth' });
        }
    });
});

// ---- CONTACT FORM ----
const form   = document.getElementById('cform');
const formOk = document.getElementById('formOk');

if (form) {
    form.addEventListener('submit', async e => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const orig = btn.innerHTML;
        btn.innerHTML = 'Enviando...';
        btn.disabled = true;

        try {
            const res = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });
            if (res.ok) {
                form.reset();
                if (formOk) { formOk.classList.add('show'); }
                btn.innerHTML = '¡Enviado! ✓';
            } else {
                throw new Error();
            }
        } catch {
            btn.innerHTML = 'Error — intentá de nuevo';
            btn.disabled = false;
            setTimeout(() => { btn.innerHTML = orig; }, 3000);
        }
    });
}

// ---- TYPING EFFECT en hero role ----
const roleEl = document.querySelector('.hero-role');
if (roleEl) {
    const phrases = [
        'Junior Software Developer',
        'Frontend Developer',
        'JavaScript · React · Python',
    ];
    let pi = 0, ci = 0, deleting = false;

    // Start after animation ends
    setTimeout(() => {
        roleEl.textContent = '';
        function type() {
            const current = phrases[pi];
            if (!deleting) {
                roleEl.textContent = current.slice(0, ++ci);
                if (ci === current.length) {
                    deleting = true;
                    setTimeout(type, 2200);
                    return;
                }
            } else {
                roleEl.textContent = current.slice(0, --ci);
                if (ci === 0) {
                    deleting = false;
                    pi = (pi + 1) % phrases.length;
                }
            }
            setTimeout(type, deleting ? 35 : 65);
        }
        type();
    }, 1400);
}
