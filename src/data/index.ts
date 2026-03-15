import type {
  Project, ExperienceEntry, OpenSourceRepo, Service,
  BlogPost, Testimonial, Certification, Language,
  Education, Volunteering, Stat, SkillGroup, TeachingEntry,
} from '../types'

export const SITE = {
  initials:  'JOA.DEV',
  name:      'Joaquín Hernández Martínez',
  role:      'Senior Python Engineer | Fullstack Developer',
  tagline:   'Building reliable back-end services, APIs, and cloud infrastructure — with 7+ years turning complex requirements into production-ready systems.',
  email:     'proyecto_noether@outlook.com',
  photo:     '/photo.png',
  location:  'Albacete, Spain (open to Madrid on-site weekly)',
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
  "Senior Python engineer with 7+ years of back-end experience building production-grade services, REST APIs, and microservices architectures. Proven track record at Mercedes-Benz, BNP Paribas, and high-growth startups — delivering end-to-end solutions with PostgreSQL, Docker/Kubernetes, and robust CI/CD pipelines. Passionate about clean architecture, automated testing (90%+ coverage with BDD/TDD), and mentoring engineering teams. Fluent in English (C2) and Spanish. I use AI daily to accelerate development and improve code quality."

export const SPECIALIZATIONS = [
  'Advanced Python',
  'Distributed Backend Design',
  'AI Integration in Development & Backends',
  'Team Leadership & Mentoring',
]

export const SKILL_GROUPS: SkillGroup[] = [
  { label: 'Backend',              items: ['Python', 'OOP', 'FastAPI', 'Flask', 'Django', 'Sanic', 'Celery', 'AsyncIO', 'Concurrency', 'Metaprogramming', 'Decorators', 'Generators', 'Package Development', 'Go', 'Rust'] },
  { label: 'Databases & Brokers',  items: ['PostgreSQL', 'PostGIS', 'Redis', 'MongoDB', 'MySQL', 'Oracle', 'Elasticsearch', 'Cassandra', 'InfluxDB', 'Kafka', 'RabbitMQ', 'SQLAlchemy', 'SQLModel', 'Django ORM'] },
  { label: 'Cloud & DevOps',       items: ['Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Terraform', 'Pulumi', 'Ansible', 'Jenkins', 'GitHub Actions', 'Airflow'] },
  { label: 'Testing & Monitoring', items: ['Pytest', 'Behave (BDD)', 'TDD', 'E2E', 'CI/CD', 'Grafana', 'Prometheus', 'Datadog'] },
  { label: 'Architecture & APIs',  items: ['REST', 'GraphQL', 'gRPC', 'OpenAPI', 'SSO', 'Apigee', 'API Security', 'Microservices', 'Hexagonal', 'Clean Arch', 'Event-Driven', 'DDD', 'SOLID'] },
  { label: 'Frontend',             items: ['React', 'TypeScript', 'JavaScript', 'Tailwind'] },
]

export const SKILLS = SKILL_GROUPS.flatMap(g => g.items)

export const TEACHING: TeachingEntry = {
  period:  '2023 – Present',
  role:    'Python Instructor',
  company: 'Tajamar',
  desc:    'Delivering advanced Python programming training to professional developers. Hands-on mentoring on code quality, architecture design, and best practices adoption.',
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    period:  'May 2025 – Present',
    role:    'Senior Python Backend Developer',
    company: 'Allot',
    desc:    'Senior Python engineer in ASM (Allot Secure Management) team. Complex cybersecurity backend for ISP traffic and user security management.',
    details: 'Responsible for ASM microservices code as well as QA testing. Building and maintaining a highly available security platform that processes ISP traffic at scale.',
    tags:    ['Flask', 'MongoDB', 'Kubernetes', 'Python', 'Redis', 'OpenAPI', 'Go'],
  },
  {
    period:  'May 2024 – Apr 2025',
    role:    'Senior Python Developer',
    company: 'Mercedes-Benz (Infoser New Technologies)',
    desc:    'Evolved a large-scale FastAPI microservices system for Azure provisioning. Main testing engineer with 90%+ automated coverage.',
    details: 'Achieved 8/9 excellent feedback sessions. Developed two new components in under 5 months. Reduced weekly ticket volume from 12 to 3-4 by automating E2E testing with Behave and pipeline triggers. Cut computing costs 8-10% by implementing RabbitMQ. Implemented granular component deployment using toggles and tag automation in Azure. Recommended as a professional due to results and professionalism.',
    tags:    ['FastAPI', 'Azure', 'BDD/TDD', 'Python', 'Pulumi', 'Docker', 'Pytest', 'Behave', 'Redis', 'RabbitMQ', 'Celery', 'CI/CD'],
  },
  {
    period:  'Nov 2022 – Apr 2024',
    role:    'Senior Python Developer & Lead Developer',
    company: 'Frenetic',
    desc:    'Led the refactor of a complex calculation monolith with an AI module, growing the team from 4 to 9 engineers.',
    details: 'Refactored over 2 million lines of Python technical debt. Drove the main refactor effort across the full engineering team. Specialized in concurrent code debugging, advanced Python features, and package/framework development.',
    tags:    ['Leadership', 'AsyncIO', 'Kafka', 'Python', 'Flask', 'Pytest', 'Redis', 'Docker', 'Jenkins', 'PostgreSQL', 'Poetry'],
  },
  {
    period:  'Jun 2021 – Nov 2022',
    role:    'Senior Python Developer & DevOps',
    company: 'BNP Paribas',
    desc:    'Built and maintained FastAPI microservices and created Vanish, a DevOps Python framework for the BNP Paribas system.',
    details: 'Improved 3 existing services, developed 1 new service, and provided ongoing maintenance for several others. Ansible configuration and security support. Production run-readiness and monitoring setup.',
    tags:    ['Kubernetes', 'Ansible', 'Terraform', 'Python', 'FastAPI', 'Pytest', 'Redis', 'Docker', 'Apigee', 'PostgreSQL', 'Airflow', 'Go'],
  },
  {
    period:  'Aug 2018 – Jul 2022',
    role:    'Python Developer & Data Engineer',
    company: 'BBVA · Prosegur (Cipher) · ATM Maggioli',
    desc:    'Worked across several companies — some as freelance — in finance, cybersecurity, and public administration.',
    details: 'Built REST APIs, data pipelines, and backend services. Gained broad experience with PostgreSQL, Docker, CI/CD, and cloud platforms (AWS, Azure).',
    tags:    ['PostgreSQL', 'REST APIs', 'AWS', 'Python', 'Docker', 'Data Engineering', 'CI/CD'],
  },
]

export const PROJECTS: Project[] = [
  {
    title:  'Joy - AI Journal',
    desc:   'Full-stack journaling application with AI-powered insights. Built with FastAPI backend, PostgreSQL database, and React frontend. Features SSO authentication, RESTful APIs, and containerized deployment.',
    image:  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
    github: 'https://github.com',
    tags:   ['Python', 'FastAPI', 'PostgreSQL', 'React', 'Docker', 'SSO'],
  },
  {
    title:  'Five a Day eVolution',
    desc:   'Event-driven data processing platform with asynchronous task queues, scheduled jobs, and real-time monitoring dashboards. Deployed on Kubernetes with CI/CD pipelines.',
    image:  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80',
    github: 'https://github.com',
    tags:   ['Celery', 'Redis', 'Pandas', 'Docker', 'Kubernetes', 'Grafana'],
  },
]

// ── Open Source (commented out per request) ──
// export const OPEN_SOURCE: OpenSourceRepo[] = [
//   {
//     name:   'fastapi-pagination-cursor',
//     desc:   'Cursor-based pagination extension for FastAPI with SQLAlchemy support.',
//     stars:  95,
//     github: 'https://github.com',
//     tags:   ['FastAPI', 'SQLAlchemy'],
//   }
// ]
export const OPEN_SOURCE: OpenSourceRepo[] = []

export const SERVICES: Service[] = [
  { icon: '⚙️', title: 'Production Backend & APIs',
    desc: 'End-to-end Python back-end services with PostgreSQL — from design to containerized deployment on Docker/Kubernetes — including tests, docs, alerting, and redundancy.' },
  { icon: '🔄', title: 'Legacy Migration & Modernization',
    desc: 'Breaking monoliths into microservices and tackling large-scale technical debt. Led a 2 M+ line refactor at Frenetic, growing the team from 4 to 9 engineers.' },
  { icon: '🧪', title: 'Testing, CI/CD & Observability',
    desc: 'Automated BDD/TDD pipelines with 90 %+ coverage, E2E test automation that cut weekly tickets from 12 to 3, and production monitoring with Grafana, Prometheus, and Datadog.' },
  { icon: '☁️', title: 'Cloud Platforms & Infrastructure',
    desc: 'Infrastructure as code with Pulumi and Terraform across AWS, Azure, and GCP. Ansible configuration, cost optimization, and granular deployment automation.' },
  { icon: '🔐', title: 'API Security & SSO Integration',
    desc: 'Secure API design with Apigee and OpenAPI. SSO implementation, cybersecurity backend experience at Allot, and production run-readiness across enterprise systems.' },
  { icon: '⚛️', title: 'React UIs & Fullstack Delivery',
    desc: 'Adjusting or building React frontends when needed, integrating with Python backends. TypeScript, Tailwind, and end-to-end ownership from UI to database.' },
  { icon: '🚀', title: 'Leadership & AI-Driven Delivery',
    desc: 'Mentoring developers, leading code reviews, and using AI/Copilot daily. Currently training professional engineers as a Python Instructor.' },
  { icon: '📦', title: 'Data Pipelines & Message Brokers',
    desc: 'Event-driven architectures with Kafka, RabbitMQ, and Celery. Data engineering with Airflow, Pandas, and async processing for high-throughput systems.' },
]

// ── Blog (commented out per request) ──
// export const BLOG_POSTS: BlogPost[] = [
//   { title: 'Why I switched from Celery to asyncio queues for I/O-bound tasks',
//     date: 'Feb 2025', url: '#', readTime: '8 min' }
// ]
export const BLOG_POSTS: BlogPost[] = []

export const TESTIMONIALS: Testimonial[] = [
  { name: 'Sven Rieke', role: 'Software Manager at Allot',
    text: '...WIP...' },
  { name: 'Cesar Boria', role: 'Senior Python Engineer at Mercedes Benz',
    text: '...WIP...' },
  { name: 'Silvia Yubitza', role: 'Five a Day Owner',
    text: '...WIP...' }
]

export const CV_CERTIFICATIONS: Certification[] = [
  { name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', year: '2023' },
  { name: 'Azure Developer Course', issuer: 'Freecodecamp', year: '2024' },
  { name: 'Azure Fundamentals Course', issuer: 'Freecodecamp', year: '2024' },
  { name: 'AWS Cloud Complete Bootcamp', issuer: 'AWS', year: '2023' },
  { name: 'Docker Mastery with Kubernetes & Swarm', issuer: 'Docker Captain', year: '2022' },
  { name: 'React – The Complete Guide', issuer: 'Udemy', year: '2023' },
  { name: 'FastAPI – The Complete Course', issuer: 'Udemy', year: '2022' },
  { name: 'Go Programming with Bonus Projects', issuer: 'Golang Course', year: '2024' },
]

export const CV_LANGUAGES: Language[] = [
  { lang: 'Spanish', level: 'Native' },
  { lang: 'English', level: 'Fluent (C2 certified)' },
  { lang: 'German',  level: 'Learning' },
]

export const CV_EDUCATION: Education[] = [
  { degree: 'Degree in Electrical Engineering', school: 'UNED', year: '2016 – Present' },
]

export const CV_VOLUNTEERING: Volunteering[] = [
  { role: 'Mentor', org: 'PyLadies Madrid', period: '2021 – Now',
    desc: 'Weekly mentoring sessions for women entering Python development.' }
]
