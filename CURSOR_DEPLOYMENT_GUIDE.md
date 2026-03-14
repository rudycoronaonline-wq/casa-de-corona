# Casa de Corona — Cursor + Vercel Deployment Guide

---

## YOUR FILE STRUCTURE

Put all files in one folder like this:

```
casa-de-corona/
├── index.html               ← Home page
├── what-to-do.html          ← What To Do hub
├── cabo-san-lucas.html      ← Cabo destination page
├── la-paz.html              ← La Paz destination page
├── todos-santos.html        ← Todos Santos destination page
├── cerritos-beach.html      ← Cerritos Beach destination page
└── CURSOR_DEPLOYMENT_GUIDE.md
```

> ⚠️ All 6 HTML files MUST be in the same folder. The nav links between them use relative paths (e.g. `href="what-to-do.html"`).

---

## STEP 1 — FIX THE NAV IN CURSOR (The Main Task)

The nav currently has inconsistent tabs across pages. In Cursor, open each file and replace the `<nav>` block with this identical nav. Use **Cmd+H** (Find & Replace) or ask Cursor AI.

### The correct nav for ALL 6 pages:

```html
<nav>
  <a href="index.html" class="nav-logo">Casa de Corona</a>
  <div class="nav-links">
    <a href="index.html">Home</a>
    <a href="index.html#gallery">Gallery</a>
    <a href="index.html#bedrooms">Rooms</a>
    <a href="what-to-do.html">What To Do</a>
    <a href="index.html#location">Location</a>
    <a href="index.html#reviews">Reviews</a>
    <a href="index.html#book" class="nav-cta">Book Direct</a>
  </div>
  <button class="nav-hamburger" onclick="document.getElementById('navMobile').classList.toggle('open')" aria-label="Menu">
    <span></span><span></span><span></span>
  </button>
</nav>
<div id="navMobile" class="nav-mobile">
  <a href="index.html">Home</a>
  <a href="index.html#gallery">Gallery</a>
  <a href="index.html#bedrooms">Rooms</a>
  <a href="what-to-do.html">What To Do</a>
  <a href="index.html#location">Location</a>
  <a href="index.html#reviews">Reviews</a>
  <a href="index.html#book" class="nav-cta">Book Direct</a>
</div>
```

### The correct nav CSS (add inside `<style>` replacing old nav CSS):

```css
nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 200;
  display: flex; align-items: center; justify-content: space-between;
  padding: 1rem 2rem;
  background: rgba(10,22,40,0.97);
  border-bottom: 1px solid rgba(200,168,75,0.2);
}
.nav-logo {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.3rem; color: #C8A84B;
  text-decoration: none; flex-shrink: 0;
}
.nav-links { display: flex; align-items: center; gap: 1.2rem; }
.nav-links a {
  font-size: 0.7rem; letter-spacing: 0.05em;
  text-transform: uppercase; color: rgba(255,255,255,0.75);
  text-decoration: none; white-space: nowrap; transition: color 0.2s;
}
.nav-links a:hover { color: #C8A84B; }
.nav-cta {
  background: #C8A84B !important; color: #0a1628 !important;
  padding: 0.45rem 1rem; border-radius: 2px; font-weight: 600 !important;
}
.nav-hamburger {
  display: none; flex-direction: column; gap: 5px;
  cursor: pointer; background: none; border: none; padding: 4px;
}
.nav-hamburger span {
  display: block; width: 22px; height: 2px;
  background: #C8A84B; border-radius: 2px;
}
.nav-mobile {
  display: none; position: fixed; top: 57px; left: 0; right: 0;
  background: rgba(10,22,40,0.99);
  border-bottom: 1px solid rgba(200,168,75,0.2);
  padding: 1rem 2rem; flex-direction: column; gap: 0.7rem; z-index: 199;
}
.nav-mobile a {
  font-size: 0.8rem; letter-spacing: 0.08em; text-transform: uppercase;
  color: rgba(255,255,255,0.75); text-decoration: none;
  padding: 0.45rem 0; border-bottom: 1px solid rgba(255,255,255,0.06);
}
.nav-mobile a:last-child { border: none; }
.nav-mobile .nav-cta {
  background: #C8A84B !important; color: #0a1628 !important;
  text-align: center; padding: 0.7rem; border-radius: 2px; border: none !important;
}
.nav-mobile.open { display: flex; }
@media (max-width: 860px) {
  .nav-links { display: none; }
  .nav-hamburger { display: flex; }
}
```

### Cursor AI prompt to fix all 6 files at once:
```
Replace the <nav>...</nav> block and the nav-mobile div in all 6 HTML files 
with the correct nav from CURSOR_DEPLOYMENT_GUIDE.md. Also replace all nav 
CSS inside <style> with the correct nav CSS from the guide. Make sure there 
are no leftover orphaned CSS selectors after the replacement.
```

---

## STEP 2 — REPLACE IMAGES WITH OPTIMIZED FILES

Currently images are embedded as base64 (works but slow). For production:

1. Create an `images/` folder inside your project
2. Add all your photos (optimized via **squoosh.app** — WebP, 80% quality, max 1200px)
3. In Cursor, replace base64 src values with file paths:

```html
<!-- Before -->
<img src="data:image/jpeg;base64,/9j/4AAQ..." alt="Terrace">

<!-- After -->
<img src="images/terrace-sunset.jpg" alt="Terrace">
```

### Cursor AI prompt:
```
Replace all base64 image src values in index.html with file path references 
from the images/ folder. Use descriptive filenames matching the alt text.
```

> For now the base64 version works fine — do this optimization before launch.

---

## STEP 3 — SET UP TALLY BOOKING FORM

1. Go to **tally.so** → Create account → New form
2. Add fields: First Name, Last Name, Email, Phone, Check-in, Check-out, Guests, How did you hear, Special Requests, Agreement checkbox
3. In Tally: Share → Embed → copy the **inline embed** code
4. In Cursor, find the `<form class="bform"` block in index.html and replace it with the Tally embed code

### Cursor AI prompt:
```
In index.html, replace the booking form (the <form class="bform"> block 
and everything inside it) with this Tally embed code: [paste your code here]
```

---

## STEP 4 — DEPLOY TO VERCEL

### 4a. Push to GitHub
```bash
# In your terminal inside the casa-de-corona folder:
git init
git add .
git commit -m "Casa de Corona website initial deploy"
# Create a repo on github.com first, then:
git remote add origin https://github.com/YOUR_USERNAME/casa-de-corona.git
git push -u origin main
```

### 4b. Deploy on Vercel
1. Go to **vercel.com** → Sign up with GitHub
2. Click **Add New Project** → Import your `casa-de-corona` repo
3. No build settings needed (it's plain HTML) — click **Deploy**
4. Your site is live at `casa-de-corona.vercel.app` in ~60 seconds

### 4c. Connect your domain
1. Buy domain at **Namecheap** or **Cloudflare Registrar** (~$12/yr)
   - Recommended: `casadecorona.com` or `casadecoronacabo.com`
2. In Vercel: Project → Settings → Domains → Add your domain
3. Follow Vercel's DNS instructions (add an A record and CNAME at your registrar)
4. SSL certificate is automatic — done in ~10 minutes

---

## STEP 5 — CONNECT AIRBNB CALENDAR (iCal Sync)

1. **Airbnb** → Calendar → Availability → Export Calendar → copy the `.ics` URL
2. **Google Calendar** → Other Calendars (+ button) → From URL → paste URL
3. Update the calendar-note in index.html with your actual availability link or Tally form link

---

## STEP 6 — SET UP STRIPE PAYMENTS

1. Go to **stripe.com** → Create account
2. Dashboard → Payment Links → Create a link
3. Product: "Casa de Corona — 50% Deposit"  
4. Set amount dynamically per booking (you'll send the link manually to each guest after confirming)
5. You'll copy/paste the Stripe Payment Link URL into your confirmation email to each guest

---

## REMAINING TO-DO CHECKLIST

- [ ] Fix nav in all 6 files (Step 1 above — use Cursor AI)
- [ ] Replace base64 images with optimized file references (Step 2)
- [ ] Set up Tally.so form and embed in index.html (Step 3)
- [ ] Push to GitHub and deploy on Vercel (Step 4)
- [ ] Register domain and connect to Vercel (Step 4c)
- [ ] Set up Airbnb iCal sync with Google Calendar (Step 5)
- [ ] Create Stripe account and Payment Link template (Step 6)
- [ ] Write guest message templates (confirmation, pre-arrival, day-of, post-checkout)
- [ ] Update email address from `contact@casadecorona.com` to your real email

---

## QUICK REFERENCE — ALL PAGE FILES

| File | Purpose | Key sections |
|------|---------|-------------|
| `index.html` | Home / main booking page | Hero, Gallery, Book, Rooms, Amenities, Why Direct, Location, Reviews, Rules |
| `what-to-do.html` | What To Do hub | 4 destination cards linking to sub-pages |
| `cabo-san-lucas.html` | Cabo guide | El Arco, fishing, Medano Beach, nightlife |
| `la-paz.html` | La Paz guide | Whale sharks, Espíritu Santo, malecón |
| `todos-santos.html` | Todos Santos guide | Art galleries, Hotel California, farm-to-table |
| `cerritos-beach.html` | Cerritos guide | Surf lessons, Pacific sunset, beach lunch |

---

## ESTIMATED TIME TO LAUNCH

| Task | Time |
|------|------|
| Fix nav in Cursor (AI-assisted) | 15 min |
| Tally form setup + embed | 30 min |
| GitHub + Vercel deploy | 20 min |
| Domain registration + DNS | 15 min |
| Stripe Payment Link setup | 15 min |
| Airbnb iCal sync | 10 min |
| **Total** | **~1.5 hours** |
