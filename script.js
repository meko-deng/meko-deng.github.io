(function () {
  document.querySelectorAll('.carousel').forEach(function (carousel) {
    var track = carousel.querySelector('.photo-grid');
    var prevBtn = carousel.querySelector('.carousel-btn.prev');
    var nextBtn = carousel.querySelector('.carousel-btn.next');
    if (!track || !prevBtn || !nextBtn) return;

    function slideWidth() {
      var slide = track.firstElementChild;
      if (!slide) return track.clientWidth;
      var styles = getComputedStyle(track);
      var gap = parseFloat(styles.columnGap || styles.gap || '0');
      return slide.getBoundingClientRect().width + gap;
    }

    prevBtn.addEventListener('click', function () {
      track.scrollBy({ left: -slideWidth(), behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', function () {
      track.scrollBy({ left: slideWidth(), behavior: 'smooth' });
    });
  });
})();

(function () {
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var closeBtn = lightbox ? lightbox.querySelector('.lightbox-close') : null;
  if (!lightbox || !lightboxImg || !closeBtn) return;

  function open(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.hidden = true;
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.photo-grid img').forEach(function (img) {
    img.addEventListener('click', function () {
      open(img.currentSrc || img.src, img.alt);
    });
  });

  closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) close();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !lightbox.hidden) close();
  });
})();

(function () {
  var tabs = document.querySelectorAll('.year-tab');
  var panels = document.querySelectorAll('.experience-year');
  if (!tabs.length || !panels.length) return;

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var year = tab.getAttribute('data-year');

      tabs.forEach(function (t) {
        t.setAttribute('aria-selected', String(t === tab));
      });

      panels.forEach(function (panel) {
        panel.hidden = panel.getAttribute('data-year') !== year;
      });
    });
  });
})();

(function () {
  var now = new Date();

  document.querySelectorAll('.experience-list li[data-end]').forEach(function (li) {
    var end = new Date(li.getAttribute('data-end') + 'T23:59:59');
    if (now > end) {
      li.classList.add('past');
    } else {
      li.classList.remove('past');
    }
  });
})();
