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

// слайдеры: плавная смена, точки, автопрокрутка, свайп
(function () {
  document.querySelectorAll('.slider').forEach(function (sl) {
    var slides = Array.prototype.slice.call(sl.querySelectorAll('.slide'));
    var dotsBox = sl.querySelector('.slider__dots');
    if (slides.length < 2) { if (dotsBox) dotsBox.remove(); return; }
    var i = 0, timer = null, delay = Number(sl.dataset.auto) || 0;
    var dots = slides.map(function (_, k) {
      var b = document.createElement('button');
      b.type = 'button'; b.setAttribute('aria-label', 'Слайд ' + (k + 1));
      b.addEventListener('click', function () { go(k); restart(); });
      dotsBox.appendChild(b); return b;
    });
    function go(k) {
      i = (k + slides.length) % slides.length;
      slides.forEach(function (s, n) { s.classList.toggle('is-on', n === i); });
      dots.forEach(function (d, n) { d.classList.toggle('is-on', n === i); });
    }
    function restart() {
      if (!delay || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      clearInterval(timer); timer = setInterval(function () { go(i + 1); }, delay);
    }
    var x0 = null;
    sl.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    sl.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) { go(i + (dx < 0 ? 1 : -1)); restart(); }
    });
    sl.addEventListener('mouseenter', function () { clearInterval(timer); });
    sl.addEventListener('mouseleave', restart);
    go(0); restart();
  });
})();
