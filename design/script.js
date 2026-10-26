(function () {
  var hdr = document.querySelector('.hdr');
  var burger = document.querySelector('.burger');
  var fab = document.querySelector('.fab');
  var book = document.getElementById('booking');

  // тень у шапки и плавающая кнопка брони после первого экрана
  function onScroll() {
    var y = window.scrollY;
    hdr.classList.toggle('is-scrolled', y > 8);
    if (fab && book) fab.classList.toggle('is-on', y > book.offsetTop + book.offsetHeight);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // мобильное меню
  function setMenu(open) {
    hdr.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    hdr.querySelector('.menu').setAttribute('aria-hidden', open ? 'false' : 'true');
  }
  burger.addEventListener('click', function () { setMenu(!hdr.classList.contains('is-open')); });
  hdr.querySelectorAll('.menu a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  window.addEventListener('resize', function () { if (window.innerWidth > 1300) setMenu(false); });

  // фильтр спецпредложений
  var tagBtns = document.querySelectorAll('.tagbtn');
  tagBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      tagBtns.forEach(function (b) { b.classList.toggle('is-on', b === btn); });
      var f = btn.dataset.filter;
      var offers = document.querySelectorAll('.offer');
      var any = Array.prototype.some.call(offers, function (o) { return o.dataset.cat === f; });
      // для категории без карточек (пока «Командировки») показываем все
      offers.forEach(function (o) {
        o.classList.toggle('is-hidden', f !== 'all' && any && o.dataset.cat !== f);
      });
    });
  });

  // стрелки у лент
  document.querySelectorAll('[data-scroll]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var track = document.getElementById(btn.dataset.scroll);
      var card = track.firstElementChild;
      var step = card ? card.getBoundingClientRect().width + 20 : 380;
      track.scrollBy({ left: step * Number(btn.dataset.dir), behavior: 'smooth' });
    });
  });
})();
