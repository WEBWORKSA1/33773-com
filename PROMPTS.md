# 33773.com — Phase-wise build prompts

Concept: **33773 Homefront**, a hyper-local storm, insurance, property-tax and home-services hub for ZIP 33773 (Largo, Pinellas County, FL), monetized by Google AdSense, high-value lead generation (insurance, roofing, windows, generators, real estate, mortgage), sponsorships, contests and reader support. Static HTML/CSS/JS on GitHub Pages (free plan).

Global rules for every phase:
- Static site only (no server), built by GitHub Pages' native Jekyll: one shared `_layouts/default.html`, content pages with front matter.
- AdSense script in `<head>` of every page: `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6620975821265271" crossorigin="anonymous"></script>` plus `ads.txt` with `google.com, pub-6620975821265271, DIRECT, f08c47fec0942fa0`.
- Top strip on every page: "Contact, if you are interested in this website/domain name/Sponsorship/Advertisement/Partnership" linking to https://web.works/contact.
- One owner inbox for all forms. Never print it in HTML, README or any visible text; store it encoded in `assets/js/config.js` and assemble the FormSubmit endpoint at runtime.
- Never use "33773" as a trademark; include the trademark/copyright disclosure in the footer and on `disclaimer.html`.
- Every legal or numeric claim links to its official source.

---

## Phase 1 — Research and positioning
> Research what "33773" means in commerce, business, AI, economy and people. Identify the strongest real-world identity of the number (USPS ZIP 33773, Largo FL), its demographics (ACS), housing market, climate risk and recent storm history. Score candidate concepts (numerology, generic number brand, hyper-local ZIP hub) on search demand, CPC of the verticals, AdSense approval risk, lead value and expandability. Pick one and justify it with numbers.

## Phase 2 — Competitive teardown (25 sites)
> Visit zip-codes.com, Niche, AreaVibes, BestPlaces, City-Data, Zillow, Redfin, Realtor.com, Census QuickFacts, FEMA MSC, Ready.gov, NHC, Patch, Nextdoor, Policygenius, NerdWallet, Bankrate, Angi, Thumbtack, FloridaDisaster.org, Citizens, First Street, NeighborhoodScout, largo.com and pinellas.gov. Extract a feature matrix (sections, tools, lead forms, trust signals, ad placement) and a consolidated must-have list.

## Phase 3 — Design system and shell
> Build `assets/css/site.css` and the page shell in `_layouts/default.html`: Archivo (variable width) for display, Atkinson Hyperlegible for body at 18px for an older audience; palette Gulf ink #0E3B4A, fog #EEF3F4, storm-flag red #C8312B for primary actions, mangrove green #2F6B4F, sun #F2B33D. Sticky header, mobile menu, owner contact strip, footer with newsletter, trademark notice, cookie/ads notice, mobile sticky "Get 3 local quotes" bar, dark mode, visible focus, reduced motion, no horizontal scroll at 390px. Layout outputs canonical URLs on https://33773.com, OG tags and WebSite/Article JSON-LD; FAQ sections carry FAQPage JSON-LD; `jekyll-sitemap` builds sitemap.xml.

## Phase 4 — Home page
> Hero: the ZIP set huge with the last "3" in red, headline, two CTAs, and a live Atlantic hurricane-season tracker (June 1–Nov 30, day count, peak window) with Know Your Zone, NHC and checklist links. Then: six-service lead picker, ZIP-at-a-glance stats (ACS), guide list, inline storm-kit calculator, three lazy YouTube embeds, contests/support/advertise trio, FAQ.

## Phase 5 — Lead generation (highest priority revenue)
> Build `get-quotes.html`: 4-step form (service → property: ZIP, type, year built, roof age, current insurer → timeline & notes → contact with TCPA-style consent), progress bar, `?service=` preselect, honeypot, redirect to `thank-you.html` (noindex). Add trust copy, referral-fee disclosure, DBPR licence link, FAQ. Every guide sidebar and service tile deep-links to the form with the right service preselected.

## Phase 6 — Content for AdSense approval
> Write original, sourced guides (≥700 words each): hurricane checklist, homeowners insurance, flood insurance, homestead exemption (incl. neutral summary of the Nov 2026 Amendment 3), My Safe Florida Home, after-the-storm claims, roofs & insurance, retiring in Largo, selling a home. Plus storm-ready hub (NHC outlook image, official links, saved go-bag checklist), ZIP profile with sourced data, local parks page, guides index, site map.

## Phase 7 — Tools
> Client-side calculators: storm kit (Ready.gov 1 gal/person/day), true monthly cost (P&I + tax + wind + flood + HOA), homestead savings ($25,000 all taxes + up to $26,411 non-school), flood-risk self-check routing to flood quotes. Inputs stay on device.

## Phase 8 — Community and revenue pages
> `contests.html` (Storm-Ready Home Challenge, Best of 33773 photo contest, Local Hero award; skill-judged, no purchase necessary, 18+, official rules summary, entry form, sponsor-a-prize CTA). `support.html` (tiers, allocation bars for operations / talent / promotion / prizes / reserve, pledge form, auto-switch to PayPal/Stripe/BMC buttons when links are set in config.js, not-tax-deductible notice). `advertise.html` (quote partner, featured listing, sponsored guide, newsletter, contest sponsor, domain acquisition → web.works/contact, media-kit form). `careers.html` (writers, video creators, photographers, partnerships sales, licensed reviewers + application form). `videos.html`.

## Phase 9 — Compliance pages
> `about.html` (editorial standards, funding), `contact.html`, `privacy.html` (AdSense/third-party cookie language, opt-out links, FormSubmit processor, CCPA note, EEA consent), `terms.html`, `disclaimer.html` (number/ZIP trademark disclosure, USPS ZIP Code® notice, no-government-affiliation, nominative use, DMCA route, ad/referral disclosure), `404.html`, `robots.txt`, `ads.txt`, `site.webmanifest`, favicon.

## Phase 10 — QA, deploy, launch
> Build, screenshot desktop and 390px mobile, confirm zero console errors and no horizontal scroll, run the quote form end to end, grep that the owner inbox never appears in output, confirm one AdSense tag per page. Push to github.com/WEBWORKSA1/33773-com (main). Then: Settings → Pages → Deploy from branch main / (root); add custom domain 33773.com with A records 185.199.108-111.153 and a CNAME for www; enable HTTPS; submit sitemap in Search Console; apply in AdSense and turn on Auto ads and Google's consent message (EEA/UK).

## Phase 11 — Growth (post-launch)
> Clone the template for neighbouring ZIPs (33770, 33771, 33774, 33777, 33778) as /zip/<code>/ pages; add a vetted directory with featured-listing billing; storm-season newsletter; Spanish versions of the storm hub; a reviewed "best carriers for Pinellas" comparison once partner agreements exist.
