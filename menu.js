// Мобильное меню: открытие по бургеру
(function () {
  var hdr = document.querySelector('.hdr');
  var burger = document.querySelector('.burger');
  if (!hdr || !burger) return;

  function close() {
    hdr.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    burger.setAttribute('aria-expanded', 'false');
  }

  burger.setAttribute('aria-expanded', 'false');

  burger.addEventListener('click', function (e) {
    e.stopPropagation();
    var open = hdr.classList.toggle('is-open');
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // закрыть по клику на пункт меню
  hdr.querySelectorAll('.nav a').forEach(function (a) {
    a.addEventListener('click', close);
  });

  // закрыть по клику вне меню и по Esc
  document.addEventListener('click', function (e) {
    if (hdr.classList.contains('is-open') && !hdr.contains(e.target)) close();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 1180) close();
  });
})();
