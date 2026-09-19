// =========================================================
// Harv-Ease — site scripts
// =========================================================
document.addEventListener('DOMContentLoaded', function () {

  // ---- Mobile menu toggle ----
  var menuToggle = document.getElementById('menuToggle');
  var nav = document.getElementById('nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close the menu after a link is tapped (mobile)
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Highlight active nav link on scroll ----
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav a');

  function setActiveLink() {
    var scrollPos = window.scrollY + 120;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var bottom = top + section.offsetHeight;
      var id = section.getAttribute('id');
      var link = document.querySelector('.nav a[href="#' + id + '"]');
      if (!link) return;
      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(function (l) { l.classList.remove('active'); });
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', setActiveLink, { passive: true });

  // ---- "Add" button feedback on produce cards ----
  document.querySelectorAll('.btn-add').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var original = btn.textContent;
      btn.textContent = 'Added';
      btn.classList.add('added');
      setTimeout(function () {
        btn.textContent = original;
        btn.classList.remove('added');
      }, 1100);
    });
  });

  // ---- Newsletter signup (front-end only placeholder) ----
  var signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var button = signupForm.querySelector('button');
      var original = button.textContent;
      button.textContent = 'Sent — check your inbox';
      signupForm.reset();
      setTimeout(function () { button.textContent = original; }, 2600);
    });
  }

   const packageCards = document.querySelectorAll(".package-card");

  packageCards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.classList.add("is-hovered");
    });

    card.addEventListener("mouseleave", () => {
      card.classList.remove("is-hovered");
    });
  });

  // ---- About gallery: scroll left/right with arrows, dots, drag & swipe ----
var gallery = document.getElementById('aboutGallery');
if (gallery) {
  var slides = Array.prototype.slice.call(gallery.children);
  var prevBtn = document.getElementById('galleryPrev');
  var nextBtn = document.getElementById('galleryNext');
  var dotsWrap = document.getElementById('galleryDots');

  var dots = slides.map(function (_, i) {
    var dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', 'Go to photo ' + (i + 1));
    dot.addEventListener('click', function () { goTo(i); });
    dotsWrap.appendChild(dot);
    return dot;
  });

  function currentIndex() {
    return Math.round(gallery.scrollLeft / gallery.clientWidth);
  }
  function goTo(i) {
    var clamped = Math.max(0, Math.min(slides.length - 1, i));
    gallery.scrollTo({ left: clamped * gallery.clientWidth, behavior: 'smooth' });
  }
  function updateDots() {
    var idx = currentIndex();
    dots.forEach(function (dot, i) { dot.classList.toggle('active', i === idx); });
  }

  if (prevBtn) prevBtn.addEventListener('click', function () { goTo(currentIndex() - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { goTo(currentIndex() + 1); });

  gallery.addEventListener('scroll', function () {
    window.clearTimeout(gallery._scrollTimer);
    gallery._scrollTimer = window.setTimeout(updateDots, 80);
  }, { passive: true });

  var isDown = false, startX = 0, startScroll = 0;
  gallery.addEventListener('mousedown', function (e) {
    isDown = true;
    gallery.classList.add('dragging');
    startX = e.pageX;
    startScroll = gallery.scrollLeft;
  });
  window.addEventListener('mouseup', function () {
    isDown = false;
    gallery.classList.remove('dragging');
  });
  window.addEventListener('mousemove', function (e) {
    if (!isDown) return;
    e.preventDefault();
    gallery.scrollLeft = startScroll - (e.pageX - startX);
  });

  updateDots();
}

});
