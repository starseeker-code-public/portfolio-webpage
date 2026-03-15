# JOA.DEV — Portfolio Website

> A backend engineer walked into a frontend project. The CSS didn't crash. Miracles happen.

Personal portfolio and CV website for **Joaquin Hernandez Martinez**, a senior Python engineer who decided that building microservices for Mercedes-Benz and refactoring 2 million lines of code wasn't stressful enough — so he also built his own website from scratch.

---

## Tech Stack

Because every portfolio README needs a tech stack section, and this one actually earns it:

| Layer | Technology | Why |
|-------|-----------|-----|
| **Framework** | [React 18](https://react.dev) | Components, hooks, and the comforting illusion of control |
| **Language** | [TypeScript 5](https://www.typescriptlang.org) | Because `any` is not a personality trait |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com) | Utility-first CSS. Yes, the class names are long. No, I don't care |
| **Build** | [Vite 5](https://vitejs.dev) | Instant HMR. Life's too short for webpack |
| **Routing** | [React Router 6](https://reactrouter.com) | Two routes. Could've been an `if` statement, but here we are |
| **CSS Processing** | PostCSS + Autoprefixer | So Safari users can also enjoy the site |
| **Hosting** | [Netlify](https://netlify.com) | Push to main, site deploys. That's the whole CI/CD |

Custom fonts loaded via Google Fonts: **Tomorrow** (body), **Anta** (headings), plus a few others available in the Tailwind config for when the mood strikes.

---

## Architecture

```
src/
├── data/           # Single source of truth (index.ts)
│   └── index.ts    # All site content lives here. One file to rule them all.
├── types/          # TypeScript interfaces
│   └── index.ts    # ExperienceEntry, Project, SkillGroup, etc.
├── sections/       # Page sections (Hero, About, Experience, ...)
├── components/
│   ├── ui/         # Reusable UI atoms (Tag, Section, SectionHeading, ...)
│   ├── layout/     # Navbar, Footer
│   └── icons/      # SVG icon components
├── pages/
│   ├── Home.tsx    # Main portfolio page
│   └── CV.tsx      # Printable CV page (yes, it prints nicely)
├── index.css       # Global styles, animations, print styles
└── App.tsx         # Router. Two routes. Very enterprise.
```

### Design Principles

**Data-driven rendering.** Every section reads from `src/data/index.ts`. Want to add a job? Add an object. Want to change your bio? Edit a string. The components don't know or care what you've done for a living — they just render it.

**Zero state management.** No Redux, no Zustand, no Context wrappers wrapping wrappers. The site is entirely presentational with local `useState` only where interactivity demands it (expandable tags, collapsible experience details). A backend engineer's dream frontend.

**Type safety everywhere.** Every data structure has a TypeScript interface. The compiler catches your typos so your recruiter doesn't have to.

**Component composition over configuration.** Small, focused components (`Tag`, `Section`, `SectionHeading`) composed together in section-level components. No prop drilling marathons, no render prop gymnastics.

---

## How HTML, Styles, and Scripts Work Together

This is a **single-page application** (SPA) built with Vite's React template. Here's how the pieces connect:

### HTML
A single `index.html` at the root serves as the entry point. It contains nothing but a `<div id="root">` and a `<script>` tag pointing to `src/main.tsx`. React takes it from there. The HTML file is blissfully unaware of the chaos happening inside.

### Styles
Tailwind CSS handles 95% of the styling via utility classes directly in JSX. The remaining 5% lives in `src/index.css` for things Tailwind can't do inline:

- **Animations** — typewriter cursor blink, star drift, experience card highlight pulse
- **Keyword glow** — subtle text-shadow effect on highlighted bio keywords
- **Hint popup** — timed fade-in/fade-out for the "hover tags to explore" tooltip
- **Print styles** — `@media print` rules so the CV page renders beautifully on paper

PostCSS processes Tailwind directives (`@tailwind base/components/utilities`) and Autoprefixer handles vendor prefixes. The Tailwind config extends the default theme with custom font families.

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

**That's it.** Netlify watches the `main` branch, runs `npm run build`, and serves the `dist/` folder. The redirect rule ensures React Router handles all routes instead of Netlify returning 404s for `/cv`.

To deploy your own:
1. Fork this repo
2. Connect it to Netlify
3. It just works. No environment variables, no secrets, no build args.

---

## Sections That Are Commented Out

You might notice some sections in the code wrapped in comments like artifacts from a lost civilization. They're not bugs — they're **features I haven't had time to finish yet:**

- **Open Source** — A showcase for open source contributions. The component exists, the data structure is ready, but the repos section needs actual repos worth showing. It's on the list, right after "sleep" and "touch grass."

- **Blog** — A blog post listing section. The interface is there (`title`, `date`, `url`, `readTime`), the component renders beautifully. What's missing? The actual blog posts. Turns out writing code is easier than writing *about* code.

- **Volunteering** (CV page) — Commented out from the CV layout while I figure out the best way to present it without the page overflowing into a second sheet. Print CSS is an art form and I respect the A4 boundary.

These sections are fully implemented in code and can be re-enabled by uncommenting them in `src/pages/Home.tsx` and `src/pages/CV.tsx`. The data arrays in `src/data/index.ts` just need to be populated. One day. Probably.

---

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. Marvel at the animated stars. Hover over the tech stack tags. Click "More details" on the experience cards. Print the CV. Send it to someone who's hiring.

### Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

---

## License

AGPL-3.0 — because if you're going to look at my portfolio source code, you might as well share yours too.
