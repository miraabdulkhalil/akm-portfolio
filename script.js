// Smooth navigation
document.querySelectorAll('.nav-links a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if(targetId && targetId.startsWith('#')) {
      const targetElement = document.querySelector(targetId);
      if(targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// Scroll-triggered animations
const scrollElements = document.querySelectorAll('.scroll-trigger');

const elementInView = (el, offset = 200) => {
  const elementTop = el.getBoundingClientRect().top;
  return elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset;
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 200)) {
      el.classList.add('scrolled');
    }
  });
};

window.addEventListener('load', handleScrollAnimation);
window.addEventListener('scroll', handleScrollAnimation);

// ========================================
// HIDE NAVBAR ON SCROLL DOWN, SHOW ON SCROLL UP
// ========================================
let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  
  if (currentScroll > lastScrollTop && currentScroll > 100) {
    // Scrolling down - hide navbar
    header.classList.add('hide');
  } else {
    // Scrolling up - show navbar
    header.classList.remove('hide');
  }
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});
