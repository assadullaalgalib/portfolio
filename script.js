// --- Theme Toggle with Persistence ---
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') document.body.classList.add('dark');
themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const dark = document.body.classList.contains('dark');
  localStorage.setItem('theme', dark ? 'dark' : 'light');
  themeToggle.textContent = dark ? '☀️' : '🌙';
});

// --- Typing Effect (loop through roles) ---
const roles = [
  'Full Stack Developer',
  'ASP.NET MVC • PHP • JS',
  'SQA Enthusiast'
];
const typingEl = document.getElementById('typingText');

let roleIndex = 0, charIndex = 0, deleting = false;
const typeSpeed = 70, pauseTime = 1200;

function typeLoop() {
  const current = roles[roleIndex];
  if (!deleting) {
    typingEl.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, pauseTime);
      return;
    }
  } else {
    typingEl.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 40 : typeSpeed);
}
typeLoop();

// --- Project Filtering ---
const filterButtons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
    btn.classList.add('active'); btn.setAttribute('aria-selected', 'true');

    const type = btn.dataset.filter;
    cards.forEach(card => {
      card.style.display = (type === 'all' || card.dataset.type === type) ? 'block' : 'none';
    });
  });
});

// --- Modal Preview ---
const modal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalImg = document.getElementById('modalImg');
const modalDesc = document.getElementById('modalDesc');

function openModalFromCard(card){
  modalTitle.textContent = card.dataset.title || '';
  modalDesc.textContent = card.dataset.desc || '';
  const src = card.dataset.img || card.querySelector('img')?.src || '';
  modalImg.src = src;
  modalImg.alt = `${modalTitle.textContent} preview`;
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
}
function closeModal(){
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  modalImg.src = '';
}
cards.forEach(card => {
  card.addEventListener('click', () => openModalFromCard(card));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModalFromCard(card); }
  });
});
document.querySelector('.modal-backdrop').addEventListener('click', closeModal);
modalClose.addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

// --- Contact Form Validation ---
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  statusEl.textContent = '';

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  const errors = [];
  if (!name) errors.push('Name is required.');
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) errors.push('A valid email is required.');
  if (!message || message.length < 10) errors.push('Message must be at least 10 characters.');

  if (errors.length){
    statusEl.style.color = '#e11d48';
    statusEl.textContent = errors.join(' ');
    return;
  }

  // Demo success (no backend connected yet)
  statusEl.style.color = '#16a34a';
  statusEl.textContent = '✅ Message sent (demo). Connect a backend to really send it.';
  form.reset();
});
