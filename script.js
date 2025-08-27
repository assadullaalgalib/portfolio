// Dark/Light Mode Toggle
function toggleTheme() {
  document.body.classList.toggle("dark");
  const btn = document.querySelector(".toggle-btn");
  btn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
}

// Project Filter
function filterProjects(type) {
  const cards = document.querySelectorAll(".projects .card");
  cards.forEach(card => {
    card.style.display = (type === "all" || card.dataset.type === type) ? "inline-block" : "none";
  });
}

// Modal
function openModal(title, desc, img) {
  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalDesc").innerText = desc;
  document.getElementById("modalImg").src = img;
  document.getElementById("projectModal").style.display = "flex";
}
function closeModal() {
  document.getElementById("projectModal").style.display = "none";
}

// Contact Form Validation
function validateForm() {
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let message = document.getElementById("message").value.trim();
  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return false;
  }
  alert("Message Sent! (Demo only)");
  return false; // prevent real submission (no backend yet)
}
