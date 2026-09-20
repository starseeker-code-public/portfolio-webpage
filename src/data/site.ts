import { YEARS_EXP } from './career'

/* Kept apart from ./index so vite.config.ts can import it while building the
   <head> metadata: ./index re-exports the React hooks in ./quotes and ./blog,
   which have no business being evaluated inside a build config. */
export const SITE = {
  initials:  'JOA.DEV',
  name:      'Joaquín Hernández Martínez',
  role:      ['Senior Backend Engineer', 'Leader and Architect', 'Fullstack Developer'],
  tagline:   `Building reliable back-end services, APIs, and cloud infrastructure — ${YEARS_EXP}+ years turning complex requirements into production-ready systems. Now with AI expertise`,
  email:     'proyecto_noether@outlook.com',
  photo:     '/photo.png',
  location:  'Albacete, Spain',
  fullAddress: 'Albacete, Spain',
  locationUrl: 'https://maps.app.goo.gl/DLYp7yCkraK8mQS69',
  phone:     '+34 696 02 68 63',
  phoneUrl:  'tel:+34696026863',
  website:   'https://joaquin-hm.com/',
  social: {
    github:    'https://github.com/starseeker-code-public',
    linkedin:  'https://www.linkedin.com/in/joaquin-hernandez-martinez-91a57221a/',
    instagram: 'https://www.instagram.com/starseeker-code/',
    codewars:  'https://www.codewars.com/users/Starseeker1414',
    devto:     'https://dev.to/starseeker-code',
    whatsapp:  'https://wa.me/34696026863',
  },
}
