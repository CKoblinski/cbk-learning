/* ========================================
   CBK Learning — Main JS
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ---- Intersection Observer for fade-up animations ----
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));

  // ---- Mobile hamburger menu ----
  const hamburger = document.querySelector('.nav__hamburger');
  const navLinks = document.querySelector('.nav__links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('is-open');
      navLinks.classList.toggle('is-open');
    });
  }

  // ---- Testimonial carousel arrows ----
  document.querySelectorAll('.ai-testimonials__carousel').forEach((carousel) => {
    const track = carousel.querySelector('.ai-testimonials__track');
    const leftBtn = carousel.querySelector('.ai-testimonials__arrow--left');
    const rightBtn = carousel.querySelector('.ai-testimonials__arrow--right');
    if (!track || !leftBtn || !rightBtn) return;

    const scrollAmount = 370; // card width + gap

    leftBtn.addEventListener('click', () => {
      track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    rightBtn.addEventListener('click', () => {
      track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  });
});
