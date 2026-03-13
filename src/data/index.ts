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
  photo:     '/photo.png',
  location:  'Albacete, Spain',
  phone:     '+34 696 02 68 63',
  website:   'joaquin.com',
  social: {
    github:    'https://github.com/starseeker-code-public',
    linkedin:  '#',
    instagram: '#',
    codewars:  'https://www.codewars.com/users/Starseeker1414',
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
    title:  'Joy - AI Journal',
    desc:   '',
    image:  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
    github: 'https://github.com',
    tags:   ['Python', 'PostgreSQL', 'FastAPI'],
  },
  {
    title:  'Five a Day eVolution',
    desc:   '',
    image:  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80',
    github: 'https://github.com',
    tags:   ['Celery', 'Redis', 'Pandas'],
  }
]

export const OPEN_SOURCE: OpenSourceRepo[] = [
  {
    name:   'fastapi-pagination-cursor',
    desc:   'Cursor-based pagination extension for FastAPI with SQLAlchemy support.',
    stars:  95,
    github: 'https://github.com',
    tags:   ['FastAPI', 'SQLAlchemy'],
  }
]

export const SERVICES: Service[] = [
  { icon: '⚙️', title: 'Backend Development',
    desc: 'Senior engineer for backend projects. Polyglot of languages like Python, Go, Rust, etc...' },
  { icon: '🔁', title: 'Infrastructure Automation',
    desc: 'Robust infrastructure as code with Terraform or Pulumi, and Software Ops automation (specialized in AI).' },
  { icon: '🐳', title: 'DevOps & Cloud',
    desc: 'Dockerized deployments, CI/CD pipelines with Jenkins or Github Actions, and AWS, Azure or GCP administration and development.' },
  { icon: '💻', title: 'AI for Engineering & AI Integrations',
    desc: 'Specialized in AI workflows and tooling for development. Experience integrating AI with abckends and software as a service.' },
]

export const BLOG_POSTS: BlogPost[] = [
  { title: 'Why I switched from Celery to asyncio queues for I/O-bound tasks',
    date: 'Feb 2025', url: '#', readTime: '8 min' }
]

export const TESTIMONIALS: Testimonial[] = [
  { name: 'Sven Rieke', role: 'Software Manager at Allot',
    text: '...WIP...' },
  { name: 'Cesar Boria', role: 'Senior Python Engineer at Mercedes Benz',
    text: '...WIP...' },
  { name: 'Silvia Yubitza', role: 'Five a Day Owner',
    text: '...WIP...' }
]

export const CV_CERTIFICATIONS: Certification[] = [
  { name: 'AWS Certified Developer – Associate', issuer: 'Amazon Web Services', year: '2023' }
]

export const CV_LANGUAGES: Language[] = [
  { lang: 'Spanish', level: 'Native' },
  { lang: 'English', level: 'Fluent (C2)' }
]

export const CV_EDUCATION: Education[] = [
  { degree: 'Electrical Engineering (TBF)', school: 'UNED', year: '2016 – 2026' }
]

export const CV_VOLUNTEERING: Volunteering[] = [
  { role: 'Mentor', org: 'PyLadies Madrid', period: '2021 – Now',
    desc: 'Weekly mentoring sessions for women entering Python development.'}
]