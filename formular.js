/* rg-44 (T-32b, Option A Josch 27.10.): Formulare im Ekvit-Design, Absenden im Hintergrund an Google Forms
   (formResponse, mode no-cors – keine Antwort lesbar, daher wöchentlicher Testeintrag als Kipp).
   Kein iFrame, keine Cookies, keine fremden Skripte. Ohne JavaScript schickt der Browser das Formular
   direkt an dieselbe Adresse (Bestätigungsseite von Google). */
(function () {
  function zeigen(f, art) {
    var box = f.parentNode.querySelector('.form-' + art);
    if (art === 'ok') { f.hidden = true; }
    if (box) { box.hidden = false; box.focus(); }
  }
  document.querySelectorAll('form[data-formular]').forEach(function (f) {
    var knopf = f.querySelector('button[type=submit]');
    var text = knopf ? knopf.textContent : '';
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if (f.elements.website && f.elements.website.value) { zeigen(f, 'ok'); return; }  // Spam-Falle
      if (!f.reportValidity()) { return; }
      var daten = new URLSearchParams();
      new FormData(f).forEach(function (wert, name) {
        if (name.indexOf('entry.') === 0 && String(wert).trim()) { daten.append(name, String(wert).trim()); }
      });
      if (knopf) { knopf.disabled = true; knopf.textContent = 'Wird gesendet …'; }
      fetch(f.action, { method: 'POST', mode: 'no-cors', body: daten, credentials: 'omit' })
        .then(function () { zeigen(f, 'ok'); })
        .catch(function () {
          zeigen(f, 'fehler');
          if (knopf) { knopf.disabled = false; knopf.textContent = text; }
        });
    });
  });
})();
