/**
 * INSIEME HAIR SALON — SITE BEHAVIOUR
 * Handles: mobile nav, active link state, rendering dynamic sections
 * from content.js, contact form validation, and JSON-LD schema.
 */

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  setActiveNavLink();
  renderBusinessDetails();
  renderSocialLinks();
  renderHoursSnippet();
  if (document.getElementById("hours-table")) renderFullHours();
  if (document.getElementById("services-list")) renderServices();
  if (document.getElementById("gallery-grid")) renderGallery();
  if (document.getElementById("portfolio-grid")) renderPortfolioTeaser();
  if (document.getElementById("testimonials")) renderTestimonials();
  if (document.getElementById("map-embed")) renderMap();
  initContactForm();
  injectSchema();
  document.querySelectorAll("[data-year]").forEach(el => (el.textContent = new Date().getFullYear()));
});

/* ---------- Navigation ---------- */
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

/* ---------- Business details (contact blocks, footer) ---------- */
function renderBusinessDetails() {
  const { business } = SITE_CONTENT;
  document.querySelectorAll("[data-biz-phone]").forEach(el => (el.textContent = business.phone));
  document.querySelectorAll("[data-biz-phone-link]").forEach(el => (el.href = `tel:${business.phoneLink}`));
  document.querySelectorAll("[data-biz-email]").forEach(el => (el.textContent = business.email));
  document.querySelectorAll("[data-biz-email-link]").forEach(el => (el.href = `mailto:${business.email}`));
  document.querySelectorAll("[data-biz-address]").forEach(el => {
    el.innerHTML = `${business.address.line1}<br>${business.address.line2}`;
  });
  document.querySelectorAll("[data-biz-address-inline]").forEach(el => {
    el.textContent = business.address.full;
  });
  document.querySelectorAll("[data-biz-directions]").forEach(el => (el.href = business.mapsDirectionsUrl));
}

function renderSocialLinks() {
  const { social } = SITE_CONTENT.business;
  document.querySelectorAll(".social-links").forEach(container => {
    container.innerHTML = `
      <a href="${social.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${iconInstagram()}</a>
      <a href="${social.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${iconFacebook()}</a>
      <a href="${social.tiktok}" target="_blank" rel="noopener" aria-label="TikTok">${iconTiktok()}</a>
    `;
  });
}

/* ---------- Hours ---------- */
function renderHoursSnippet() {
  const container = document.getElementById("hours-snippet");
  if (!container) return;
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const rows = SITE_CONTENT.hours.map(h => {
    const isToday = h.day === today;
    const time = h.open === "Closed" ? "Closed" : `${h.open} – ${h.close}`;
    return `<li class="${isToday ? "is-today" : ""}"><span>${h.day}</span><span>${time}</span></li>`;
  }).join("");
  container.innerHTML = `<ul class="hours-list">${rows}</ul>`;
}

function renderFullHours() {
  const container = document.getElementById("hours-table");
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const rows = SITE_CONTENT.hours.map(h => {
    const isToday = h.day === today;
    const time = h.open === "Closed" ? "Closed" : `${h.open} – ${h.close}`;
    return `<tr class="${isToday ? "is-today" : ""}"><th scope="row">${h.day}</th><td>${time}</td></tr>`;
  }).join("");
  container.innerHTML = rows;
  const note = document.getElementById("holiday-note");
  if (note) note.textContent = SITE_CONTENT.holidayNote;
}

/* ---------- Services (full menu page) ---------- */
function renderServices() {
  const container = document.getElementById("services-list");
  container.innerHTML = SITE_CONTENT.services.map(group => `
    <div class="service-group">
      <h3 class="service-group__title">${group.category}</h3>
      <div class="service-rows">
        ${group.items.map(item => `
          <div class="service-row">
            <div class="service-row__name">
              <span>${item.name}</span>
              <span class="service-row__note">${item.note}</span>
            </div>
            <div class="service-row__price">${item.price}</div>
          </div>
        `).join("")}
      </div>
    </div>
  `).join("");
}

/* ---------- Gallery tile helpers ---------- */
const TILE_GRADIENTS = [
  "linear-gradient(160deg,#3a2a1f,#8a5230)",
  "linear-gradient(160deg,#1e1813,#5a4535)",
  "linear-gradient(160deg,#c85d38,#6e3420)",
  "linear-gradient(160deg,#ebc9b4,#c8865e)",
  "linear-gradient(160deg,#a8482a,#3a2a1f)",
  "linear-gradient(160deg,#8a5230,#1e1813)"
];

/* ---------- Full gallery page ---------- */
function renderGallery() {
  const container = document.getElementById("gallery-grid");
  container.innerHTML = SITE_CONTENT.gallery.map((item, i) => `
    <figure class="ptile" style="background:${TILE_GRADIENTS[i % TILE_GRADIENTS.length]}" tabindex="0">
      <span class="ptile--tag">${item.tag}</span>
      <span>${item.label}</span>
    </figure>
  `).join("");
}

/* ---------- Home page portfolio teaser (subset) ---------- */
function renderPortfolioTeaser() {
  const container = document.getElementById("portfolio-grid");
  const items = SITE_CONTENT.gallery.slice(0, 4);
  container.innerHTML = items.map((item, i) => `
    <figure class="ptile" style="background:${TILE_GRADIENTS[i % TILE_GRADIENTS.length]}">
      <span class="ptile--tag">${item.tag}</span>
      <span>${item.label}</span>
    </figure>
  `).join("");
}

/* ---------- Testimonials ---------- */
function renderTestimonials() {
  const container = document.getElementById("testimonials");
  container.innerHTML = SITE_CONTENT.testimonials.map(t => `
    <blockquote class="testimonial">
      <p>&ldquo;${t.quote}&rdquo;</p>
      <cite>— ${t.author}</cite>
    </blockquote>
  `).join("");
}

/* ---------- Map ---------- */
function renderMap() {
  const el = document.getElementById("map-embed");
  const q = SITE_CONTENT.business.mapsEmbedQuery;
  el.innerHTML = `<iframe
      title="Insieme Hair Salon location"
      src="https://www.google.com/maps?q=${q}&output=embed"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      allowfullscreen></iframe>`;
}

/* ---------- Contact form ---------- */
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

    if (!name || !email || !message) {
      showStatus("Please fill in your name, email and message.", true);
      return;
    }
    if (!emailPattern.test(email)) {
      showStatus("Please enter a valid email address.", true);
      return;
    }

    /*
     * NOTE FOR HANDOVER:
     * This form currently confirms submission in the browser only.
     * To receive these enquiries by email, connect a form backend
     * (e.g. Formspree, Netlify Forms, or a custom endpoint) and
     * point this fetch call at it. See README.md → "Contact form".
     */
    showStatus(`Thank you, ${name.split(" ")[0]} — we'll get back to you shortly.`, false);
    form.reset();
  });

  function showStatus(msg, isError) {
    status.textContent = msg;
    status.className = isError ? "form-status form-status--error" : "form-status form-status--success";
  }
}

/* ---------- SEO: JSON-LD structured data ---------- */
function injectSchema() {
  const { business, hours } = SITE_CONTENT;
  const openingHours = hours
    .filter(h => h.open !== "Closed")
    .map(h => `${h.day.slice(0, 2)} ${to24h(h.open)}-${to24h(h.close)}`);

  const schema = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "name": business.name,
    "image": "",
    "telephone": business.phoneLink,
    "email": business.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": business.address.line1,
      "addressLocality": business.address.line2
    },
    "url": window.location.origin + "/",
    "sameAs": Object.values(business.social),
    "openingHoursSpecification": openingHours
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

function to24h(t) {
  if (!t) return "";
  const [time, period] = t.split(" ");
  let [h, m] = time.split(":").map(Number);
  if (period === "PM" && h !== 12) h += 12;
  if (period === "AM" && h === 12) h = 0;
  return `${String(h).padStart(2, "0")}:${m ? String(m).padStart(2, "0") : "00"}`;
}

/* ---------- Inline icons ---------- */
function iconInstagram() {
  return `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.3" cy="6.7" r="1"/></svg>`;
}
function iconFacebook() {
  return `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M14 9h3V5.5h-3c-2 0-3.5 1.5-3.5 3.5v2H8v3.5h2.5V21H14v-6.5h2.6l.4-3.5H14V9z"/></svg>`;
}
function iconTiktok() {
  return `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M14 3v10.6a3.4 3.4 0 1 1-2.6-3.3"/><path d="M14 3c.4 2.4 2.2 4.2 4.6 4.5"/></svg>`;
}
