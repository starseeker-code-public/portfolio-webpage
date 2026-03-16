# JOA.DEV — Portfolio Website

> A backend engineer walked into a frontend project. The CSS didn't crash. Miracles happen.

Personal portfolio and CV website for **Joaquin Hernandez Martinez**, a senior backend engineer who decided that it was about time he had his own static portfolio website.


<p align="center">
  <img src="https://github.com/starseeker-code-public/portfolio-webpage/blob/main/public/logo.png" width="60%">
</p>


---

## Tech Stack

Because every portfolio README needs a tech stack section, and this one actually earns it:

| Layer | Technology | Why |
|-------|-----------|-----|
| **Framework** | [React 18](https://react.dev) | Popular and useful, and the only framework I actually know for frontend |
| **Language** | [TypeScript 5](https://www.typescriptlang.org) | I like type safety and what it provides |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com) | I like CSS but I like Tailwind better, and it's easier for this kinf od project |
| **Build** | [Vite 5](https://vitejs.dev) | The cool webpack, and it's easy to use |
| **Routing** | [React Router 6](https://reactrouter.com) | First time using it, provided useful and easy |
| **CSS Processing** | PostCSS + Autoprefixer | Now I'm really showing off my frontend skills hehe |
| **Hosting** | [Netlify](https://netlify.com) | Push to main, site deploys. That's the whole CI/CD. Easy, free, honestly what's not to love |

Fonts and some icons from Google.

---

## Architecture

```
src/
├── data/           # Where the magic happens, all my architecture revolves around having all the data here
│   └── index.ts
├── types/          # Interfaces (I love them)
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

**Data-driven rendering.** Every section reads from `src/data/index.ts`. Dependency injection makes life easy by just taking this data and rendering the correct styles in the right component. It almost makes frontend look easy.

**Zero state management.** My frontend skills are limited, so no need for this extra complication and the site doesn't need it TBH.

**Type safety everywhere.** Every data structure has a TypeScript interface.

**Component composition over configuration.** Small, focused components (`Tag`, `Section`, `SectionHeading`) composed together in section-level components.

---

## How HTML, Styles, and Scripts Work Together

This is a **single-page application** (SPA) built with Vite's React template. Here's how the pieces connect:

### HTML
A single `index.html` at the root serves as the entry point. It contains nothing but a `<div id="root">` and a `<script>` tag pointing to `src/main.tsx`. React takes it from there.

### Styles
Tailwind CSS handles 95% of the styling via utility classes directly in JSX. The remaining 5% lives in `src/index.css` for things Tailwind can't do inline:

### Scripts
Everything is TypeScript compiled by Vite (via esbuild for dev, Rollup for production). React Router provides client-side routing between `/` (Home) and `/cv` (CV page). Vite's HMR gives instant feedback during development.

The build pipeline: `tsc` (type-check) → `vite build` (bundle) → static files in `dist/`.

---

## Deployment to Netlify

Deployment is configured via `netlify.toml` at the project root:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build]
  command = "npm run build"
  publish = "dist"
```

**That's it.** Netlify watches the `main` branch, runs `npm run build`, and serves the `dist/` folder. Man I love Netlify. And it's free.

To deploy your own:
1. Fork this repo
2. Connect it to Netlify
3. It just works. Make sure you specify the `dist/` dir.
   **If you use it as template, please give credit, or at least a star to this repo. Thanks <3**

---

## Sections That Are Commented Out

You might notice some sections in the code wrapped in comments like artifacts from a lost civilization. They're not bugs — they're **features I haven't had time to finish yet.** Some of them have testing text, some of them have some kind of structure.

- **Open Source** — A showcase for open source contributions. The component exists, the data structure is ready, but the repos section needs actual repos worth showing. It's on the list, right after "sleep" and "touch grass."

- **Blog** — A blog post listing section. The interface is there (`title`, `date`, `url`, `readTime`), the component renders beautifully. What's missing? The actual blog posts. Turns out writing code is easier than writing *about* code.

- **Volunteering** (CV page) — Commented out from the CV layout while I figure out the best way to present it without the page overflowing into a second sheet. Print CSS is an art form and I respect the A4 boundary.

These sections are fully implemented in code and can be re-enabled by uncommenting them in `src/pages/Home.tsx` and `src/pages/CV.tsx`. The data arrays in `src/data/index.ts` just need to be populated. One day. Probably. When I have the time.

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

## License

AGPL-3.0
