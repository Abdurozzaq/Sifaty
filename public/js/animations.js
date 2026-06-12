/**
 * Anime.js — animasi halus & minimal
 */
(function () {
  if (typeof anime === 'undefined') return;

  // Background orbs — gerakan pelan
  anime({
    targets: '.bg-orb',
    translateX: () => anime.random(-30, 30),
    translateY: () => anime.random(-20, 20),
    scale: [1, 1.08],
    duration: () => anime.random(8000, 12000),
    easing: 'easeInOutSine',
    direction: 'alternate',
    loop: true,
    delay: anime.stagger(2000),
  });

  window.sifatyAnim = {
    pageEnter() {
      anime({
        targets: '.anim-fade-up',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 500,
        easing: 'easeOutCubic',
        delay: anime.stagger(60, { start: 100 }),
      });

      anime({
        targets: '.anim-scale-in',
        opacity: [0, 1],
        scale: [0.96, 1],
        duration: 450,
        easing: 'easeOutCubic',
        delay: anime.stagger(80, { start: 150 }),
      });
    },

    questionEnter() {
      const card = document.getElementById('question-card');
      if (!card) return;
      anime.remove(card);
      card.style.opacity = '1';
      card.style.transform = 'translateX(0)';
      anime({
        targets: card,
        opacity: [0.4, 1],
        translateX: [16, 0],
        duration: 350,
        easing: 'easeOutQuad',
      });
    },

    progressBar(el, percent) {
      if (!el) return;
      anime({
        targets: el,
        width: `${percent}%`,
        duration: 600,
        easing: 'easeOutExpo',
      });
    },

    scoreBars() {
      document.querySelectorAll('.score-bar').forEach((bar) => {
        const target = bar.dataset.score || '0';
        anime({
          targets: bar,
          width: `${target}%`,
          duration: 900,
          easing: 'easeOutExpo',
          delay: anime.stagger(100, { start: 200 }),
        });
      });
    },

    hollandCode(el) {
      if (!el) return;
      anime({
        targets: el,
        opacity: [0, 1],
        scale: [0.9, 1],
        duration: 700,
        easing: 'easeOutElastic(1, .6)',
      });
    },

    toastShow(el) {
      if (!el) return;
      anime({
        targets: el,
        opacity: [0, 1],
        translateY: [12, 0],
        duration: 300,
        easing: 'easeOutQuad',
      });
    },

    likertSelect(btn) {
      if (!btn || typeof anime === 'undefined') return;
      anime({
        targets: btn,
        scale: [1, 1.06, 1],
        duration: 300,
        easing: 'easeOutQuad',
      });
    },

    resultCelebration() {
      anime({
        targets: '.result-hero > *',
        opacity: [0, 1],
        translateY: [16, 0],
        duration: 500,
        easing: 'easeOutCubic',
        delay: anime.stagger(120, { start: 200 }),
      });
    },
  };
})();
