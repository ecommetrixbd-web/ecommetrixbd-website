# Ecommetrix Website (Astro)

Pages: Home `/` · Services `/services` · Our Work `/work` · Work detail `/work/<name>` · Blog `/blog` · Blog post `/blog/<name>` · Contact `/contact`

## Where to change things (no coding needed, just edit text)

| What | File |
|---|---|
| Phone, email, address, Facebook, form key | `src/data/site.ts` |
| Hero carousel slides and their images | `src/data/site.ts` → `heroSlides` |
| Portfolio projects and their detail pages | `src/data/work.ts` |
| Colors and fonts | `src/styles/global.css` (top: `--noir`, `--oxblood`, `--gold` …) |
| Images | put files in `public/images/services/` or `public/images/work/`, then write the path, e.g. `'/images/services/meta-ads.jpg'` |
| Video inside the "Video & Creative" card | save an MP4 as `public/videos/creative-reel.mp4` (5–10 seconds, under 3 MB) |
| Team members | `src/components/Team.astro` |

A dashboard for all of this comes in Phase 4.

## Write a blog post
1. Copy any file in `src/content/blog/`, e.g. `boost-vs-ads-manager.md`, and rename it. The file name becomes the web address: `my-new-post.md` → `/blog/my-new-post`. Use small letters and dashes only.
2. Change the top part between the `---` lines:
   - `title`, `description` (1–2 lines), `date` (YYYY-MM-DD)
   - `category`: one of `Meta Ads`, `Tracking`, `Content`, `Case Studies`, `Tips`
   - `cover` (optional): e.g. `/images/blog/my-post.jpg` (put the image in `public/images/blog/`)
   - `draft: true` hides the post until you are ready
3. Write the post below the second `---`. `## Heading` makes a heading, `- item` makes a list, `**word**` makes bold.
Common error: the build fails with "category" → the category must be spelled exactly as in the list above.

## Contact form → your email
1. Go to https://web3forms.com, enter your email, copy the **Access Key**.
2. Paste it in `src/data/site.ts` → `web3formsKey: 'your-key'`.
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
