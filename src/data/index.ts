import type {
  Project, ExperienceEntry, OpenSourceRepo, Service,
  Testimonial, Certification, Language,
  Education, Stat, SkillGroup, TeachingEntry,
} from '../types'

export { useRandomQuote, getRandomQuote } from './quotes'
export type { Quote } from './quotes'

const _careerStart = new Date(2018, 5, 1)
export const YEARS_EXP = Math.floor((Date.now() - _careerStart.getTime()) / (365.25 * 24 * 60 * 60 * 1000))

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

export const STATS: Stat[] = [
  { label: 'Years exp.',   value: `${YEARS_EXP}+` },
  { label: 'Projects',     value: '20+' },
  { label: 'Codewars kyu', value: '3' },
]

export const BIO =
  `Senior Python engineer with ${YEARS_EXP}+ years specializing in advanced backend development, distributed system design, and AI-integrated workflows. Recommended by both Allot and Mercedes-Benz for professionalism and consistent delivery. I lead and mentor engineering teams, maintain rigorous testing and code standards, and leverage AI daily to ship production-ready software. Bilingual (C2 english certified).`

export const SPECIALIZATIONS = [
  'Advanced Python & Engineering',
  'Distributed Backend Design',
  'AI Integration in Development Workflows & Distributed Backends',
  'Team Leadership & Mentoring',
]

export const SKILL_GROUPS: SkillGroup[] = [
  { label: 'Backend',              items: ['Python', 'OOP', 'FastAPI', 'Flask', 'Django', 'Sanic', 'Celery', 'AsyncIO', 'Concurrency', 'Metaprogramming', 'Decorators', 'Generators', 'Package Development', 'Distributed Architecture', 'Go', 'Rust'] },
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
    details: 'Achieved 8/9 excellent feedback sessions. Developed two new components in under 5 months. Reduced weekly ticket volume from 12 to 3-4 by automating E2E testing with Behave and pipeline triggers. Cut computing costs 8-10% by implementing RabbitMQ. Implemented granular component deployment using toggles and tag automation in Azure. Recommended as a professional due to results and professionalism.',
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
    period:  'Total of 3 years',
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
    title:  'Five a Day Evolution - Academy Management Software',
    slug:   'five-a-day',  // connects with the image
    desc:   'Full-stack academy software for payments, students and batteries included automation (emails, tasks, etc...). Built with Django, PostgreSQL database and Redis with Celery. Features Google Oauth authentication, several embedded apps (email automation, todo list and sync, excel processing and import/export, google automation, accountability and management), and containerized deployment as well as production deployment in Google Cloud Platform.',
    github: 'https://github.com/starseeker-code-public/five-a-day#five-a-day-evolution',
    projectUrl: 'https://fiveaday-332600671945.europe-southwest1.run.app',
    tags:   ['Docker', 'Python', 'Django', 'PostgreSQL', 'Google Oauth', 'Redis', 'Celery', 'Django Rest Framework', 'Google Cloud Platform (GCP)', 'Admin', 'CI/CD', 'Pytest'],
    isInDevelopment: false,
    isFeatured: true,
  },
  {
    title:  'Joy - AI Journal',
    slug:   'joy-ai-rest-journaling-system',
    desc:   'Distributed AI-powered journaling platform: microservices, event-driven architecture, NLP pipelines and a polyglot backend over MongoDB, deployed Kubernetes-natively. Flask services, a React frontend, SSO authentication and containerized delivery.',
    image:  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80',
    github: 'https://github.com/starseeker-code-public/joy-ai-rest-journaling-system',
    projectUrl: '',
    tags:   ['Python', 'Flask', 'MongoDB', 'Microservices', 'NLP', 'Kubernetes', 'Docker', 'React', 'Google Oauth'],
    isInDevelopment: false,
    isFeatured: true,
  },
  {
    title:  'Cartograph - Geospatial Delivery API',
    slug:   'cartograph',
    desc:   'Geospatial intelligence API for last-mile delivery: route planning, ETAs, geo-fence alerting and coverage analytics for small couriers priced out of enterprise tooling. PostGIS + pgRouting behind FastAPI, MapLibre + React frontend, self-hostable down to a Raspberry Pi behind Tailscale.',
    github: 'https://github.com/starseeker-code-public/cartograph',
    projectUrl: '',
    tags:   ['Python', 'FastAPI', 'PostGIS', 'pgRouting', 'PostgreSQL', 'MapLibre', 'React', 'Docker'],
    isInDevelopment: true,
    isFeatured: true,
  },
  {
    title:  'Greenhouse - IoT Plant Care Station',
    slug:   'greenhouse',
    desc:   'An ESP32-C3 station reading soil moisture, temperature, humidity and light, showing them on an SSD1306 OLED and publishing to MQTT for Mosquitto / Home Assistant. Battery-powered with deep sleep, plus a host-side simulator so the firmware runs without hardware.',
    github: '',
    projectUrl: '',
    tags:   ['Rust', 'ESP32', 'PlatformIO', 'MQTT', 'IoT', 'Home Assistant'],
    isInDevelopment: true,
    isFeatured: true,
  },
  {
    title:  'Atelier - Artisan Marketplace SaaS',
    slug:   'atelier',
    desc:   'Multi-tenant SaaS for independent artisans to sell their work: per-tenant subdomains and branded storefronts, Stripe Connect marketplace payments, inventory built for one-of-a-kind and made-to-order goods, and LLM-generated marketing copy. A deliberate exercise in idempotency, audit logs, signed webhooks, refunds and multi-tenant Row Level Security.',
    github: 'https://github.com/starseeker-code-public/atelier',
    projectUrl: '',
    tags:   ['Python', 'FastAPI', 'PostgreSQL', 'Multi-tenancy', 'Row Level Security', 'Stripe Connect', 'Webhooks', 'Docker'],
    isInDevelopment: false,
    isFeatured: true,
  },
  {
    title:  'Atelier Vision - Text-to-Image Service',
    slug:   'atelier-vision',
    desc:   'GPU-backed text-to-image companion to Atelier: concept images, mood boards, style variations and lifestyle shots, optionally conditioned on a reference image via ControlNet. FastAPI control plane, arq/Redis job queue, diffusers worker, presigned S3 delivery, SSE progress and per-tenant cost caps.',
    github: 'https://github.com/starseeker-code-public/atelier-vision',
    projectUrl: '',
    tags:   ['Python', 'FastAPI', 'Redis', 'arq', 'Diffusers', 'GPU', 'S3', 'SSE'],
    isInDevelopment: true,
    isFeatured: true,
  },
  {
    title:  'Archive - RAG Document Intelligence',
    slug:   'archive',
    desc:   'Talk to your documents. PDFs and Markdown are extracted, chunked, embedded and indexed, then answered with inline citations back to the source passage. Dense retrieval over pgvector (HNSW, cosine), optional hybrid fusion with Elasticsearch BM25 via Reciprocal Rank Fusion, and token-by-token generation over SSE with pluggable LLM and embedding providers.',
    github: 'https://github.com/starseeker-code-public/archive',
    projectUrl: '',
    tags:   ['Python', 'FastAPI', 'RAG', 'pgvector', 'PostgreSQL', 'Elasticsearch', 'LLM', 'SSE'],
    isInDevelopment: false,
    isFeatured: false,
  },
  {
    title:  'Scribe - Research Agent',
    slug:   'scribe',
    desc:   'A personal tool-using research agent: searches the web, fetches and extracts sources, keeps durable notes in Postgres and produces a cited, structured answer under hard cost, time and call budgets. LangGraph plan/act/synthesize state machine with checkpointing, pause/resume and an SSRF-guarded fetch tool.',
    github: 'https://github.com/starseeker-code-public/scribe',
    projectUrl: '',
    tags:   ['Python', 'LangGraph', 'AI Agents', 'PostgreSQL', 'Tool Use', 'Observability'],
    isInDevelopment: false,
    isFeatured: false,
  },
  {
    title:  'Sentinel - AI Code Review Bot',
    slug:   'sentinel',
    desc:   'Self-hosted GitHub App that reviews pull requests when invited and answers questions in PR threads when mentioned. FastAPI webhook plane with HMAC signature verification and delivery-ID de-duplication, arq/Redis queueing and installation-token auth.',
    github: '',
    projectUrl: '',
    tags:   ['Python', 'FastAPI', 'GitHub Apps', 'Redis', 'arq', 'LLM', 'Docker'],
    isInDevelopment: true,
    isFeatured: false,
  },
  {
    title:  'Stream - Real-Time AI Chat UX',
    slug:   'stream',
    desc:   'A reusable pattern for token-by-token LLM streaming rather than another chat app: an SSE backend wrapper, an abortable frontend reader and incremental Markdown rendering, designed to drop into any LLM product.',
    github: 'https://github.com/starseeker-code-public/stream',
    projectUrl: '',
    tags:   ['SSE', 'Streaming', 'LLM', 'TypeScript', 'React', 'Python'],
    isInDevelopment: false,
    isFeatured: false,
  },
  {
    title:  'Forge - Domain LLM Fine-Tuning',
    slug:   'forge',
    desc:   'Fine-tune and serve a domain LLM that beats a prompted frontier model on one narrow task: bilingual support-ticket classification across an 8-class taxonomy. LoRA fine-tune of a 7B-class model, evaluated against a prompted-frontier baseline on a stratified held-out slice, served via vLLM behind an OpenAI-compatible FastAPI wrapper.',
    github: '',
    projectUrl: '',
    tags:   ['Python', 'LoRA', 'Fine-Tuning', 'vLLM', 'FastAPI', 'Evals', 'Modal'],
    isInDevelopment: true,
    isFeatured: false,
  },
  {
    title:  'Orbit - Federated Music Graph API',
    slug:   'orbit',
    desc:   'Relationship-and-location intelligence API for independent venues, artists, labels and tour routes. GraphQL Federation v2 via Apollo Router composes three polyglot subgraphs - Python/Strawberry, Go/gqlgen and Rust - over a shared Neo4j graph, with a React + Leaflet frontend.',
    github: 'https://github.com/starseeker-code-public/orbit',
    projectUrl: '',
    tags:   ['GraphQL Federation', 'Apollo Router', 'Neo4j', 'Rust', 'Go', 'Python', 'React'],
    isInDevelopment: false,
    isFeatured: false,
  },
  {
    title:  'Telemetron - Analytics Ingestion Pipeline',
    slug:   'telemetron',
    desc:   'Real-time analytics ingestion for IoT devices and clickstream events, where the pipeline is the product. Rust gRPC ingestion into Redpanda, a Go consumer writing canonical events to Cassandra, and a ClickHouse + Airflow + dbt rollup layer behind an aggregate query API and React dashboard.',
    github: 'https://github.com/starseeker-code-public/telemetron',
    projectUrl: '',
    tags:   ['Rust', 'Go', 'gRPC', 'Redpanda', 'Cassandra', 'ClickHouse', 'Airflow', 'dbt'],
    isInDevelopment: false,
    isFeatured: false,
  },
  {
    title:  'Pulse - Live Event Engagement',
    slug:   'pulse',
    desc:   'Polls, Q&A and upvotes for live events with a big-screen presenter view. Also a study in distributed WebSockets: long-lived stateful connections, a REST + WS dual interface, Redis pub/sub fan-out across instances, sticky sessions, live state in Redis with periodic durable flush and drain-on-shutdown.',
    github: 'https://github.com/starseeker-code-public/pulse',
    projectUrl: '',
    tags:   ['Go', 'WebSockets', 'Redis', 'MongoDB', 'Prometheus', 'React', 'TypeScript'],
    isInDevelopment: false,
    isFeatured: false,
  },
  {
    title:  'Beacon - Global Uptime Monitoring',
    slug:   'beacon',
    desc:   'Distributed HTTP probing from multiple Azure regions with alerting over email, Slack, PagerDuty and a self-built SMS gateway. FastAPI control plane, Go prober binary, gRPC contracts between them, and Terraform + Helm + Jenkins infrastructure.',
    github: '',
    projectUrl: '',
    tags:   ['Python', 'FastAPI', 'Go', 'gRPC', 'Azure', 'Terraform', 'Helm', 'Jenkins'],
    isInDevelopment: true,
    isFeatured: false,
  },
  {
    title:  'Stadium - Real-Time Auction Marketplace',
    slug:   'stadium',
    desc:   'Time-bound collectible auctions with live-broadcast bids and payment captured when the hammer falls. Elixir / OTP / Phoenix LiveView, Ecto schemas with money in minor units, a bids table partitioned monthly, and transactional bid placement under a FOR UPDATE row lock.',
    github: '',
    projectUrl: '',
    tags:   ['Elixir', 'OTP', 'Phoenix LiveView', 'Ecto', 'PostgreSQL', 'Docker'],
    isInDevelopment: true,
    isFeatured: false,
  },
  {
    title:  'LedgerOps - Expense & Approval Workflow',
    slug:   'ledgerops',
    desc:   'Internal expense and approval workflow API for a mid-sized company: employees submit expenses with receipts, managers approve, finance triggers reimbursement and auditors review the full trail. ASP.NET Core 8 with EF Core over PostgreSQL, Razor Pages + HTMX UI, deployed to Azure App Service with Service Bus, Blob Storage and Key Vault.',
    github: '',
    projectUrl: '',
    tags:   ['C#', 'ASP.NET Core', 'EF Core', 'PostgreSQL', 'HTMX', 'Azure', 'CI/CD'],
    isInDevelopment: true,
    isFeatured: false,
  },
  {
    title:  'Slug - Link Shortener with Abuse Defense',
    slug:   'slug',
    desc:   'Link shortener built in Rust with axum and tokio, backed by Redis, focused on the parts that are actually hard: abuse defense, rate limiting and analytics rather than the redirect itself.',
    github: '',
    projectUrl: '',
    tags:   ['Rust', 'axum', 'tokio', 'Redis', 'Docker'],
    isInDevelopment: true,
    isFeatured: false,
  },
  {
    title:  'Lighthouse - Self-Hosted Observability Stack',
    slug:   'lighthouse',
    desc:   'Prometheus, Loki, Tempo and Pyroscope behind Grafana with the OpenTelemetry Collector as the universal ingest plane. V1 runs as a single-host Docker Compose stack with auto-provisioned data sources; V2 migrates to k3s.',
    github: '',
    projectUrl: '',
    tags:   ['Prometheus', 'Grafana', 'Loki', 'Tempo', 'OpenTelemetry', 'Docker Compose', 'k3s'],
    isInDevelopment: true,
    isFeatured: false,
  },
  {
    title:  'Hearth - Self-Hosted Personal Cloud',
    slug:   'hearth',
    desc:   'Infrastructure-as-code for a Raspberry Pi 5 homelab where the deliverable is a reproducible machine, not an app: reflash the card, run the playbooks, and the Pi returns to a known-good state. Ansible roles for hardening, networking, Caddy, Docker, Forgejo, observability and backups.',
    github: '',
    projectUrl: '',
    tags:   ['Ansible', 'IaC', 'Debian', 'Raspberry Pi', 'Docker', 'Caddy', 'Hardening'],
    isInDevelopment: true,
    isFeatured: true,
  },
  {
    title:  'Hearthside - Household Utility Server',
    slug:   'hearthside',
    desc:   'One Raspberry Pi 5 running the household: Jellyfin media server, AdGuard Home DNS-level ad blocking and a private VPN via Tailscale/WireGuard. A Compose tree per service, Ansible playbooks and a runbook per phase, through to Caddy, backups and hardening.',
    github: '',
    projectUrl: '',
    tags:   ['Ansible', 'Docker Compose', 'Jellyfin', 'AdGuard Home', 'Tailscale', 'Raspberry Pi'],
    isInDevelopment: true,
    isFeatured: true,
  },
  {
    title:  'Atrium - Always-On Kiosk Dashboard',
    slug:   'atrium',
    desc:   'A headless Raspberry Pi that boots straight into a fullscreen Wayland browser - cage plus Chromium in kiosk mode - pointed at a local dashboard service, with systemd auto-login, restart-always supervision and an idempotent installer.',
    github: '',
    projectUrl: '',
    tags:   ['Linux', 'systemd', 'Wayland', 'Raspberry Pi', 'Shell', 'Kiosk'],
    isInDevelopment: true,
    isFeatured: false,
  },
  {
    title:  'Anvil - Custom Linux Distribution',
    slug:   'anvil',
    desc:   'A minimal custom Linux distribution for the Raspberry Pi 4 built with Buildroot, plus Rust in kernel space via Rust-for-Linux and in userspace for init, HTTP and MQTT. Complete BR2_EXTERNAL tree with an AArch64 musl defconfig, mainline kernel and host-side overlay verification.',
    github: '',
    projectUrl: '',
    tags:   ['Rust', 'Buildroot', 'Linux Kernel', 'AArch64', 'Embedded', 'Raspberry Pi'],
    isInDevelopment: true,
    isFeatured: false,
  },
  {
    title:  'Foundry - Bare-Metal OS in Rust',
    slug:   'foundry',
    desc:   'A hand-rolled operating system in Rust booting bare-metal on a Raspberry Pi 4 - educational by design, the point being to learn what Linux does for you by doing it yourself. Cross-compiles to a kernel8.img the Pi firmware boots directly: parks the secondary cores, sets up a stack, zeroes .bss and drives the PL011 UART.',
    github: '',
    projectUrl: '',
    tags:   ['Rust', 'Bare Metal', 'OS Development', 'AArch64', 'QEMU', 'Raspberry Pi'],
    isInDevelopment: true,
    isFeatured: false,
  },
  {
    title:  'Resonate - Programmable USB MIDI Controller',
    slug:   'resonate',
    desc:   'A class-compliant USB MIDI controller on a Raspberry Pi Pico 2 (RP2350): eight MPR121 capacitive touch pads, two EC11 rotary encoders, an SSD1306 OLED and optional standalone audio. No drivers needed, plus a host-side test path that runs without hardware.',
    github: '',
    projectUrl: '',
    tags:   ['C++', 'RP2350', 'PlatformIO', 'USB MIDI', 'Embedded', 'Audio'],
    isInDevelopment: true,
    isFeatured: false,
  },
  {
    title:  'Emblem - On-Chain Proof of Attendance',
    slug:   'emblem',
    desc:   'Event organizers issue verifiable digital emblems, attendees claim them by QR code, and ownership is recorded on Solana as compressed NFTs via Metaplex Bubblegum. Anchor program in Rust with PDA-backed event accounts and host-side integration tests under solana-program-test.',
    github: '',
    projectUrl: '',
    tags:   ['Rust', 'Solana', 'Anchor', 'Web3', 'NFTs', 'TypeScript'],
    isInDevelopment: true,
    isFeatured: false,
  },
]

// ── Open Source (commented out for documentation) ──
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
  {
    icon: '🛡️', title: 'Cybersecurity & Network Security',
    desc: 'ISP-grade traffic analysis, per-subscriber threat detection, and parental-control enforcement at scale.',
    details: 'Built and maintained the ASM cybersecurity SaaS platform at Allot, processing millions of events per second across distributed microservices. Hands-on experience with real-time threat detection pipelines, network-level security enforcement, and subscriber management sold to ISPs worldwide.',
  },
  {
    icon: '☁️', title: 'Cloud Infrastructure Automation',
    desc: 'End-to-end cloud provisioning with IaC across Azure, AWS, and GCP — from resource lifecycle to cost optimization.',
    details: 'At Mercedes-Benz, evolved a large-scale Azure provisioning platform used by AI and Data teams globally. Automated the lifecycle of hundreds of Azure resources via Pulumi IaC services, implemented granular deployment toggles, and cut computing costs 8–10% through RabbitMQ-based orchestration and pipeline automation.',
  },
  {
    icon: '🏦', title: 'Banking & Financial Services',
    desc: 'Secure microservices, API gateway architecture, and compliance-ready backends for the financial sector.',
    details: 'Developed and maintained FastAPI microservices and the internal Vanish DevOps framework at BNP Paribas. Built REST APIs and data pipelines at BBVA for internal risk-data processing. Both engagements required strict security, API gateway management (Apigee), and production run-readiness with full monitoring.',
  },
  {
    icon: '🔄', title: 'System Modernization & Technical Debt',
    desc: 'Monolith decomposition, large-scale refactoring, and team scaling for legacy codebases.',
    details: 'Led the refactoring of over 2 million lines of Python technical debt at Frenetic, a SaaS platform for power magnetics design. Grew the engineering team from 4 to 9 while driving the main refactor effort. Specialized in concurrent code debugging, package development, and migrating legacy code to clean, modular architecture.',
  },
  {
    icon: '🤖', title: 'AI-Integrated Development',
    desc: 'AI-powered workflows, LLM-backed services, and AI-assisted software delivery in production environments.',
    details: 'Daily use of Claude Code, Copilot, and AI tooling in production workflows at Allot and personal projects. Currently building Joy, an AI-powered journaling application with LLM-backed insights. Experienced in designing AI architecture and integrating AI modules into existing backend systems, as done at Frenetic.',
  },
  {
    icon: '👥', title: 'Engineering Leadership & Education',
    desc: 'Team mentoring, code review culture, and professional Python training for developers.',
    details: 'Led a senior team of 12 developers at Mercedes-Benz responsible for critical architectural changes. Grew and mentored the Frenetic team from 4 to 9 engineers. Currently a Python Instructor at Tajamar, delivering advanced programming training to professional developers and recommended for both soft skills and technical knowledge.',
  },
  {
    icon: '⚡', title: 'Event-Driven & Real-Time Systems',
    desc: 'High-throughput data pipelines with Kafka, RabbitMQ, and async processing for real-time workloads.',
    details: 'Designed and maintained event-driven architectures across multiple companies: Kafka and Redis at Allot for cybersecurity event streams, RabbitMQ and Celery at Mercedes-Benz for cloud provisioning orchestration, and Airflow pipelines at BNP Paribas for data engineering. AsyncIO and concurrency are core specializations.',
  },
  {
    icon: '🧪', title: 'Quality Engineering & Testing',
    desc: 'BDD/TDD pipelines with 90%+ automated coverage, E2E automation, and production observability.',
    details: 'Main testing engineer at Mercedes-Benz — achieved 90%+ automated coverage and reduced weekly ticket volume from 12 to 3–4 by automating E2E tests with Behave and pipeline triggers. Responsible for QA testing at Allot using Kubernetes-deployed test environments. Monitoring setup with Grafana, Prometheus, and Datadog across multiple engagements.',
  },
]


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
