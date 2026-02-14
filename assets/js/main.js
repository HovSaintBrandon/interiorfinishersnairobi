document.addEventListener('DOMContentLoaded', () => {
    // ---- Navbar scroll ----
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  
    // ---- Mobile menu ----
    const toggle = document.getElementById('mobileToggle');
    const menu = document.getElementById('mobileMenu');
    
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('open');
            toggle.innerHTML = menu.classList.contains('open') ? '&#10005;' : '&#9776;';
        });
        
        menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
            menu.classList.remove('open');
            toggle.innerHTML = '&#9776;';
        }));
    }
  
    // ---- Project filter ----
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        
        // Simple filtering with GSAP for smoothness if available, else standard
        if (typeof gsap !== 'undefined') {
             // GSAP implementation for filtering
             projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.cat === filter) {
                    card.style.display = 'block';
                    gsap.to(card, { duration: 0.4, opacity: 1, scale: 1, ease: 'power2.out' });
                } else {
                    gsap.to(card, { duration: 0.3, opacity: 0, scale: 0.9, onComplete: () => {
                        card.style.display = 'none';
                    }});
                }
             });
        } else {
            // Fallback
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.cat === filter) {
                  card.style.display = '';
                  setTimeout(() => card.classList.add('visible'), 50);
                } else {
                  card.style.display = 'none';
                  card.classList.remove('visible');
                }
              });
        }
      });
    });
  });
