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
| **current** | 2026-04-16 | Blog and Contributions added back |
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

The `Blog` section fetches live posts from the personal blog repository at runtime via `src/data/blog.ts`. The hook (`useBlogPosts`) calls `BLOG_API_URL` on mount and replaces the preview post with the live feed on success. On network failure it silently falls back to the single preview post — no broken UI.

**To publish a post**, add an entry to `posts.json` in the [personal-blog](https://github.com/starseeker-code-public/personal-blog) repo:

```json
[
  {
    "title": "Post title",
    "date": "Jun 2026",
    "readTime": "5 min",
    "url": "https://link-to-post"
  }
]
```

The file must be served at `BLOG_API_URL` (currently the raw GitHub URL defined in `src/data/blog.ts`).

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

| Project | Status | GitHub |
| ------- | ------ | ------ |
| Five a Day eVolution | ✅ Active | [![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat-square&logo=github)](https://github.com/starseeker-code-public/five-a-day) |
| Joy — AI Journal | 🔬 In Development | [![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat-square&logo=github)](https://github.com/starseeker-code-public/joy-ai-rest-journaling-system) |
| Personal Blog | ✅ Active | [![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat-square&logo=github)](https://github.com/starseeker-code-public/personal-blog) |
| Eternal Crusade | 🔬 In Development | [![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat-square&logo=github)](https://github.com/starseeker-code-public/eternal-crusade) |
| My Roadmap | 📋 Active | [![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat-square&logo=github)](https://github.com/starseeker-code-public/my-roadmap) |

---

## License

AGPL-3.0
