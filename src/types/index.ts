export interface Project {
  title: string
  desc: string
  image: string
  github: string
  projectUrl: string
  tags: string[]
  isInDevelopment: boolean
}

export interface ExperienceEntry {
  period: string
  role: string
  company: string
  desc: string
  details: string
  tags: string[]
}

export interface TeachingEntry {
  period: string
  role: string
  company: string
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

export interface Volunteering {
  role: string
  org: string
  desc: string
  period: string
}

export interface Stat {
  label: string
  value: string
}

export interface SkillGroup {
  label: string
  items: string[]
}