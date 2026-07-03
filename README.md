# Insieme Hair Salon — Website Handover Notes

## What's in this build
A 5-page responsive site: Home, Services, Opening Hours, Gallery, Contact.
No framework or build step — just HTML, CSS and vanilla JS, so it can be
opened, edited and deployed anywhere without installing anything.

Design direction: warm cream background, espresso (near-black) ink and
dark sections, terracotta/rust as the primary accent — pulled from your
reference video, applied across a portfolio-led layout (hero with photo
+ callout, "From the studio" grid, scrolling service strip, dark
services band, testimonials, CTA band).

```
insieme/
├── index.html          Home
├── services.html        Services & pricing
├── hours.html            Opening hours
├── gallery.html          Gallery
├── contact.html          Contact & booking form
├── css/style.css         All styling
├── js/content.js         ALL editable text, prices, hours, gallery items
├── js/main.js             Site behaviour (nav, rendering, form, SEO schema)
├── sitemap.xml
└── robots.txt
```

## Editing content (day-to-day admin)
Everything a salon owner needs to update lives in **`js/content.js`**:
business name, address, phone, email, social links, opening hours,
service list and pricing, gallery captions, and testimonials. Open it in
any text editor, change the text between quotes, save, and refresh the
site — no HTML editing required. Each field is commented.

## Placeholder content
Real photography, logo and final copy weren't available yet, so:
- **Gallery / portfolio tiles** use styled gradient tiles with captions
  instead of photos. Replace with real `<img>` sources once photography
  is ready — see `js/main.js` → `renderGallery` / `renderPortfolioTeaser`.
- **Address / phone / email / social handles** are placeholders in
  `js/content.js` → `business`. Update these first — they also feed the
  Google Map, "Get directions" link, and SEO schema.
- **Services and prices** are realistic placeholders — replace with your
  actual menu.

## Image optimisation guidance (for when real photos arrive)
- Export photos as WebP (JPEG fallback if needed); aim for under 200KB
  per image at display size.
- Portfolio/gallery tiles display at roughly 300×360px — resize before
  uploading, don't use straight-from-camera originals.
- Keep `loading="lazy"` on any `<img>` added below the fold.
- Use descriptive file names and `alt` text (e.g. `balayage-copper-tone.webp`).

## SEO already in place
- Unique `<title>` and meta description per page.
- Canonical URL and Open Graph tags per page.
- Clean, readable URLs (`/services.html`, `/hours.html`, etc.).
- `sitemap.xml` and `robots.txt` at the site root.
- `HairSalon` structured data (JSON-LD schema) auto-generated from
  `content.js` on every page.
- Fast by default: no frameworks, minimal JS/CSS, two web fonts.

**Before launch:** update every `insiemehairsalon.com` placeholder URL in
the `<head>` of each page and in `sitemap.xml` to your real domain.

## Google Maps & social integration
- The Contact page map is a keyless Google Maps embed built from the
  address in `content.js` — update the address there and the map
  updates automatically.
- Social icons pull from `content.js` → `business.social` and appear in
  the footer and Contact page automatically.

## Contact form
The form validates and confirms in-browser but does not yet send email
— that needs a backend. Two easy options at launch:
1. **Formspree / Netlify Forms** — point the form at their endpoint.
2. **Custom endpoint** — POST the fields to your own mail-sending script.
Both are one small edit in `js/main.js` → `initContactForm`.

## Growing into a full CMS
This build ships with a lightweight "edit one file" content system so it
can go live immediately with real admin control. For a full
drag-and-drop CMS with media library and user accounts, two common next
steps: swap `content.js` for a headless-CMS fetch call, or rebuild as a
WordPress theme. Happy to scope either once you confirm a direction.

## Deployment
Any static host works as-is: Netlify, Vercel, GitHub Pages, or a
standard web host — upload the folder contents, no build step required.
