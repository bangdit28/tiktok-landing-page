document.addEventListener('DOMContentLoaded', function() {

    // Sticky Header
    const header = document.getElementById('main-header');
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight) {
            // Scroll Down
            header.style.top = '-100px'; // Sembunyikan header
        } else {
            // Scroll Up or at top
            header.style.top = '0';
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
        
        // Sedikit efek transparan jika di paling atas
        if (scrollTop === 0) {
            header.style.backgroundColor = 'rgba(18, 18, 18, 0.85)';
        } else {
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.95)'; // Lebih solid saat scroll
        }
    });

    // Mute/Unmute Video Hero
    const heroVideo = document.getElementById('hero-video');
    const muteToggle = document.getElementById('mute-toggle');
    if (heroVideo && muteToggle) {
        muteToggle.addEventListener('click', function() {
            heroVideo.muted = !heroVideo.muted;
            if (heroVideo.muted) {
                muteToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
            } else {
                muteToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
            }
        });
    }

    // Animasi scroll sederhana untuk section
    const sections = document.querySelectorAll('.section-padding');
    const revealSection = function(entries, observer) {
        const [entry] = entries;
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Hentikan observasi setelah animasi
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null, // viewport
        threshold: 0.15, // 15% section terlihat
    });

    sections.forEach(function(section) {
        sectionObserver.observe(section);
        // section.classList.add('section--hidden'); // Jika mau start dengan hidden
    });

    // Update tahun copyright
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Smooth scroll untuk link navigasi internal (jika diperlukan lebih lanjut)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Hanya jika link internal dan bukan hanya "#"
            if (this.getAttribute('href') !== "#" && document.querySelector(this.getAttribute('href'))) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

});