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
