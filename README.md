# Public Health Solutions (U) Ltd. — Website

**Version:** 1.0  
**Built:** 2025  
**Stack:** Pure HTML5, CSS3, Vanilla JavaScript — no framework required

---

## File Structure

```
PHS/
├── index.html                    # Home page
├── about.html                    # About Us
├── services.html                 # Services hub (3 tabbed business lines)
├── industries.html               # 6 industry deep-dive sections
├── safety.html                   # Safety & compliance
├── testimonials.html             # Testimonials + 3 case studies
├── contact.html                  # Quote form + contact info
├── styles.css                    # Master stylesheet (all CSS variables)
├── main.js                       # Scroll animations, nav, slider, forms
├── README.md                     # This file
└── services/
    ├── termite-control.html
    ├── mosquito-management.html
    ├── fumigation.html
    ├── warehouse-pest-control.html
    └── hotel-pest-management.html
```

---

## How to Deploy

### Option 1: Direct Upload (Simple Hosting)
1. Upload all files maintaining the exact folder structure above.
2. Ensure `services/` subdirectory is uploaded with its 5 HTML files.
3. No server-side configuration required — all files are static HTML/CSS/JS.

### Option 2: cPanel / File Manager
1. Log into cPanel and navigate to **File Manager**.
2. Open the `public_html` folder (or the folder for your domain).
3. Upload all files via File Manager or FTP.
4. Maintain folder structure exactly as shown above.

### Option 3: GitHub Pages
```bash
git init
git add .
git commit -m "Initial PHS website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/phs-website.git
git push -u origin main
```
Then enable GitHub Pages from repository Settings → Pages.

### Option 4: Netlify (Recommended for Zero-Config)
1. Drag and drop the entire `PHS/` folder onto [netlify.com/drop](https://netlify.com/drop)
2. Your site goes live instantly on a Netlify subdomain.
3. Connect your custom domain `phs-africa.com` in Netlify settings.

---

## Replacing Image Placeholders

All image containers are marked with this comment pattern in the HTML:
```html
<!-- REPLACE WITH: [Description of photo needed] -->
```

### Photography Checklist

| Location | Description | Recommended Size |
|----------|-------------|-----------------|
| `index.html` Hero | Kampala city skyline or technician in yellow uniform | 1920×1080px |
| `about.html` Team | PHS team/technicians in branded yellow uniforms | 800×600px |
| `industries.html` Hotels | Luxury hotel lobby or clean hotel kitchen | 800×600px |
| `industries.html` Embassy | Formal building exterior | 800×600px |
| `industries.html` Warehouse | Large warehouse interior with racking | 800×600px |
| `industries.html` School | School campus — clean, professional | 800×600px |
| `safety.html` Technician | Technician in full PPE (gloves, mask, coverall) | 800×600px |
| `testimonials.html` Before/After | Before/after pest treatment comparison photos | 600×320px each |
| Service sub-pages | Service-specific action photos | 800×600px |

### How to Replace a Placeholder

1. Find the `img-placeholder` div in the HTML
2. Replace the entire `<div class="img-placeholder ...">` with:
```html
<img 
  src="path/to/your-photo.jpg" 
  alt="Descriptive alt text here" 
  loading="lazy"
  width="800" 
  height="600"
  style="width:100%;height:100%;object-fit:cover;"
/>
```

### Recommended Image Formats
- Use **WebP** format for best performance (with JPEG fallback)
- Compress all images to under 300KB using [Squoosh](https://squoosh.app/)
- Minimum resolution: 800×600px for content images, 1920×1080px for full-width backgrounds

---

## Form Setup (Contact Page)

The quote form on `contact.html` is configured for **Formspree** — a free form backend service.

### Setup Steps

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form and copy your **Form ID** (looks like: `xpzgwkqr`)
3. In `contact.html`, find this line:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```
4. Replace `YOUR_FORM_ID` with your actual Formspree form ID:
```html
<form action="https://formspree.io/f/xpzgwkqr" method="POST">
```
5. In your Formspree dashboard, set the notification email to `info@phs-africa.com`

### Alternative: EmailJS (No Server Required)
If you prefer not to use Formspree, the form already includes JavaScript success state — the `form-success` div will show when the JS validates the form successfully. You can modify `main.js` to use EmailJS instead.

---

## Google Maps Embed Setup

In `contact.html`, find this placeholder:
```html
<!-- REPLACE WITH: Google Maps Embed API for Plot 43 Bukoto Street, Kamwokya, Kampala -->
```

Replace the placeholder div with:
```html
<iframe 
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7577!2d32.5836!3d0.3152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbb00!2sBukoto+Street+Kamwokya!5e0!3m2!1sen!2sug!4v1234567890"
  width="100%" 
  height="360" 
  style="border:0;filter:contrast(1.05) saturate(0.85);" 
  allowfullscreen="" 
  loading="lazy" 
  referrerpolicy="no-referrer-when-downgrade"
  title="PHS Uganda Office Location">
</iframe>
```

**Note:** Generate the actual embed URL by:
1. Going to Google Maps
2. Searching "Plot 43 Bukoto Street Kamwokya Kampala"
3. Click Share → Embed a map → Copy HTML

---

## Customization Guide

### Colors
All colors are CSS custom properties in `styles.css`:
```css
:root {
  --phs-deep-green:  #0D3B2E;
  --phs-gold:        #C9A84C;
  --phs-sage:        #4A7C59;
  --phs-cream:       #F7F3EC;
  --phs-charcoal:    #1C1C1C;
}
```
Change any color here and it updates site-wide.

### Typography
Font families are loaded from Google Fonts CDN and referenced via CSS variables:
```css
--font-display:  'Cormorant Garamond', Georgia, serif;
--font-heading:  'Cinzel', 'Times New Roman', serif;
--font-body:     'Jost', 'Segoe UI', sans-serif;
```

### Navigation
The navigation auto-detects scroll position:
- Pages with `nav--transparent` class: transparent on load, solid dark green when scrolled
- Pages with `nav--light-default` class: always light cream background

To change a page's nav style, modify the nav element class in that page's HTML.

### WhatsApp Link
The WhatsApp float button links are pre-configured:
```
https://wa.me/256714100915?text=Hello%20PHS%2C%20I%27d%20like%20to%20request%20a%20quote
```
Update the phone number `256714100915` if the WhatsApp number changes.

---

## SEO & Analytics

### Adding Google Analytics
Add before `</head>` on every page:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```
Replace `G-XXXXXXXXXX` with your Google Analytics Measurement ID.

### Meta Tags
Each page has unique `<title>` and `<meta name="description">` tags. Open Graph tags are also included for social sharing. Update these to reflect any content changes.

### Sitemap
Create a `sitemap.xml` file in the root directory:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://www.phs-africa.com/</loc><priority>1.0</priority></url>
  <url><loc>https://www.phs-africa.com/about.html</loc></url>
  <url><loc>https://www.phs-africa.com/services.html</loc></url>
  <url><loc>https://www.phs-africa.com/industries.html</loc></url>
  <url><loc>https://www.phs-africa.com/safety.html</loc></url>
  <url><loc>https://www.phs-africa.com/testimonials.html</loc></url>
  <url><loc>https://www.phs-africa.com/contact.html</loc></url>
  <url><loc>https://www.phs-africa.com/services/termite-control.html</loc></url>
  <url><loc>https://www.phs-africa.com/services/mosquito-management.html</loc></url>
  <url><loc>https://www.phs-africa.com/services/fumigation.html</loc></url>
  <url><loc>https://www.phs-africa.com/services/warehouse-pest-control.html</loc></url>
  <url><loc>https://www.phs-africa.com/services/hotel-pest-management.html</loc></url>
</urlset>
```

---

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Edge 90+ | ✅ Full |
| iOS Safari 14+ | ✅ Full |
| Android Chrome | ✅ Full |
| IE 11 | ❌ Not supported |

---

## Performance Notes

- All below-fold images use `loading="lazy"` for performance
- Google Fonts are loaded with `preconnect` for faster font loading
- CSS is structured with custom properties for easy theming
- JavaScript uses `IntersectionObserver` (native, no polyfill needed)
- No external JS frameworks or icon libraries — all SVG icons are inline

---

## Contact & Support

**Public Health Solutions (U) Ltd.**  
Plot 43, Bukoto Street, Kamwokya  
P.O. Box 70908, Kampala, Uganda  

📞 0714 100 915 · 0393 266 362  
✉️ info@phs-africa.com  
🌐 www.phs-africa.com  

*A subsidiary of Pangolin International*
