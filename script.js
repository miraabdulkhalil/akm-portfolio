// Mobile menu toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Smooth navigation
document.querySelectorAll('.nav-links a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        navLinks.classList.remove('active');
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

// Hide navbar on scroll down, show on scroll up
let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  
  if (currentScroll > lastScrollTop && currentScroll > 100) {
    header.classList.add('hide');
  } else {
    header.classList.remove('hide');
  }
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// MODAL / POPUP FOR PROJECT DETAILS
const projectData = {
  eskwela: {
    title: "E SKWELA",
    description: "A web-based Alternative Learning System (ALS) platform that manages student registration, grade level assessment, learning modules, class schedules, teacher assignments, and administrative approval workflows for out-of-school youth and adult learners. This platform aims to provide accessible education to those who cannot attend traditional schooling.",
    tech: "Django, SQLite3, HTML/CSS, JavaScript, FontAwesome, Bootstrap",
    image: "eskwela.png"
  },
  papaya: {
    title: "PapayaFresh",
    description: "A mobile-based AI system that predicts papaya shelf life using image processing and CNN. Users capture or upload a papaya photo, and the app analyzes color and texture to classify ripeness stages (Unripe, Partially Ripe, Ripe, Overripe) and estimates remaining shelf life. This helps farmers and consumers reduce food waste.",
    tech: "Flutter, TensorFlow Lite, Firebase, MobileNetV2",
    image: "papaya.png"
  },
  devconnect: {
    title: "DevConnect Forum",
    description: "Community-driven developer Q&A platform with markdown support, upvoting system, and user authentication. Built using Django and Bootstrap, this platform allows developers to ask questions, share knowledge, and collaborate on projects.",
    tech: "Django, Bootstrap, SQLite, JavaScript",
    image: "elect.png"
  }
};

const modal = document.getElementById('projectModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalTech = document.getElementById('modalTech');
const closeModal = document.querySelector('.modal-close');

function openModal(projectId) {
  const project = projectData[projectId];
  if (project) {
    modalImage.src = project.image;
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    modalTech.textContent = `🛠️ Tech Stack: ${project.tech}`;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModalFunc() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', (e) => {
    if (e.target.tagName === 'SPAN' && e.target.parentElement?.classList.contains('project-tags')) {
      return;
    }
    const projectId = card.getAttribute('data-project');
    if (projectId) {
      openModal(projectId);
    }
  });
});

if (closeModal) {
  closeModal.addEventListener('click', closeModalFunc);
}

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModalFunc();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeModalFunc();
  }
});
