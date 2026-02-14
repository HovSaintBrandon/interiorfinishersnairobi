document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial setup to hide elements that will be animated
    gsap.set(".fade-up, .fade-left, .fade-right", { opacity: 0, y: 50 });
    gsap.set(".hero-content .subtitle", { opacity: 0, y: 30 });
    gsap.set(".hero-content h1", { opacity: 0, y: 50 });
    gsap.set(".hero-content p", { opacity: 0, y: 30 });
    gsap.set(".hero-btns", { opacity: 0, y: 30 });

    // Hero Section Sequence
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    heroTl
        .to(".hero-content .subtitle", { duration: 1, opacity: 1, y: 0, delay: 0.2 })
        .to(".hero-content h1", { duration: 1, opacity: 1, y: 0 }, "-=0.6")
        .to(".hero-content p", { duration: 0.8, opacity: 1, y: 0 }, "-=0.6")
        .to(".hero-btns", { duration: 0.8, opacity: 1, y: 0 }, "-=0.6");

    // General Scroll Reveal
    // Use a utility function to batch similar animations
    const animateOnScroll = (selector, fromVars) => {
        gsap.utils.toArray(selector).forEach(element => {
            gsap.fromTo(element,
                fromVars,
                {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    };

    // Staggered lists (Services, Process, keys)
    const staggerOnScroll = (parentSelector, childSelector, fromVars, staggerAmount = 0.2) => {
        const parent = document.querySelector(parentSelector);
        if (parent) {
            gsap.fromTo(parent.querySelectorAll(childSelector),
                fromVars,
                {
                    opacity: 1,
                    y: 0,
                    x: 0,
                    duration: 0.8,
                    stagger: staggerAmount,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: parent,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }
    };

    // Apply animations
    animateOnScroll(".about-text", { opacity: 0, x: 50 });
    animateOnScroll(".about-img-wrap", { opacity: 0, x: -50 });
    animateOnScroll(".section-header", { opacity: 0, y: 30 });
    animateOnScroll(".contact-info", { opacity: 0, x: -30 });
    animateOnScroll(".contact-form", { opacity: 0, x: 30 });

    // Staggered Service Cards
    staggerOnScroll(".services-grid", ".service-card", { opacity: 0, y: 30 });

    // Staggered Process Steps
    staggerOnScroll(".process-grid", ".process-step", { opacity: 0, y: 30, x: -10 }, 0.15);

    // Staggered Projects (Initial load)
    staggerOnScroll(".projects-grid", ".project-card", { opacity: 0, scale: 0.95 }, 0.1);

    // Staggered Why Us Cards
    staggerOnScroll(".why-grid", ".why-card", { opacity: 0, y: 20 }, 0.1);

    // Parallax Effect for Hero Background
    gsap.to(".hero-bg img", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });
});
