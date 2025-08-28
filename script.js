// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// Typing Effect
const typingText = document.getElementById("typingText");
const texts = ["Full Stack Developer", "Software QA Enthusiast", "CSE Engineer"];
let i = 0, j = 0, isDeleting = false;

function type() {
  let current = texts[i];
  typingText.textContent = current.substring(0, j);
  if (!isDeleting && j < current.length) {
    j++;
    setTimeout(type, 100);
  } else if (isDeleting && j > 0) {
    j--;
    setTimeout(type, 60);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) i = (i + 1) % texts.length;
    setTimeout(type, 1000);
  }
}
type();

// Project Filter
const filterBtns = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".card");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    let filter = btn.getAttribute("data-filter");
    cards.forEach(card => {
      card.style.display = (filter === "all" || card.dataset.type === filter) ? "block" : "none";
    });
  });
});

// Card click → make it brighter
cards.forEach(card => {
  card.addEventListener("click", () => {
    // remove active from all
    cards.forEach(c => c.classList.remove("active"));
    // add active to clicked one
    card.classList.add("active");
  });
});

// Modal
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalImg = document.getElementById("modalImg");
const modalDesc = document.getElementById("modalDesc");
const modalClose = document.getElementById("modalClose");

let modalImgs = [];
let modalImgIndex = 0;
let modalImgTimer = null;

function showModalImg(idx) {
  if (!modalImgs.length) return;
  modalImgIndex = (idx + modalImgs.length) % modalImgs.length;
  modalImg.src = modalImgs[modalImgIndex];
}

function startModalImgTimer() {
  clearInterval(modalImgTimer);
  modalImgTimer = setInterval(() => {
    showModalImg(modalImgIndex + 1);
  }, 3000);
}

cards.forEach(card => {
  card.addEventListener("click", () => {
    // remove active from all
    cards.forEach(c => c.classList.remove("active"));
    // add active to clicked one
    card.classList.add("active");

    modal.style.display = "block";
    modalTitle.textContent = card.dataset.title;
    modalDesc.textContent = card.dataset.desc;
    modalImgs = JSON.parse(card.dataset.imgs);
    modalImgIndex = 0;
    showModalImg(modalImgIndex);
    startModalImgTimer();
  });
});

modalClose.addEventListener("click", () => {
  modal.style.display = "none";
  clearInterval(modalImgTimer);
});
modal.querySelector(".modal-backdrop").addEventListener("click", () => {
  modal.style.display = "none";
  clearInterval(modalImgTimer);
});

// Contact Form (Formspree AJAX)
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      status.textContent = "✅ Message sent successfully!";
      status.style.color = "green";
      form.reset();
    } else {
      status.textContent = "❌ Failed to send message. Try again.";
      status.style.color = "red";
    }
  } catch (error) {
    status.textContent = "❌ Failed to send message. Try again.";
    status.style.color = "red";
  }
});
