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
  var sel = '.sec__head, .leaf, .room, .stay__text, .family__card, .offers__bar, .offer, .tonus__text, .tonus__media, .taste__media, .taste__text, .dine__main, .dine__text, .event, .manager, .reel, .reviews__score, .rev, .rsum, .gr, .contacts__map, .contacts__info, .ask__box, .qa__box, .pane';
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

/* пометки на фото мероприятий — в одну строку, лишнее сворачиваем в «+N» */
(function () {
  function fit() {
    document.querySelectorAll('.event__img .specs').forEach(function (ul) {
      var old = ul.querySelector('.specs__more'); if (old) old.remove();
      var items = Array.prototype.slice.call(ul.children);
      items.forEach(function (li) { li.hidden = false; });
      if (!items.length) return;
      var top = items[0].offsetTop;
      var wraps = function () { return Array.prototype.some.call(ul.children, function (li) { return !li.hidden && li.offsetTop > top; }); };
      if (!wraps()) return;
      var more = document.createElement('li'); more.className = 'specs__more'; ul.appendChild(more);
      var hidden = [];
      for (var i = items.length - 1; i > 0 && wraps(); i--) {
        items[i].hidden = true; hidden.unshift(items[i].textContent);
        more.textContent = '+' + hidden.length;
      }
      more.title = hidden.join(', ');
    });
  }
  window.addEventListener('load', fit);
  window.addEventListener('resize', fit);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
})();

/* отзывы: «Читать полностью» раскрывает текст на месте */
document.querySelectorAll('.gr__more').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var t = btn.previousElementSibling;
    var open = t.classList.toggle('is-open');
    btn.textContent = open ? 'Свернуть' : 'Читать полностью';
  });
});

/* карта в контактах: на широком экране сдвигаем центр, чтобы метка была справа от плашки; серая, пока с ней не взаимодействуют */
(function () {
  var box = document.querySelector('.contacts__map'); if (!box) return;
  var fr = box.querySelector('iframe');
  var lon = parseFloat(box.dataset.lon), lat = parseFloat(box.dataset.lat);
  function src() {
    var w = window.innerWidth, z = 16, shift = 0;
    if (w > 1080) shift = Math.min(w * 0.22, 360);              // метка правее центра, плашка слева
    var deg = 360 / (256 * Math.pow(2, z));                        // градусов долготы на пиксель
    var cLon = (lon - shift * deg).toFixed(6);
    return 'https://yandex.ru/map-widget/v1/?ll=' + cLon + '%2C' + lat + '&z=' + z +
      '&pt=' + lon + '%2C' + lat + '%2Cpm2rdm&lang=ru_RU';
  }
  var last = '';
  function set() { var u = src(); if (u !== last) { fr.src = u; last = u; } }
  set();
  var t; window.addEventListener('resize', function () { clearTimeout(t); t = setTimeout(set, 300); });
  box.addEventListener('pointerdown', function () { box.classList.add('is-active'); });
  box.addEventListener('mouseleave', function () { box.classList.remove('is-active'); });
  document.addEventListener('pointerdown', function (e) { if (!box.contains(e.target)) box.classList.remove('is-active'); });
})();

/* карта на API Яндекса (без рекламы, своя метка с логотипом).
   Включается, когда в data-ymaps-key у .contacts__map прописан ключ; без ключа остаётся обычный виджет. */
(function () {
  var box = document.querySelector('.contacts__map'); if (!box) return;
  var key = (box.dataset.ymapsKey || '').trim(); if (!key) return;
  var lon = parseFloat(box.dataset.lon), lat = parseFloat(box.dataset.lat);
  var fr = box.querySelector('iframe');
  var holder = document.createElement('div'); holder.className = 'contacts__ymap';
  var s = document.createElement('script');
  s.src = 'https://api-maps.yandex.ru/2.1/?apikey=' + encodeURIComponent(key) + '&lang=ru_RU';
  s.onload = function () {
    ymaps.ready(function () {
      if (fr) fr.remove();
      box.insertBefore(holder, box.firstChild);
      var map = new ymaps.Map(holder, { center: [lat, lon], zoom: 16, controls: ['zoomControl'] }, { suppressMapOpenBlock: true });
      map.behaviors.disable('scrollZoom');
      var Layout = ymaps.templateLayoutFactory.createClass(
        '<div class="ymark"><span class="ymark__logo"><img src="../assets/icons/emblem-light.svg" alt=""></span><b>ВЭЛТОН</b></div>'
      );
      map.geoObjects.add(new ymaps.Placemark([lat, lon], { hintContent: 'ВЭЛТОН — отель и апартаменты' }, {
        iconLayout: Layout,
        iconShape: { type: 'Rectangle', coordinates: [[-62, -58], [62, 0]] }
      }));
      // метка правее центра на широком экране — плашка с текстом слева
      function shift() {
        var w = window.innerWidth;
        var px = w > 1080 ? Math.min(w * 0.22, 360) : 0;
        var pos = map.options.get('projection').toGlobalPixels([lat, lon], map.getZoom());
        map.setGlobalPixelCenter([pos[0] - px, pos[1] - 24]);
      }
      shift(); window.addEventListener('resize', function () { map.container.fitToViewport(); shift(); });
      // серая подложка, цветная — при взаимодействии; метка всегда цветная
      var ground = map.panes.get('ground').getElement();
      ground.classList.add('ymap-ground');
    });
  };
  document.head.appendChild(s);
})();
