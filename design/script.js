(function () {
  var hdr = document.querySelector('.hdr');
  var burger = document.querySelector('.burger');
  var fab = document.querySelector('.fab');
  var book = document.getElementById('booking');

  // тень у шапки и плавающая кнопка брони после первого экрана
  function onScroll() {
    var y = window.scrollY;
    hdr.classList.toggle('is-scrolled', y > 8);
    if (fab) fab.classList.toggle('is-on', y > window.innerHeight * 0.85);
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
  hdr.querySelector('.menu').addEventListener('click', function (e) { if (!e.target.closest('.menu__panel')) setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

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

// плавное появление блоков при прокрутке
(function () {
  if (!('IntersectionObserver' in window)) return;
  document.documentElement.classList.add('js-reveal');
  var sel = '.sec__head, .leaf, .room, .stay__text, .family__card, .offers__bar, .offer, .tonus__text, .tonus__media, .taste__media, .taste__text, .event, .manager, .reel, .reviews__score, .rev, .contacts__map, .contacts__info, .ask__box, .pane, .ftr__slogan';
  var els = document.querySelectorAll(sel);
  els.forEach(function (el) {
    el.setAttribute('data-rv', '');
    var sibs = Array.prototype.filter.call(el.parentNode.children, function (c) { return c.matches(sel); });
    var k = sibs.indexOf(el);
    if (k > 0) el.style.transitionDelay = Math.min(k, 5) * 0.09 + 's';
  });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  els.forEach(function (el) { io.observe(el); });
})();

// панель «Номера»: превью меняется при наведении на категорию
(function () {
  var panel = document.querySelector('.drop__panel');
  if (!panel) return;
  var img = panel.querySelector('.drop__preview img');
  var capB = panel.querySelector('.drop__cap b');
  var capS = panel.querySelector('.drop__cap span');
  var links = panel.querySelectorAll('.drop__group a');
  var t;
  function show(a) {
    links.forEach(function (l) { l.classList.toggle('is-on', l === a); });
    capB.textContent = a.textContent; capS.textContent = a.dataset.cap;
    if (img.getAttribute('src') === a.dataset.img) return;
    clearTimeout(t); img.classList.add('is-fading');
    t = setTimeout(function () { img.src = a.dataset.img; img.classList.remove('is-fading'); }, 180);
  }
  links.forEach(function (a) { a.addEventListener('mouseenter', function () { show(a); }); a.addEventListener('focus', function () { show(a); }); });
  if (links[0]) links[0].classList.add('is-on');
})();

// выбор варианта первого экрана: ?hero=a|b|c|d
(function () {
  var v = (location.search.match(/hero=([abcd])/) || [])[1];
  if (v) document.documentElement.classList.add('hv-' + v);
})();
