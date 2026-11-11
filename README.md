# Ecommetrix Website (Astro)

Pages: Home `/` · Services `/services` · Our Work `/work` · Work detail `/work/<name>` · Blog `/blog` · Blog post `/blog/<name>` · Contact `/contact`

## Edit the site from the dashboard (Pages CMS)
1. Go to https://app.pagescms.org and click **Sign in with GitHub**.
2. Open **ecommetrixbd-web / ecommetrixbd-website** (branch `main`).
3. Use the sections in the left menu: Site Settings, Homepage, Services, Video Portfolio, Our Work, Team, Blog, FAQ, and Media (all uploaded images/videos).
4. Click **Save**. Cloudflare rebuilds the site; changes are live in about 1–2 minutes.

Tips
- Lists (slides, services, videos, team, FAQ): drag items to reorder, use the + button to add.
- Theme colors are in **Site Settings → Theme colors** (hex codes like `#5C1423`).
- A social icon only appears in the footer when its link is filled in.
- Videos: paste a YouTube/Vimeo link (best, keeps the site fast) or upload an MP4 (keep it small).
- Images: upload JPG/PNG/WebP, ideally under 300 KB each.

Where the dashboard saves things (for developers): `src/content/settings/*.json`, `src/content/work/*.json`, `src/content/blog/*.md`, images in `public/images/`, videos in `public/videos/`. Dashboard setup: `.pages.yml`.

## Contact form → your email
1. Go to https://web3forms.com, enter your email, copy the **Access Key**.
2. Paste it in the dashboard: **Site Settings → Contact form key**.
Without a key the form only shows the "Thanks" message and sends nothing.

## Run it on your Mac (optional)
1. Install Node.js (LTS) from https://nodejs.org
2. Open Terminal in this folder and run `npm install` (first time only)
3. Run `npm run dev` and open http://localhost:4321
Common error: `command not found: npm` → Node.js is not installed; do step 1 and reopen Terminal.

## Put it online (Cloudflare Pages, free)
1. Upload this folder to a new GitHub repository.
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → choose the repo.
3. Framework preset: **Astro**. Build command `npm run build`. Output folder `dist`. Save and Deploy.
4. Custom domains → add `ecommetrixbd.com`.
Every change you push to GitHub goes live in 1–2 minutes.
