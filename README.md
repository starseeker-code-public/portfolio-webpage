# JOA.DEV — Portfolio Website

![JOA.DEV Logo](https://github.com/starseeker-code-public/portfolio-webpage/blob/main/public/logo.png)

Personal portfolio and CV for Joaquin Hernandez Martinez

![React 18](https://img.shields.io/badge/react-18-61DAFB?style=for-the-badge&logo=react)
![TypeScript 5](https://img.shields.io/badge/typescript-5-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/tailwind-3-06B6D4?style=for-the-badge&logo=tailwindcss)
![Vite 5](https://img.shields.io/badge/vite-5-646CFF?style=for-the-badge&logo=vite)
![Netlify](https://img.shields.io/badge/hosted-netlify-00C7B7?style=for-the-badge&logo=netlify)

---

> A backend engineer walked into a frontend project. The CSS didn't crash. Miracles happen.

[![Netlify Status](https://api.netlify.com/api/v1/badges/60f3ba65-b920-404f-b666-c6b75998a3b9/deploy-status)](https://app.netlify.com/projects/joaquinhm/deploys) [![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg?style=flat-square)](https://www.gnu.org/licenses/agpl-3.0) [![Last commit](https://img.shields.io/github/last-commit/starseeker-code-public/portfolio-webpage?style=flat-square)](https://github.com/starseeker-code-public/portfolio-webpage/commits/main) [![Open issues](https://img.shields.io/github/issues/starseeker-code-public/portfolio-webpage?style=flat-square)](https://github.com/starseeker-code-public/portfolio-webpage/issues)

| Version | Date | Description |
| ------- | ---- | ----------- |
| **current** | 2026-06-04 | Blog live API with localStorage cache, background retry, and fallback message |
| — | 2026-06-04 | Years of experience auto-calculated from career start date |
| — | 2026-06-04 | Contact section cleaned up — email/phone/location + icon-only row |
| — | 2026-06-04 | Testimonials recommendation note fades in after 2 s |
| — | 2026-06-04 | Open Source section shows only real contribution (rich) |
| — | 2026-06-04 | Galaxy favicon, Netlify status badge, Projects & Status table in README |
| — | 2026-04-16 | Blog and Contributions added back |
| — | 2026-04-15 | Updated sections and activated Blog and Contributions |
| — | 2026-03-17 | Added name effect |

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Local Development](#local-development)
- [Deployment to Netlify](#deployment-to-netlify)
- [Projects & Status](#projects--status)
- [License](#license)

---

## Tech Stack

| Layer | Technology | Why |
| ----- | ---------- | --- |
| **Framework** | [React 18](https://react.dev) | Popular and useful, and the only framework I actually know for frontend |
| **Language** | [TypeScript 5](https://www.typescriptlang.org) | I like type safety and what it provides |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com) | I like CSS but I like Tailwind better, and it's easier for this kind of project |
| **Build** | [Vite 5](https://vitejs.dev) | The cool webpack, and it's easy to use |
| **Routing** | [React Router 6](https://reactrouter.com) | First time using it, provided useful and easy |
| **CSS Processing** | PostCSS + Autoprefixer | Now I'm really showing off my frontend skills hehe |
| **Hosting** | [Netlify](https://netlify.com) | Push to main, site deploys. That's the whole CI/CD. Easy, free, honestly what's not to love |

Fonts and some icons from Google.

---

## Architecture

```text
src/
├── data/           # All content lives here — data-driven rendering
│   └── index.ts
├── types/          # Interfaces
│   └── index.ts
├── sections/       # Page sections (Hero, About, Experience, ...)
├── components/
│   ├── ui/         # Reusable UI atoms (Tag, Section, SectionHeading, ...)
│   ├── layout/     # Navbar, Footer
│   └── icons/      # SVG icon components
├── pages/
│   ├── Home.tsx    # Main portfolio page
│   └── CV.tsx      # Printable CV page (yes, it prints nicely)
├── index.css       # Global styles, animations, print styles
└── App.tsx         # Router. Two routes.
```

### Design Principles

**Data-driven rendering.** Every section reads from `src/data/index.ts`. Update the data, the site updates. It almost makes frontend look easy.

**Zero state management.** No need for it — the site is static content with no interactive state.

**Type safety everywhere.** Every data structure has a TypeScript interface.

**Component composition over configuration.** Small, focused components (`Tag`, `Section`, `SectionHeading`) composed into section-level components.

### Blog Posts

Live blog posts are fetched at runtime via `src/data/blog.ts` (`useBlogPosts` hook). The fetch pipeline works as follows:

1. **On load** — fetches `BLOG_API_URL` (the personal-blog backend on Render). Up to 3 latest posts are shown.
2. **Success** — posts are saved to `localStorage` and rendered immediately.
3. **Failure** — user sees the last cached posts from `localStorage` silently. A background async retry fires after 2 minutes (and once more if that also fails), saving fresh data to cache for the next visit without touching the current UI.
4. **No cache + failure** — a blinking fallback message is shown pointing to the blog URL.

The API endpoint (`BLOG_API_URL`) and blog frontend URL (`BLOG_FRONTEND`) are the single source of truth in `src/data/blog.ts` — both exported and used across the Blog section.

**Expected API response shape:**

```json
[
  {
    "title": "Post title",
    "date": "Jun 2026",
    "readTime": "5 min",
    "url": "posts/post-slug"
  }
]
```

> Note: the backend (Render) prefixes post URLs with `a/` due to its internal router. `fixPostUrl()` in `blog.ts` strips this and prepends `BLOG_FRONTEND`.

---

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. I'm proud of the stars animation. Print the CV. Send it to someone who's hiring. Thanks <3

### Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

---

## Deployment to Netlify

Configured via `netlify.toml`:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build]
  command = "npm run build"
  publish = "dist"
```

Netlify watches `main`, runs `npm run build`, and serves `dist/`. Free. Instant. Love it.

To deploy your own:

1. Fork this repo
2. Connect it to Netlify
3. It just works — make sure you specify the `dist/` dir.

If you use it as a template, please give credit, or at least a star to this repo. Thanks <3

---

## Projects & Status

| Project | Status | GitHub | Demo |
| ------- | ------ | ------ | ---- |
| Five a Day eVolution | ✅ Active | [![GitHub five-a-day](https://img.shields.io/badge/five--a--day-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/starseeker-code-public/five-a-day) | [![Live demo](https://img.shields.io/badge/live-demo-6366f1?style=flat-square&logo=render&logoColor=white)](https://fiveaday-web.onrender.com) |
| Joy — AI Journal | 🔬 In Development | [![GitHub joy-ai-journal](https://img.shields.io/badge/joy--ai--journal-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/starseeker-code-public/joy-ai-rest-journaling-system) | — |
| Personal Blog | [![Blog API](https://img.shields.io/website?url=https%3A%2F%2Fpersonal-blog-backend-e538.onrender.com%2Fapi%2Ffeed%2Fportfolio&label=blog%20api&style=flat-square)](https://personal-blog-backend-e538.onrender.com/api/feed/portfolio) | [![GitHub personal-blog](https://img.shields.io/badge/personal--blog-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/starseeker-code-public/personal-blog) | [![Live demo](https://img.shields.io/badge/live-demo-6366f1?style=flat-square&logo=render&logoColor=white)](https://personal-blog-frontend-jjzy.onrender.com/) |
| Eternal Crusade | 🔬 In Development | [![GitHub eternal-crusade](https://img.shields.io/badge/eternal--crusade-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/starseeker-code-public/eternal-crusade) | — |
| My Roadmap | 📋 Active | [![GitHub my-roadmap](https://img.shields.io/badge/my--roadmap-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/starseeker-code-public/my-roadmap) | — |

---

## License

AGPL-3.0
