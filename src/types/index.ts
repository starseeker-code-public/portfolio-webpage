export interface Project {
  title: string
  /** Matches the repo / local folder name — also the cover filename in src/assets/projects. */
  slug: string
  desc: string
  /** Explicit cover override; when absent the slug-named asset is used, else a generated cover. */
  image?: string
  github: string
  projectUrl: string
  tags: string[]
  isInDevelopment: boolean
  isFeatured: boolean
}

export interface ExperienceEntry {
  period: string
  role: string
  company: string
  companyUrl: string
  desc: string
  details: string
  projectInfo?: string
  tags: string[]
}

export interface TeachingEntry {
  period: string
  role: string
  company: string
  companyUrl: string
  desc: string
}

export interface OpenSourceRepo {
  name: string
  desc: string
  stars: number
  github: string
  tags: string[]
}

export interface Service {
  icon: string
  title: string
  desc: string
  details: string
}

export interface BlogPost {
  title: string
  date: string
  url: string
  readTime: string
}

export interface Testimonial {
  name: string
  role: string
  text: string
  email: string
  phone: string
}

export interface Certification {
  name: string
  issuer: string
  year: string
}

export interface Language {
  lang: string
  level: string
}

export interface Education {
  degree: string
  school: string
  year: string
}


export interface Stat {
  label: string
  value: string
}

export interface SkillGroup {
  label: string
  items: string[]
}