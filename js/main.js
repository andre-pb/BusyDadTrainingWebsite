// Busy Dad Training — interactive bits

// 0) Confirm JS is alive — only now do we let the CSS hide .reveal items.
document.documentElement.classList.add('js-ready');

// 1) Sticky header shadow
const header = document.querySelector('.site-header');
if (header) {
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// 2) Mobile nav toggle
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => nav.classList.toggle('is-open'));
  nav.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => nav.classList.remove('is-open'))
  );
}

// 3) Reveal-on-scroll
const io = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// 4) Click-to-play YouTube posters (lazy iframe load — avoids file:// embed errors)
document.querySelectorAll('.movement__video.has-poster').forEach(el => {
  const id = el.dataset.ytId;
  if (!id) return;
  const trigger = (ev) => {
    if (ev) ev.preventDefault();
    if (el.classList.contains('is-playing')) return;
    el.classList.add('is-playing');
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
    iframe.title = el.dataset.ytTitle || 'YouTube video player';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    el.appendChild(iframe);
  };
  el.addEventListener('click', trigger);
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') trigger(e);
  });
});
