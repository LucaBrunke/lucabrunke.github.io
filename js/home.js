// Home: "i" button toggles the model info popover.
(function () {
  var btn = document.querySelector('.info-btn');
  var pop = document.getElementById('model-info');
  if (!btn || !pop) return;

  function setOpen(open) {
    pop.hidden = !open;
    btn.setAttribute('aria-expanded', String(open));
  }

  btn.addEventListener('click', function () { setOpen(pop.hidden); });
  pop.querySelector('.popover-close').addEventListener('click', function () {
    setOpen(false);
    btn.focus();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !pop.hidden) { setOpen(false); btn.focus(); }
  });
})();
