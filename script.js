const body = document.body;
const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');
const heroMedia = document.querySelector('.hero-media');
const isChinese = document.documentElement.lang.toLowerCase().startsWith('zh');

document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const updateHeader = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 48);
  if (heroMedia && window.innerWidth > 700 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    heroMedia.style.transform = `scale(1.04) translateY(${Math.min(window.scrollY * 0.08, 36)}px)`;
  }
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuToggle?.addEventListener('click', () => {
  const isOpen = body.classList.toggle('nav-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.querySelector('.sr-only').textContent = isOpen
    ? (isChinese ? '关闭导航' : 'Close navigation')
    : (isChinese ? '打开导航' : 'Open navigation');
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    body.classList.remove('nav-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px' });

document.querySelectorAll('.reveal').forEach((node) => observer.observe(node));
