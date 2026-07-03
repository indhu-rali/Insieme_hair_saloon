document.addEventListener("DOMContentLoaded", () => {
  initNav();
  setActiveNavLink();
  highlightToday();
  initContactForm();
  initGalleryFilter();
  initReveal();
  document.querySelectorAll("[data-year]").forEach(el => (el.textContent = new Date().getFullYear()));
});

function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-menu");
  if (!toggle || !menu) return;
  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
  menu.querySelectorAll("a").forEach(link =>
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
}

function setActiveNavLink() {
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-menu a").forEach(link => {
    const href = link.getAttribute("href");
    if (href === current) link.setAttribute("aria-current", "page");
  });
}

function highlightToday() {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  document.querySelectorAll("[data-day]").forEach(el => {
    if (el.dataset.day === today) el.classList.add("is-today");
  });
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  const status = document.getElementById("form-status");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || !email || !message) { showStatus("Please fill in your name, email and message.", true); return; }
    if (!emailPattern.test(email)) { showStatus("Please enter a valid email address.", true); return; }
    // NOTE: front-end only for now. Connect Formspree/Netlify Forms/custom endpoint here.
    showStatus(`Thank you, ${name.split(" ")[0]} — we'll get back to you shortly.`, false);
    form.reset();
  });
  function showStatus(msg, isError) {
    status.textContent = msg;
    status.className = isError ? "form-status form-status--error" : "form-status form-status--success";
  }
}

function initGalleryFilter() {
  const buttons = document.querySelectorAll(".gallery-filters button");
  if (!buttons.length) return;
  const tiles = document.querySelectorAll(".gallery-grid .ptile");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.dataset.filter;
      tiles.forEach(tile => {
        tile.style.display = (cat === "all" || tile.dataset.cat === cat) ? "" : "none";
      });
    });
  });
}

function initReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); });
  }, { threshold: 0.12 });
  document.querySelectorAll("[data-reveal]").forEach(el => io.observe(el));
}
