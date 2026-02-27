# MarketingTool Web App

## Stack
- React + Vite + MUI 7 (SaasAble template base)
- Appwrite Auth (OAuth: Google, Facebook, Apple + Email/Password)
- Windmill AI backend (200+ tools)
- Dark theme only

## Critical Rules
- **DESKTOP ONLY** — no mobile responsive work. Phone app is separate.
- **Never SSH to server** without explicit user permission.
- **Never touch `.env` or `.env.qa`** — contains secrets.
- Dev server: `npm run start -- --port 3001`

## Project Structure
- `src/views/admin/` — main app pages (dashboard, tools, chat, campaigns, etc.)
- `src/views/admin/tools/index.jsx` — Tools catalogue (314 tools, 32 categories)
- `src/views/admin/tools/tool-detail.jsx` — Individual tool page
- `src/utils/api/tools/` — Tools data and search utilities
- `src/sections/` — Reusable page sections (auth, billing, settings)
- `src/layouts/AdminLayout/` — Main layout with sidebar
- `src/menu/` — Sidebar navigation config
- `src/themes/` — MUI theme (palette, typography, overrides)
- `public/images/` — All media assets (1.6GB images, 529MB videos)

## Video Guidelines (Hero Banners)
- ONLY use **landscape** videos (width > height). Check with `ffprobe`.
- NO people/hands/girls — only AI/tech/abstract/dashboard content.
- Dark backgrounds preferred to match app theme.
- Videos in `public/images/ad-library/videos/` and `public/videos/`.

## Git
- Repo: `https://github.com/Lokeninfinitypoint/rrecot-MUi-local-docker-.git`
- `.gitignore` excludes: files >100MB, `.env`, `dist/`, `node_modules/`
- Embedded `.git` repos removed from `public/images/marketingtool/` and `public/images/temp-images/`
- Full media IS tracked in git (except 3 files >100MB: google-hero.mp4, seo-hero.mp4, social-hero.mov)

## Deploy (Production)
- Appwrite Sites: `site-id 698787912bc8d4ff00f1`
- Domain: `app.marketingtool.pro`
- Server: `root@31.220.107.19`

## Key Patterns
- MUI `sx` prop for styling (not Tailwind in this app)
- Glass morphism design: `rgba(248,248,248,0.04)` bg, `blur(50px)`, subtle borders
- Accent color: `#805AF5`
- Tool images: mapped by badge/category in `BADGE_FOLDER` → `TOOL_IMAGE_MAP`
- 24 tools per page, 14 pages total
