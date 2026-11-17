// Research: sidebar menu highlights the section currently in view.
(function () {
  var links = document.querySelectorAll('.toc a');
  if (!links.length || !('IntersectionObserver' in window)) return;
  var byId = {};
  links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });

  function mark(id) {
    links.forEach(function (a) { a.setAttribute('aria-current', String(a === byId[id])); });
  }

  // A section counts as current once its top passes the upper third of the viewport
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) mark(e.target.id); });
  }, { rootMargin: '0px 0px -66% 0px' });
  Object.keys(byId).forEach(function (id) {
    var sec = document.getElementById(id);
    if (sec) io.observe(sec);
  });
  mark('research');
})();

// Research: per-entry "Copy" buttons for publication citations.
(function () {
  var pubs = document.querySelector('.pubs');
  if (!pubs) return;
  var timer;

  // Citation text with any labelled link replaced by its URL
  function citationText(src) {
    var copy = src.cloneNode(true);
    copy.querySelectorAll('a[href]').forEach(function (a) {
      if (a.textContent.trim() !== a.href) a.textContent = a.href;
    });
    return copy.textContent.replace(/\s+/g, ' ').trim();
  }

  pubs.querySelectorAll('.pub').forEach(function (pub) {
    var btn = pub.querySelector('.copy-btn');
    btn.addEventListener('click', function () {
      var text = citationText(pub.querySelector('.pub-cite'));
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
