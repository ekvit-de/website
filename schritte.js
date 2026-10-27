/* rg-41: Produkt – Schritte laufen links, Mockup steht rechts (sticky). Ohne JS: Mockups direkt unter jedem Schritt. */
(function () {
  var wrap = document.querySelector(".st-wrap");
  if (!wrap || !("IntersectionObserver" in window)) return;
  document.documentElement.classList.add("js-st");
  var panels = wrap.querySelectorAll(".st-panel");
  var io = new IntersectionObserver(function (eintraege) {
    eintraege.forEach(function (e) {
      if (!e.isIntersecting) return;
      var i = e.target.getAttribute("data-i");
      wrap.querySelectorAll(".st-schritt").forEach(function (s) { s.classList.toggle("an", s === e.target); });
      var treffer = wrap.querySelector('.st-panel[data-i="' + i + '"]');
      if (!treffer) return;
      panels.forEach(function (p) { p.classList.toggle("an", p === treffer); });
    });
  }, { rootMargin: "-45% 0px -45% 0px" });
  wrap.querySelectorAll(".st-schritt").forEach(function (s) { io.observe(s); });
})();
