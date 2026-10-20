/* ============================================================
   Wentan Huang — personal site
   Progressive enhancement only: the page is fully readable without this file.
   ============================================================ */
(function () {
  'use strict';

  var root = document.documentElement;
  var media = window.matchMedia('(prefers-color-scheme: dark)');

  /* ---------- theme toggle ---------- */
  var toggle = document.querySelector('[data-theme-toggle]');

  function effectiveTheme() {
    if (root.dataset.theme === 'light' || root.dataset.theme === 'dark') return root.dataset.theme;
    return media.matches ? 'dark' : 'light';
  }

  function syncToggleLabel() {
    if (!toggle) return;
    toggle.setAttribute('aria-label', 'Switch to ' + (effectiveTheme() === 'dark' ? 'light' : 'dark') + ' theme');
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = effectiveTheme() === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) {}
      syncToggleLabel();
    });

    // system preference changes only matter while the user hasn't chosen explicitly
    media.addEventListener('change', function () {
      if (!root.dataset.theme) syncToggleLabel();
    });

    syncToggleLabel();
  }

  /* ---------- local clock (Shenzhen) ---------- */
  var clock = document.getElementById('clock');
  if (clock) {
    try {
      var fmt = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Shanghai',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      var tick = function () { clock.textContent = fmt.format(new Date()); };
      tick();
      setInterval(tick, 15000);
    } catch (e) {
      clock.textContent = 'UTC+8';
    }
  }

  /* ---------- footer year ---------- */
  var years = document.querySelectorAll('[data-year]');
  for (var i = 0; i < years.length; i++) years[i].textContent = new Date().getFullYear();

  /* ---------- reveal sections on scroll ---------- */
  var items = document.querySelectorAll('.reveal');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!('IntersectionObserver' in window) || reduce) {
    for (var j = 0; j < items.length; j++) items[j].classList.add('is-in');
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

  for (var k = 0; k < items.length; k++) io.observe(items[k]);
})();
