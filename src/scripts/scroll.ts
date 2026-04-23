import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollReveal() {
  // GSAP-powered scroll reveal for all .reveal elements
  const reveals = document.querySelectorAll<HTMLElement>('.reveal');

  reveals.forEach((el) => {
    // Determine delay from delay class
    let delay = 0;
    if (el.classList.contains('reveal-delay-1')) delay = 0.1;
    else if (el.classList.contains('reveal-delay-2')) delay = 0.2;
    else if (el.classList.contains('reveal-delay-3')) delay = 0.3;
    else if (el.classList.contains('reveal-delay-4')) delay = 0.4;

    gsap.set(el, { opacity: 0, y: 32 });

    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay,
          ease: 'power2.out',
        });
      },
    });
  });

  // Hero reveals on load immediately
  window.addEventListener('load', () => {
    document.querySelectorAll<HTMLElement>('#home .reveal').forEach((el, i) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: 0.1 + i * 0.12,
        ease: 'power2.out',
      });
    });
  });
}

export function initSidebarNav() {
  const sections = document.querySelectorAll<HTMLElement>('section[id]');
  const navLinks = document.querySelectorAll<HTMLAnchorElement>('.sidebar-nav a');

  const sectionObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove('active'));
          const active = document.querySelector(
            `.sidebar-nav a[data-section="${e.target.id}"]`
          );
          if (active) active.classList.add('active');
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((s) => sectionObs.observe(s));
}
