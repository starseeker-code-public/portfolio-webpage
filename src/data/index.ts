import type {
  Project, ExperienceEntry, OpenSourceRepo, Service,
  BlogPost, Testimonial, Certification, Language,
  Education, Volunteering, Stat, SkillGroup, TeachingEntry,
} from '../types'

export const SITE = {
  initials:  'JOA.DEV',
  name:      'Joaquín Hernández Martínez',
  role:      ['Senior Backend Engineer', 'Fullstack Developer', 'Leader and Architect'],
  tagline:   'Building reliable back-end services, APIs, and cloud infrastructure — almost 8 years turning complex requirements into production-ready systems. Now with AI expertise',
  email:     'proyecto_noether@outlook.com',
  photo:     '/photo.png',
  location:  'Albacete, Spain',
  fullAddress: 'Albacete, Spain',
  locationUrl: 'https://maps.app.goo.gl/DLYp7yCkraK8mQS69',
  phone:     '+34 696 02 68 63',
  phoneUrl:  'tel:+34696026863',
  website:   'https://joaquin-hernandez.netlify.app/',
  social: {
    github:    'https://github.com/starseeker-code-public',
    linkedin:  'https://www.linkedin.com/in/joaquin-hernandez-martinez-91a57221a/',
    instagram: 'https://www.instagram.com/starseeker-code/',
    codewars:  'https://www.codewars.com/users/Starseeker1414',
  },
}

export const STATS: Stat[] = [
  { label: 'Years exp.',   value: '7+' },
  { label: 'Projects',     value: '20+' },
  { label: 'Codewars kyu', value: '3' },
]

export const BIO =
  'Senior Python engineer with 7+ years specializing in advanced backend development, distributed system design, and AI-integrated workflows. Recommended by both Allot and Mercedes-Benz for professionalism and consistent delivery. I lead and mentor engineering teams, maintain rigorous testing and code standards, and leverage AI daily to ship production-ready software. Bilingual (C2 english certified).'

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
  { label: 'Frontend',             items: ['React', 'TypeScript', 'JavaScript', 'Tailwind', 'Vite'] },
]

export const SKILLS = SKILL_GROUPS.flatMap(g => g.items)

export const TEACHING: TeachingEntry = {
  period:  '2024 – Present',
  role:    'Python Instructor',
  company: 'Tajamar',
  companyUrl: 'https://www.tajamar.es',
  desc:    'Delivering advanced Python programming training to professional developers and recommended by them for my soft skills and technical knowledge. Hands-on mentoring on code quality, architecture design, and best practices adoption. Focused on quality code, advanced Python and project-based learning.',
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    period:  'May 2025 – Present',
    role:    'Senior Python Backend Developer',
    company: 'Allot',
    companyUrl: 'https://www.allot.com',
    desc:    'Senior Python engineer in ASM (Allot Secure Management) team. Complex cybersecurity backend for ISP traffic and user security management.',
    details: 'Responsible for ASM microservices code as well as QA testing, achieving an excellent feedback during 2025 in my performance review. Building and maintaining a highly available security platform that processes ISP traffic at scale. Part of a team of 5 senior developers that evolve and maintain a big microservices system for cybersecurity software as a service. Both Kafka, Redis and MongoDB is used for different kind of data and messages. QA testing is done using Kubernetes and deploying/installing the software in OpenNebula VMs, using ArtiFactory releases and config files as well as Helm charts that define how Kubernetes deploys pods.',
    projectInfo: 'ASM (Allot Secure Management) is a cybersecurity SaaS platform sold to ISPs worldwide. It provides per-subscriber traffic analysis, threat detection, and parental-control enforcement at network level, processing millions of events per second across a distributed microservices architecture.',
    tags:    ['Flask', 'MongoDB', 'Kafka', 'Kubernetes', 'Python', 'Redis', 'OpenAPI', 'RedPanda', 'Connexion', 'Go', 'OpenLens', 'Grafana', 'Prometheus', 'Claude Code', 'Copilot'],
  },
  {
    period:  'May 2024 – Apr 2025',
    role:    'Senior Python Developer',
    company: 'Mercedes-Benz (Infoser NT)',
    companyUrl: 'https://www.mercedes-benz.com',
    desc:    'Evolved a large-scale FastAPI microservices system for Azure provisioning. Main testing engineer with 90%+ automated coverage.',
    details: 'Achieved 8/9 excellent feedback sessions. Developed two new components in under 5 months. Reduced weekly ticket volume from 12 to 3-4 by automating E2E testing with Behave and pipeline triggers. Cut computing costs 8-10% by implementing RabbitMQ. Implemented granular component deployment using toggles and tag automation in Azure. Recommended as a professional due to results and professionalism. Leader of a senior team of 12 developers responsible of Pulumi services development and a critical architectural change of this microservices system.',
    projectInfo: 'Large-scale Azure cloud-provisioning platform used by Mercedes-Benz AI and Data teams worldwide. The system automates the lifecycle of hundreds of Azure resources (ADX clusters, storage accounts, networking) via Pulumi IaC services, enabling data scientists to self-serve cloud infrastructure through a FastAPI-backed API layer.',
    tags:    ['FastAPI', 'Azure', 'Pulumi', 'SQLAlchemy', 'Alembic', 'Python', 'BDD/TDD', 'Docker', 'Pytest', 'Behave', 'Redis', 'RabbitMQ', 'Celery', 'CI/CD'],
  },
  {
    period:  'Nov 2022 – Apr 2024',
    role:    'Senior & Lead Python Developer',
    company: 'Frenetic',
    companyUrl: '',
    desc:    'Led the refactor of a complex calculation monolith with an AI module, growing the team from 4 to 9 engineers.',
    details: 'Refactored over 2 million lines of Python technical debt leading a team of senior engineers. Drove the main refactor effort across the full engineering team. Specialized in concurrent code debugging, advanced Python features, and package/framework development.',
    projectInfo: 'Frenetic is a SaaS platform for power magnetics design used by hardware engineers. Its core is a complex calculation engine that models electromagnetic components with an embedded AI module for design optimization. The codebase had accumulated 2M+ lines of legacy Python, which the team systematically refactored into a clean, modular architecture.',
    tags:    ['Leadership', 'AsyncIO and concurrency', 'Advanced Python', 'Flask', 'Pytest', 'Redis', 'Docker', 'Jenkins', 'PostgreSQL', 'Poetry', 'Copilot'],
  },
  {
    period:  'Jun 2021 – Nov 2022',
    role:    'Senior Python Developer & DevOps',
    company: 'BNP Paribas',
    companyUrl: 'https://group.bnpparibas',
    desc:    'Built and maintained FastAPI microservices and created Vanish, a DevOps Python framework for the BNP Paribas system.',
    details: 'Improved 3 existing services, developed 1 new service, and provided ongoing maintenance for several others. Ansible configuration and security support. Production run-readiness and monitoring setup.',
    projectInfo: 'Internal banking microservices platform supporting BNP Paribas back-office operations. Also developed Vanish, an internal Python DevOps framework that standardized service scaffolding, configuration management, and deployment pipelines across the engineering organisation.',
    tags:    ['Kubernetes', 'Ansible', 'Terraform', 'Python', 'FastAPI', 'Pytest', 'Redis', 'Docker', 'Apigee', 'PostgreSQL', 'Airflow', 'Go'],
  },
  {
    period:  'Aug 2018 – Jul 2022',
    role:    'Python Developer',
    company: 'BBVA · Prosegur (Cipher) · ATM Maggioli',
    companyUrl: '',
    desc:    'Worked across several companies — some as freelance — in finance, cybersecurity, and public administration.',
    details: 'Built REST APIs, data pipelines, and backend services. Gained broad experience with PostgreSQL, Docker, CI/CD, and cloud platforms (AWS, Azure).',
    projectInfo: 'Projects spanned finance (BBVA internal risk-data pipelines), cybersecurity (Prosegur/Cipher threat-intelligence backend), and public administration (ATM Maggioli document-management REST services). Each engagement involved full-cycle backend development from requirements through production deployment.',
    tags:    ['PostgreSQL', 'REST APIs', 'Python', 'Docker', 'AWS', 'Data Engineering', 'CI/CD'],
  },
]

export const PROJECTS: Project[] = [
  {
    title:  'Joy - AI Journal',
    desc:   'Full-stack journaling application with AI-powered insights. Built with Flask backend, PostgreSQL database, and React frontend. Features SSO authentication, RESTful APIs, and containerized deployment. AI models yet to be determined but probably Gemini or Grok, and full AI workflow and architecture along with backend services.',
    image:  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80',
    github: 'https://github.com/starseeker-code-public/joy-ai-rest-journaling-system',
    projectUrl: '',
    tags:   ['Docker', 'Python', 'Flask', 'PostgreSQL', 'React', 'Google Oauth'],
    isInDevelopment: true,
  },
  {
    title:  'Five a Day eVolution - Academy Management Software',
    desc:   'Full-stack academy software for payments, students and batteries included automation (emails, tasks, etc...). Built with Django, PostgreSQL database and Redis with Celery. Features Google Oauth authentication, several embedded apps (email automation, todo list and sync, excel processing and import/export, google automation, accountability and management), and containerized deployment as well as production deployment in Google Cloud Platform.',
    image:  'https://images.pexels.com/photos/10638075/pexels-photo-10638075.jpeg?auto=compress&cs=tinysrgb&w=1200',
    github: '',
    projectUrl: 'https://fiveaday-web.onrender.com',
    tags:   ['Docker', 'Python', 'Django', 'PostgreSQL', 'Google Oauth', "Redis", 'Celery', 'Django Rest Framework', 'Google Cloud Platform (GCP)', 'Admin', 'CI/CD', 'Pytest'],
    isInDevelopment: false,
  }
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
  { name: 'María Jesús Martínez Leo', role: 'Senior HR specialist',
    text: 'I recommend Joaquín Hernández Martínez as a capable engineer. He demonstrated leadership overcoming the challenges in our team, and proved to be a worthy member and team player of the Systems team. To be noted were his contributions to software design, his attention to PR reviews and quality code, and his deep knowledge of Python backend frameworks like Django and Flask. He is a valuable team member due to his experience and knowledge.',
    email: 'mariajesus.martinez@atm-maggioli.es', phone: '+34 628 077 018' },
  { name: 'Cesar Boria', role: 'Senior Python Engineer at Mercedes Benz',
    text: 'Joaquín is a very good team mate. I worked with him developing Pulumi services in a microservices architecture to provision Azure services for AI and Data teams worldwide. His knowledge of design patterns and distributed backend systems was particularly useful. He lead a BDD E2E testing project too and was responsible for ADX Azure component development from scratch. Excellent PR reviews.',
    email: 'cesar.boria@mercedes-benz.com', phone: '+34 620 35 05 37' },
  { name: 'Silvia Yubitza', role: 'Five a Day Owner',
    text: 'Joaquín Hernández Martínez demonstrated strong leadership and engineering skill by independently planning, developing, and delivering a production-ready web application for managing students, payments, and administrative workflows, showing the ability to turn complex requirements into practical and reliable software solutions.',
    email: 'hellofiveaday@gmail.com', phone: '+34 967 04 90 96' },
]

export const CV_CERTIFICATIONS: Certification[] = [
  { name: 'Pearson Python Certification', issuer: 'Pearson', year: '' },
  { name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', year: '' },
  { name: 'AWS Cloud Complete Bootcamp Course', issuer: 'Udemy', year: '' },
  { name: 'AWS Serverless Microservices with Patterns and Best Practices', issuer: 'Udemy', year: '' },
  { name: 'Architecting Python Microservices with AWS and EC2', issuer: 'Udemy', year: '' },
  { name: 'Azure Fundamentals Course', issuer: 'Microsoft', year: '' },
  { name: 'Docker Mastery with Kubernetes & Swarm from a Docker Captain', issuer: 'Udemy', year: '' },
  { name: 'Go Programming – Golang Course with Bonus Projects', issuer: 'Udemy', year: '' },
  { name: 'Curso Completo del Lenguaje Rust', issuer: 'Udemy', year: '' },
  { name: 'Apache Kafka Crash Course', issuer: 'Udemy', year: '' },
  { name: 'Django Ultimate Web Security', issuer: 'Udemy', year: '' },
  { name: 'FastAPI – The Complete Course', issuer: 'Udemy', year: '' },
  { name: 'Python API Development – The Full Course', issuer: 'freeCodeCamp', year: '' },
  { name: 'Python Django – The Practical Guide', issuer: 'Udemy', year: '' },
  { name: 'React – The Complete Guide', issuer: 'Udemy', year: '' },
  { name: 'SQL Server – Programación Avanzada', issuer: 'Udemy', year: '' },
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
