const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links a');
const themeToggle = document.querySelector('.theme-toggle');
const year = document.querySelector('#year');
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
const newsToggle = document.querySelector('.news-toggle');
const extraNewsItems = document.querySelectorAll('.news-extra');

function applyTheme(theme) {
  const isDark = theme === 'dark';
  if (isDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }

  if (themeToggle) {
    themeToggle.textContent = isDark ? '☼' : '☾';
  }
}

if (year) {
  year.textContent = new Date().getFullYear();
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark' || savedTheme === 'light') {
  applyTheme(savedTheme);
} else {
  applyTheme(mediaQuery.matches ? 'dark' : 'light');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      applyTheme('light');
      localStorage.setItem('theme', 'light');
    } else {
      applyTheme('dark');
      localStorage.setItem('theme', 'dark');
    }
  });
}

mediaQuery.addEventListener('change', (event) => {
  if (localStorage.getItem('theme')) return;
  applyTheme(event.matches ? 'dark' : 'light');
});

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const sections = Array.from(document.querySelectorAll('main section[id]'));
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
);

sections.forEach((section) => observer.observe(section));

if (newsToggle && extraNewsItems.length) {
  newsToggle.addEventListener('click', () => {
    const shouldShow = newsToggle.getAttribute('aria-expanded') !== 'true';

    extraNewsItems.forEach((item) => {
      item.hidden = !shouldShow;
      item.style.display = shouldShow ? '' : 'none';
    });

    newsToggle.setAttribute('aria-expanded', String(shouldShow));
    newsToggle.textContent = shouldShow ? 'Show less' : 'Show more';
  });
}
