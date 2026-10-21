# 33773.com — 33773 Homefront

Hyper-local storm, insurance, property-tax and home-services hub for ZIP 33773 (Largo, Pinellas County, Florida). Static site built by GitHub Pages' own Jekyll on the free plan; no workflow or server needed.

## Structure
- `_layouts/default.html` — the shared shell on every page: AdSense tag, owner contact strip, header, nav, footer, trademark notice, cookie notice, scripts. Change it once and every page updates.
- `*.html`, `guides/*.html` — page content. Each starts with front matter (`title`, `description`, optional `nav`, `type: "article"`, `sticky: "no"`, `noindex: true`).
- `assets/css/site.css`, `assets/js/main.js` — design system and behaviour (multi-step quote form, form relay, calculators, season tracker, lazy video, checklists).
- `assets/js/config.js` — payment links for the Support page and the encoded form relay key. Paste PayPal / Stripe / Buy Me a Coffee URLs here to turn on instant checkout.
- `_config.yml` — site settings; `jekyll-sitemap` generates `sitemap.xml` automatically.

## Add a page
Copy an existing page, edit its front matter and content, push. Links inside pages are relative; links in the layout use `{{ site.baseurl }}` so the site works both at `webworksa1.github.io/33773-com/` and on `33773.com`.

## Publishing
Settings → Pages → Build and deployment → Source: **Deploy from a branch**, branch **main**, folder **/ (root)**.

## Forms
All forms post through FormSubmit to the owner inbox. The first submission triggers a one-time FormSubmit activation email; click **Activate** in it, or no further submissions are delivered.

## Custom domain
1. Registrar DNS for 33773.com: A records `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`; CNAME `www` → `webworksa1.github.io`.
2. Settings → Pages → Custom domain: `33773.com`, then tick **Enforce HTTPS**.

## AdSense
The AdSense tag is in the head of every page and `ads.txt` is at the root. Once approved, turn on Auto ads and Google's consent message for EEA/UK visitors in AdSense → Privacy & messaging. `ads.txt` must be reachable at `https://33773.com/ads.txt`, so connect the custom domain before applying.

## Trademark notice
"33773" is a number and a USPS ZIP Code; no exclusive rights are claimed. See `disclaimer.html`.
