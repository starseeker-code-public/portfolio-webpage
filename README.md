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

| Version | Date | Description |
| ------- | ---- | ----------- |
| **current** | 2026-04-16 | Blog and Contributions added back |
| — | 2026-04-15 | Updated sections and activated Blog and Contributions |
| — | 2026-03-17 | Added name effect |

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Sections That Are Commented Out](#sections-that-are-commented-out)
- [Local Development](#local-development)
- [Deployment to Netlify](#deployment-to-netlify)
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

---

## Sections That Are Commented Out

Some sections are wrapped in comments in the code — not bugs, features not yet finished.

- **Open Source** — A showcase for OSS contributions. Component and data structure are ready; needs actual repos worth showing.

- **Blog** — Post listing section. Interface is there (`title`, `date`, `url`, `readTime`), the component renders beautifully. What's missing? The actual blog posts. Turns out writing code is easier than writing *about* code.

- **Volunteering** (CV page) — Commented out from the CV layout while figuring out the best way to present it without the page overflowing. Print CSS is an art form and I respect the A4 boundary.

These can be re-enabled by uncommenting them in `src/pages/Home.tsx` and `src/pages/CV.tsx`. Data arrays in `src/data/index.ts` just need to be populated.

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

## License

AGPL-3.0
