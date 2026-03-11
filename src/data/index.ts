import type {
  Project, ExperienceEntry, OpenSourceRepo, Service,
  BlogPost, Testimonial, Certification, Language,
  Education, Volunteering, Stat, SkillGroup,
} from '../types'

export const SITE = {
  initials:  'JOA.DEV',
  name:      'Joaquín Hernández Martínez',
  role:      'Senior Software Engineer',
  tagline:   'Building systems that scale — from data pipelines to APIs — with the same precision required to navigate the cosmos.',
  email:     'proyecto_noether@outlook.com',
  photo:     '/photo.jpg',
  location:  'Albacete, Spain',
  phone:     '+34 696 02 68 63',
  website:   'joaquin.com',
  social: {
    github:    'https://github.com/starseeker-code-public',
    linkedin:  '#',
    instagram: '#',
    codewars:  'https://www.codewars.com/users/starseeker-code',
  },
}

export const STATS: Stat[] = [
  { label: 'Years exp.',   value: '7+' },
  { label: 'Projects',     value: '20+' },
  { label: 'Codewars kyu', value: '3' },
]

export const BIO =
  "I build robust backend systems, data pipelines, and infrastructure as code. Passionate about clean architecture, automation, and the occasional stargazing session. When I'm not writing Python, I'm seting up my telescope."

export const SKILL_GROUPS: SkillGroup[] = [
  { label: 'Languages',    items: ['Python', 'Go', 'Rust'] },
  { label: 'Frameworks',   items: ['FastAPI', 'Django', 'Flask', 'Celery'] },
  { label: 'Data & Infra', items: ['PostgreSQL', 'Redis', 'Airflow', 'Pulumi'] },
  { label: 'DevOps',       items: ['Docker', 'AWS', 'Terraform', 'Jenkins'] },
  { label: 'Practices',    items: ['TDD', 'Clean Arch.', 'OpenAPI', 'Async'] },
]

export const SKILLS = SKILL_GROUPS.flatMap(g => g.items)

export const EXPERIENCE: ExperienceEntry[] = [
  {
    period:  'May 2025 – Present',
    role:    'Senior Python Developer',
    company: 'Allot',
    desc:    'Senior Python engineer in ASM (Allot Secure Management) team. Responsible of ASM microservices code, as well as QA testing. Very complex cybersecurity backend for ISP traffic and user security management.',
    tags:    ['Python', 'Flask', 'MongoDB', 'Redis', 'Kubernetes', 'OpenAPI'],
  },
  {
    period:  'May 2024 – April 2025',
    role:    'Senior Backend engineer',
    company: 'Mercedes Benz',
    desc:    'Senior Python engineer in Automation team. Responsible of Pulumi infrastructure as code for Azure MLOps and Data Warehouse resources, as well as Azure administration and giving support to data and AI teams. Very complex infrastructure as code and Pulumi microservices architecture for Azure provisioning.',
    tags:    ['Python', 'Pulumi', 'FastAPI', 'Azure', 'Docker'],
  }
]

export const PROJECTS: Project[] = [
  {
    title:  'OrbitDB',
    desc:   'High-performance time-series database wrapper for astronomical observation data.',
    image:  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
    github: 'https://github.com',
    tags:   ['Python', 'PostgreSQL', 'FastAPI'],
  },
  {
    title:  'Nebula Pipeline',
    desc:   'Distributed ETL pipeline for processing large-scale sensor datasets.',
    image:  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80',
    github: 'https://github.com',
    tags:   ['Celery', 'Redis', 'Pandas'],
  },
  {
    title:  'StarAPI',
    desc:   'RESTful API serving real-time weather and atmospheric data for observatory stations worldwide.',
    image:  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80',
    github: 'https://github.com',
    tags:   ['FastAPI', 'Docker', 'AWS'],
  },
  {
    title:  'Pulsar CLI',
    desc:   'Developer-friendly CLI toolkit for managing cloud infrastructure deployments.',
    image:  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80',
    github: 'https://github.com',
    tags:   ['Python', 'Typer', 'Terraform'],
  },
]

export const OPEN_SOURCE: OpenSourceRepo[] = [
  {
    name:   'httpx-retries',
    desc:   'Retry middleware for HTTPX with exponential backoff and jitter. Used by 200+ projects.',
    stars:  340,
    github: 'https://github.com',
    tags:   ['Python', 'HTTP', 'Async'],
  },
  {
    name:   'pydantic-settings-toml',
    desc:   'Zero-dependency TOML config source plugin for pydantic-settings.',
    stars:  180,
    github: 'https://github.com',
    tags:   ['Pydantic', 'TOML', 'Config'],
  },
  {
    name:   'fastapi-pagination-cursor',
    desc:   'Cursor-based pagination extension for FastAPI with SQLAlchemy support.',
    stars:  95,
    github: 'https://github.com',
    tags:   ['FastAPI', 'SQLAlchemy'],
  },
]

export const SERVICES: Service[] = [
  { icon: '⚙️', title: 'Backend Development',      desc: 'Scalable REST and async APIs with FastAPI or Django. From greenfield to production-ready.' },
  { icon: '🔁', title: 'Data Pipelines & ETL',      desc: 'Robust data workflows with Airflow, Celery, and Pandas. Batch or streaming.' },
  { icon: '🐳', title: 'DevOps & Cloud',             desc: 'Dockerized deployments, CI/CD pipelines, and AWS infrastructure as code with Terraform.' },
  { icon: '🔍', title: 'Code Review & Consulting',   desc: 'Architecture reviews, performance audits, and mentoring for Python teams.' },
]

export const BLOG_POSTS: BlogPost[] = [
  { title: 'Why I switched from Celery to asyncio queues for I/O-bound tasks', date: 'Feb 2025', url: '#', readTime: '8 min' },
  { title: 'Structuring a FastAPI project that actually scales',                 date: 'Nov 2024', url: '#', readTime: '12 min' },
  { title: 'PostgreSQL BRIN indexes for time-series data: a practical guide',    date: 'Aug 2024', url: '#', readTime: '10 min' },
]

export const TESTIMONIALS: Testimonial[] = [
  { name: 'Sara Okonkwo',  role: 'CTO at DataStream Labs',         text: 'Alex redesigned our entire ingestion layer in under a sprint. The performance gains were immediate and the code is a joy to maintain.' },
  { name: 'Luca Ferretti', role: 'Lead Engineer at Orbit Systems',  text: "One of the sharpest Python engineers I've worked with. Alex balances speed of delivery with long-term code quality." },
  { name: 'Priya Menon',   role: 'Product Manager at Nova Analytics',text: 'Alex delivered a fully-tested API on a tight deadline and proactively flagged edge cases we had not even considered.' },
]

export const CV_CERTIFICATIONS: Certification[] = [
  { name: 'AWS Certified Developer – Associate', issuer: 'Amazon Web Services', year: '2023' },
  { name: 'Professional Scrum Master I (PSM I)', issuer: 'Scrum.org',           year: '2021' },
  { name: 'PCEP — Certified Entry-Level Python', issuer: 'Python Institute',    year: '2018' },
]

export const CV_LANGUAGES: Language[] = [
  { lang: 'Spanish', level: 'Native' },
  { lang: 'English', level: 'Fluent (C2)' }
]

export const CV_EDUCATION: Education[] = [
  { degree: 'Electrical Engineering (TBF)', school: 'UNED', year: '2016 – 2026' }
]

export const CV_VOLUNTEERING: Volunteering[] = [
  { role: 'Mentor', org: 'PyLadies Madrid', desc: 'Weekly mentoring sessions for women entering Python development.', period: '2021 – Now' },
  { role: 'Coach',  org: 'Django Girls',    desc: 'Workshop organiser and programming coach for beginner developers.',  period: '2019 – 2021' },
]