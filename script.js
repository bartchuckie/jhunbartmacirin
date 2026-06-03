const backToTop = document.getElementById("backToTop");

const phrases = [
  'IT Support \u2022 Network troubleshooting \u2022 Web Development \u2022 Data Analysis',
  'Technical Support \u2022 Systems Analysis \u2022 Workflow automation',
  'Software-Adaptable Professional \u2022 QA-Oriented \u2022 Operations Ready'
];

const typedRole = document.getElementById('typed-role');
const viewExperienceBtn = document.getElementById('view-experience-btn');
const backToTopBtn = document.getElementById('backToTop');
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = phrases[phraseIndex];
  typedRole.textContent = deleting
    ? current.slice(0, charIndex--)
    : current.slice(0, charIndex++);

  let speed = deleting ? 40 : 70;

  if (!deleting && charIndex === current.length + 1) {
    deleting = true;
    speed = 1400;
  }

  if (deleting && charIndex < 0) {
    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    charIndex = 0;
    speed = 300;
  }

  setTimeout(typeLoop, speed);
}

viewExperienceBtn.addEventListener('click', () => {
  document.getElementById('experience').scrollIntoView({ behavior: 'smooth' });
});

if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    backToTopBtn.classList.toggle('visible', window.scrollY > 420);
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

typeLoop();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 420 ? "block" : "none";
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
