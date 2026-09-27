// Research: APA / BibTeX toggle and per-entry copy buttons.
(function () {
  var pubs = document.querySelector('.pubs');
  if (!pubs) return;
  var toggles = pubs.querySelectorAll('.seg button');
  var timer;

  toggles.forEach(function (b) {
    b.addEventListener('click', function () {
      pubs.dataset.format = b.dataset.format;
      toggles.forEach(function (t) { t.setAttribute('aria-pressed', String(t === b)); });
    });
  });

  pubs.querySelectorAll('.pub').forEach(function (pub) {
    var btn = pub.querySelector('.copy-btn');
    btn.addEventListener('click', function () {
      var src = pub.querySelector(pubs.dataset.format === 'bibtex' ? '.pub-bib' : '.pub-apa');
      var text = src.textContent.replace(/\s+\n/g, '\n').trim();
      if (pubs.dataset.format !== 'bibtex') text = text.replace(/\s+/g, ' ');
      var done = function () {
        pubs.querySelectorAll('.copy-btn').forEach(function (c) { c.textContent = 'Copy'; });
        btn.textContent = 'Copied ✓';
        clearTimeout(timer);
        timer = setTimeout(function () { btn.textContent = 'Copy'; }, 1600);
      };
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, done);
      else done();
    });
  });
})();
