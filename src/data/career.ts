/* Leaf module: no React, no browser APIs. Both the app and vite.config.ts import
   through here, so the career length in the page metadata can never drift from
   the one rendered in the hero. */
const CAREER_START = new Date(2018, 5, 1)

export const YEARS_EXP = Math.floor(
  (Date.now() - CAREER_START.getTime()) / (365.25 * 24 * 60 * 60 * 1000),
)
