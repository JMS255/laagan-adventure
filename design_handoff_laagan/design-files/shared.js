/* Laagan Adventures — Shared UI Kit JS */

// ─── NAV TOGGLE ───
function initNav() {
  const toggle = document.querySelector('.nav__toggle');
  const menu   = document.querySelector('.nav__mobile');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open);
  });
}

// ─── ACCORDION ───
function initAccordions() {
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      const wasOpen = item.classList.contains('is-open');
      // Close all in same group
      const group = item.closest('[data-accordion]');
      if (group) {
        group.querySelectorAll('.accordion-item.is-open').forEach(i => i.classList.remove('is-open'));
      }
      if (!wasOpen) item.classList.add('is-open');
    });
  });
}

// ─── STEPPER ───
function initSteppers() {
  document.querySelectorAll('[data-stepper]').forEach(wrap => {
    const dec   = wrap.querySelector('[data-dec]');
    const inc   = wrap.querySelector('[data-inc]');
    const val   = wrap.querySelector('[data-val]');
    const min   = parseInt(wrap.dataset.min ?? 0);
    const max   = parseInt(wrap.dataset.max ?? 20);
    let current = parseInt(wrap.dataset.val ?? min);
    const update = () => {
      val.textContent = current;
      dec.disabled = current <= min;
      inc.disabled = current >= max;
      wrap.dispatchEvent(new CustomEvent('change', { detail: { value: current }, bubbles: true }));
    };
    dec.addEventListener('click', () => { if (current > min) { current--; update(); } });
    inc.addEventListener('click', () => { if (current < max) { current++; update(); } });
    update();
  });
}

// ─── TRAVELER FILTER ───
function initTravelerFilter() {
  const cards   = document.querySelectorAll('.traveler-card');
  const allTour = document.querySelectorAll('[data-audience]');
  if (!cards.length) return;

  function applyFilter(filter) {
    allTour.forEach(card => {
      const audiences = card.dataset.audience ? card.dataset.audience.split(',') : [];
      const show = filter === 'all' || audiences.includes(filter);
      card.style.display = show ? '' : 'none';
    });
  }

  let active = 'all';
  cards.forEach(card => {
    card.addEventListener('click', () => {
      if (card.dataset.filter === active) {
        // Deselect — show all
        active = 'all';
        cards.forEach(c => c.classList.remove('is-active'));
        applyFilter('all');
      } else {
        active = card.dataset.filter;
        cards.forEach(c => c.classList.remove('is-active'));
        card.classList.add('is-active');
        applyFilter(active);
      }
    });
  });
}

// ─── INIT ───
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initAccordions();
  initSteppers();
  initTravelerFilter();
});
