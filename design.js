/* rg-43: Sticky-Schritte der Leistungsseite (Canvas-Zustand „aktiv“) – markiert Schritt + Bildschirm-Panel mit Klasse „an“. */
(function () {
  var schritte = document.querySelectorAll('.sx-schritt[data-k]');
  if (!schritte.length) { return; }
  function setzen(n) {
    document.querySelectorAll('[data-k]').forEach(function (el) { el.classList.toggle('an', el.dataset.k === n); });
  }
  setzen('1');
  if (!('IntersectionObserver' in window)) { return; }
  var io = new IntersectionObserver(function (eintraege) {
    eintraege.forEach(function (e) { if (e.isIntersecting) { setzen(e.target.dataset.k); } });
  }, { rootMargin: '-45% 0px -45% 0px' });
  schritte.forEach(function (el) { io.observe(el); });
})();
