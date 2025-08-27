// --- Theme Toggle ---
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if(savedTheme==='dark') document.body.classList.add('dark');
themeToggle.textContent = document.body.classList.contains('dark')?'☀️':'🌙';
themeToggle.addEventListener('click', ()=>{
  document.body.classList.toggle('dark');
  const dark = document.body.classList.contains('dark');
  localStorage.setItem('theme', dark?'dark':'light');
  themeToggle.textContent = dark?'☀️':'🌙';
});

// --- Typing Effect ---
const roles = ['Full Stack Developer','ASP.NET MVC • PHP • JS','SQA Enthusiast'];
const typingEl = document.getElementById('typingText');
let roleIndex=0, charIndex=0, deleting=false;
const typeSpeed=70, pauseTime=1200;
function typeLoop(){
  const current = roles[roleIndex];
  if(!deleting){
    typingEl.textContent = current.slice(0, ++charIndex);
    if(charIndex===current.length){ deleting=true; setTimeout(typeLoop,pauseTime); return; }
  } else {
    typingEl.textContent = current.slice(0, --charIndex);
    if(charIndex===0){ deleting=false; roleIndex=(roleIndex+1)%roles.length; }
  }
  setTimeout(typeLoop,deleting?40:typeSpeed);
}
typeLoop();

// --- Project Filtering ---
const filterButtons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.card');
filterButtons.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    filterButtons.forEach(b=>{b.classList.remove('active'); b.setAttribute('aria-selected','false');});
    btn.classList.add('active'); btn.setAttribute('aria-selected','true');
    const type = btn.dataset.filter;
    cards.forEach(card=>{
      card.style.display = (type==='all'||card.dataset.type===type)?'block':'none';
    });
  });
});

// --- Modal ---
const modal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalImg = document.getElementById('modalImg');
const modalDesc = document.getElementById('modalDesc');
const modalLink = document.getElementById('modalLink');

function openModalFromCard(card){
  modalTitle.textContent = card.dataset.title || '';
  modalDesc.textContent = card.dataset.desc || '';
  modalLink.href = card.dataset.link || '#';
  let imgs = [];
  try{ imgs = JSON.parse(card.dataset.imgs || '[]'); } catch(e){ imgs = []; }
  if(imgs.length) modalImg.src = imgs[0];
  else modalImg.src = card.querySelector('img')?.src || '';
  modalImg.alt = `${modalTitle.textContent} preview`;
  modal.classList.add('active');
  modal.setAttribute('aria-hidden','false');
}

function closeModal(){
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden','true');
  modalImg.src='';
}

cards.forEach(card=>{
  card.addEventListener('click', ()=>openModalFromCard(card));
  card.addEventListener('keydown', e=>{
    if(e.key==='Enter'||e.key===' '){ e.preventDefault(); openModalFromCard(card); }
  });
});

document.querySelector('.modal-backdrop').addEventListener('click', closeModal);
modalClose.addEventListener('click', closeModal);
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeModal(); });
