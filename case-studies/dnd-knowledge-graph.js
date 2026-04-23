/* ============================================
   D&D KNOWLEDGE GRAPH — CASE STUDY
   Scroll-triggered stats + phase expand/collapse.
   Minimal superset of dnd-pipeline.js patterns.
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Scroll-triggered stat counter animation ──
  const statCards = document.querySelectorAll('.stat-card');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const delay = parseInt(card.dataset.delay) || 0;
        setTimeout(() => {
          card.classList.add('visible');
          const numEl = card.querySelector('.stat-number');
          if (numEl) animateNumber(numEl);
        }, delay);
        statsObserver.unobserve(card);
      }
    });
  }, { threshold: 0.3 });
  statCards.forEach(card => statsObserver.observe(card));

  function animateNumber(el) {
    const target = parseFloat(el.dataset.target);
    const isDecimal = target % 1 !== 0;
    const duration = 1200;
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = target * eased;

      if (isDecimal) {
        el.textContent = current.toFixed(3).replace(/\.?0+$/, '');
      } else if (target >= 1000) {
        el.textContent = Math.round(current).toLocaleString();
      } else {
        el.textContent = Math.round(current);
      }

      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // ── Phase expand/collapse ──
  const phaseHeaders = document.querySelectorAll('.phase-header');
  phaseHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const phase = header.closest('.phase');
      phase.classList.toggle('open');
    });
  });

  // ── Fade-up on scroll (for general sections) ──
  const fadeTargets = document.querySelectorAll('.philosophy, .lesson, .kg-business-card');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  fadeTargets.forEach(el => fadeObserver.observe(el));

  // ── Smooth scroll for anchor links (if any) ──
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
