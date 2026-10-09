/* ---- Preloader ---- */
    window.addEventListener('load', () => {
        setTimeout(() => document.getElementById('preloader').classList.add('hidden'), 1700);
    });

    /* ---- AOS ---- */
    AOS.init({ duration: 680, once: true, offset: 55 });

    /* ---- Contador animado ---- */
    function animateCounter(el) {
        const target = parseInt(el.dataset.target, 10);
        const fps    = 1000 / 60;
        const steps  = Math.round(1600 / fps);
        const inc    = target / steps;
        let   cur    = 0;
        const id = setInterval(() => {
            cur += inc;
            if (cur >= target) { el.textContent = target; clearInterval(id); }
            else                { el.textContent = Math.floor(cur); }
        }, fps);
    }

    const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting && !e.target.dataset.done) {
                e.target.dataset.done = '1';
                animateCounter(e.target);
            }
        });
    }, { threshold: .5 });

    document.querySelectorAll('.counter').forEach(el => io.observe(el));

    /* ---- Header sombra al scroll ---- */
    window.addEventListener('scroll', () => {
        document.getElementById('siteHeader').classList.toggle('scrolled', window.scrollY > 20);
        document.getElementById('fabTop').style.display = window.scrollY > 400 ? 'flex' : 'none';
    });

    /* ---- Scroll suave interno ---- */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const t = document.querySelector(a.getAttribute('href'));
            if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        });
    });

    /* ---- Ir arriba ---- */
    function scrollTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

    /* ---- Modal emergencias ---- */
    let emergModalInst;
    function showEmergModal() {
        if (!emergModalInst) emergModalInst = new bootstrap.Modal(document.getElementById('emergModal'));
        emergModalInst.show();
    }

    /* ---- Formulario de reporte ---- */
    function handleSubmit(e) {
        e.preventDefault();
        const tipo = document.getElementById('tipoRiesgo').value;
        const desc = document.getElementById('descReporte').value.trim();
        if (!tipo || !desc) {
            alert('Por favor completa los campos obligatorios (*).');
            return;
        }
        document.getElementById('formContent').style.display = 'none';
        document.getElementById('formSuccess').style.display  = 'block';
    }

    function resetForm() {
        document.getElementById('reportForm').reset();
        document.getElementById('formContent').style.display = 'block';
        document.getElementById('formSuccess').style.display  = 'none';
    }