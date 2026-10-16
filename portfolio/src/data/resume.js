/**
 * Single source of truth for every piece of content on the page.
 */

export const profile = {
  name: 'Henok',
  nameAccent: 'Mesfin', // rendered in italic amber serif
  monogram: 'HM',
  title: 'Full-Stack Developer',
  location: 'Addis Ababa, Ethiopia',
  availability: 'Available for junior full-stack roles, internships & freelance work',
  email: 'henokmesne@gmail.com',
  linkedin: 'https://www.linkedin.com/in/henok-mesfin-9341353b1/',
  github: 'https://github.com/henok-ne',
  cvFile: '/Henok-Mesfin-Resume.pdf',
  cvFileDocx: '/Henok-Mesfin-Resume.docx',
  status: 'Open to work',
}

export const bio = [
  'Three years of building for the web: schema, authentication, API and interface — across React and Next.js on one side and Python and FastAPI on the other.',
  'My flagship work, EthioPayroll, is a multi-tenant payroll and HR platform for Ethiopian businesses that I built twice: once on PostgreSQL with row-level security, then again on MongoDB.',
  'I care most about correctness at the edges — tax brackets that match the published ERCA schedule, a tenant boundary no query can leak across, and input sanitised before it reaches the database.',
]

export const dossier = [
  { label: 'Location', value: 'Addis Ababa, Ethiopia (UTC+3)' },
  { label: 'Experience', value: '3 years · Python & JavaScript' },
  { label: 'Focus', value: 'Full-stack · React/Next.js & Python/FastAPI' },
  { label: 'Data layer', value: 'PostgreSQL · MongoDB · SQLite' },
  { label: 'Languages', value: 'Amharic (native) · English (professional)' },
  { label: 'Availability', value: 'Remote, hybrid or on-site' },
  { label: 'Current status', value: 'Shipping EthioPayroll · open to work' },
]

export const counters = [
  { value: 3, label: 'Years', note: 'building for the web' },
  { value: 8, label: 'Projects shipped', note: 'public repositories' },
  { value: 21, label: 'REST endpoints', note: 'EthioPayroll API' },
  { value: 32, label: 'Technologies', note: 'in daily use' },
]

export const experience = [
  {
    id: 'exp-ethiopayroll',
    period: '2026 — Present',
    company: 'EthioPayroll',
    role: 'Full-Stack Developer · Self-directed, open source',
    location: 'Addis Ababa, Ethiopia (remote)',
    summary:
      'Designed and shipped a multi-tenant payroll, HR and compliance SaaS for Ethiopian businesses, then rebuilt it on a second data layer.',
    achievements: [
      'Built the platform end to end — employees, contractors, leave, overtime, offer letters, payroll runs, payslips, reports and an append-only audit trail — across 12 Mongoose models and 21 REST API routes.',
      'Implemented the Ethiopian payroll engine in one shared module: progressive ERCA income tax across 6 brackets (0–35%), 7% employee / 11% employer pension, and four overtime multipliers on a 26-day / 8-hour month, so payroll, payslips and reports can never disagree.',
      'Enforced role-based access (admin / HR / finance / viewer) with NextAuth JWT sessions that carry companyId and role, and scoped every query by tenant.',
      'Removed a per-page duplicate query and duplicate realtime subscription by lifting profile and company resolution into a single React context provider mounted once in the dashboard layout.',
    ],
    stack: ['Next.js 15', 'React 19', 'MongoDB', 'Mongoose', 'NextAuth', 'Tailwind CSS', 'Recharts'],
  },
  {
    id: 'exp-backend',
    period: '2025 — 2026',
    company: 'Backend, Security & AI Quality',
    role: 'Backend Developer · Self-directed, open source',
    location: 'Addis Ababa, Ethiopia (remote)',
    summary:
      'Authentication-hardened APIs, a portable data layer, containerised deployment, and a behavioural test suite for AI assistants.',
    achievements: [
      'Built a JWT-authenticated task API in FastAPI with bcrypt hashing, OAuth2 bearer tokens and per-user ownership enforced on every read, update and delete — 47 commits.',
      'Wrote a portable data layer that runs on pooled PostgreSQL in production and falls back to SQLite for local and serverless environments, with connection-pool tuning for both.',
      'Containerised the stack with Docker Compose (API + PostgreSQL 15) and deployed it serverless to Vercel, documenting the read-only filesystem and IPv6 / pooler constraints.',
      'Hardened the PostgreSQL edition with 25 row-level-security policies, CSP and HSTS headers, DOMPurify input sanitisation and CSV-formula-injection defence.',
      'Authored a 20-scenario behavioural QA suite for AI assistants — hallucination, prompt injection, privacy leaks, unauthorised actions — wired into GitHub Actions on every push and pull request.',
    ],
    stack: ['Python', 'FastAPI', 'SQLAlchemy 2.0', 'PostgreSQL', 'Docker', 'GitHub Actions', 'Vercel'],
  },
  {
    id: 'exp-foundations',
    period: '2023 — 2025',
    company: 'Full-Stack Foundations',
    role: 'Self-taught developer',
    location: 'Addis Ababa, Ethiopia',
    summary:
      'Three years of deliberate practice, from command-line tools in Python to hand-written layouts and the first production-shaped React applications.',
    achievements: [
      'Learned Python and JavaScript from the ground up, writing command-line tools with structured exception handling before reaching for any framework.',
      'Built hand-written HTML and CSS layouts with no framework at all — semantic markup, Grid and Flexbox from first principles.',
      'Moved into React and asynchronous data fetching, then into APIs with FastAPI, relational schemas and containerised deployments.',
    ],
    stack: ['Python', 'JavaScript', 'HTML & CSS', 'React', 'Git'],
  },
]

export const skillGroups = [
  {
    id: 'core',
    name: 'Core Craft',
    items: [
      'Python',
      'JavaScript',
      'SQL',
      'React',
      'Next.js',
      'FastAPI',
      'Node.js',
      'Tailwind CSS',
      'Mongoose',
      'SQLAlchemy',
    ],
  },
  {
    id: 'tools',
    name: 'Tools',
    items: [
      'PostgreSQL',
      'MongoDB',
      'Supabase',
      'SQLite',
      'Docker',
      'Git & GitHub',
      'GitHub Actions',
      'Vercel',
      'Linux / CLI',
      'DOMPurify',
    ],
  },
  {
    id: 'methods',
    name: 'Methods',
    items: [
      'REST API design',
      'Schema design',
      'Row Level Security',
      'RBAC',
      'JWT / OAuth2',
      'Input sanitisation',
      'Multi-tenant isolation',
      'Technical documentation',
    ],
  },
  {
    id: 'learning',
    name: 'Currently Learning',
    items: ['TypeScript', 'PyTest', 'Jest & RTL', 'Redis caching'],
  },
]

export const projects = [
  {
    id: 'ethiopayroll',
    number: '01',
    title: 'EthioPayroll',
    oneLiner:
      'A multi-tenant payroll, HR and compliance platform for Ethiopian businesses — from the ERCA tax engine to a passwordless employee portal.',
    role: 'Full-stack developer',
    year: '2026',
    stack: ['Next.js 15', 'React 19', 'MongoDB', 'NextAuth', 'Tailwind CSS'],
    links: [
      { label: 'GitHub', href: 'https://github.com/henok-ne/habesha-pay2' },
      { label: 'Postgres edition', href: 'https://github.com/henok-ne/habesha-pay' },
    ],
    modal: {
      problem:
        'Small and mid-sized Ethiopian companies run payroll in spreadsheets. ERCA’s progressive income-tax schedule, the 7% / 11% pension split, and four different overtime multipliers are easy to get wrong — and most tools available are neither tenant-isolated nor built for Ethiopian compliance.',
      solution:
        'A multi-tenant SaaS with 12 data models and 21 REST routes behind role-based access (admin, HR, finance, viewer). The payroll engine lives in one shared module — progressive tax across six brackets, pension contributions, overtime multipliers, a non-taxable transport allowance — so payroll runs, payslips and reports read from the same numbers. Employees, contractors, leave, overtime, offer letters and an append-only audit trail sit on top.',
      impact:
        'Built twice on purpose: first on PostgreSQL with 25 row-level-security policies across 12 tables, then re-implemented on MongoDB and Mongoose with the domain logic unchanged. A passwordless self-service portal lets employees open their payslips through single-use, expiring tokens served by a route that deliberately bypasses RLS, with the token itself as the credential.',
    },
  },
  {
    id: 'task-api',
    number: '02',
    title: 'Task Management REST API',
    oneLiner:
      'A JWT-authenticated CRUD service in FastAPI with a portable SQLAlchemy data layer, containerised and deployed serverless.',
    role: 'Backend developer',
    year: '2026',
    stack: ['Python', 'FastAPI', 'SQLAlchemy 2.0', 'PostgreSQL', 'Docker'],
    links: [{ label: 'GitHub', href: 'https://github.com/henok-ne/task-management-rest-api-fastapi' }],
    modal: {
      problem:
        'I needed one authenticated API that behaves identically in three environments: a laptop, a Docker Compose stack with PostgreSQL, and a serverless host whose filesystem is read-only except /tmp.',
      solution:
        'FastAPI with SQLAlchemy 2.0, where the engine is chosen from DATABASE_URL — pooled PostgreSQL in production, SQLite fallback locally — so the same code runs everywhere. Signup and OAuth2 password login use bcrypt hashing and HS256 bearer tokens; ownership is re-checked in every task query, not just at the route.',
      impact:
        '47 commits. docker-compose brings up the API alongside PostgreSQL 15 in one command, and the deployment documents the two things that actually break: the read-only filesystem and Supabase’s IPv6 transaction pooler.',
    },
  },
  {
    id: 'agentproof',
    number: '03',
    title: 'AgentProof Starter',
    oneLiner:
      'A behavioural QA test kit for AI assistants: 20 scenarios covering hallucination, prompt injection and privacy, running in CI on every push.',
    role: 'Author',
    year: '2026',
    stack: ['Python', 'YAML', 'GitHub Actions'],
    links: [
      { label: 'GitHub', href: 'https://github.com/henok-ne/agentproof-starter' },
      {
        label: 'Case study',
        href: 'https://github.com/henok-ne/agentproof-starter/blob/main/case-study.md',
      },
    ],
    modal: {
      problem:
        'AI assistants get tested for whether they answer, not whether they answer safely. Unsupported claims, privacy leaks, prompt injection and unauthorised actions ship unnoticed because nobody writes tests for them.',
      solution:
        'A 20-scenario YAML suite spanning happy paths, billing, support, data export, security, injection, ambiguity and multi-turn behaviour, run against a deterministic demo assistant that needs no API key. GitHub Actions runs the suite on every push and pull request, so regressions after a prompt or model change are caught in CI.',
      impact:
        'The first pass was 16/20. The four failures — an unauthorised administrator request, an unsupported phone number, and two knowledge-base-boundary cases — are documented with the fix for each in a published case study, alongside client-ready templates: intake form, test plan, findings report and evaluation rubric.',
    },
  },
  {
    id: 'peds-dose',
    number: '04',
    title: 'Pediatric Dose & Equipment Reference',
    oneLiner:
      'An offline, zero-build bedside reference: 116 drugs and 164 dosing lines with weight-based calculations and equipment sizing.',
    role: 'Frontend developer',
    year: '2026',
    stack: ['JavaScript', 'HTML', 'CSS'],
    links: [{ label: 'GitHub', href: 'https://github.com/henok-ne/peds-dose-reference' }],
    modal: {
      problem:
        'Clinicians need drug doses and equipment sizes in seconds, often on a ward with unreliable connectivity and no time to install anything.',
      solution:
        'One self-contained HTML file. 116 drugs and 164 dosing lines transcribed from CHEO reference material drive live weight-based calculations, joined by age/weight equipment sizing (endotracheal tubes, laryngoscope blades, chest tubes, central and arterial lines), ventilator settings and nerve-block dosing behind instant, keyboard-first search.',
      impact:
        'No backend, no build step, no network dependency — it opens instantly and works offline. The whole reference is a single file a clinician can save to a phone or a ward desktop.',
    },
  },
]

export const education = [
  {
    institution: 'HiLCoE School of Computer Science & Technology',
    detail: 'Computer science and technology programme.',
    period: null,
    location: 'Addis Ababa, Ethiopia',
  },
  {
    institution: 'Self-directed full-stack curriculum',
    detail:
      'Python and FastAPI APIs, React and Next.js, relational and document databases, Docker and CI — evidenced across 8 public repositories.',
    period: '2023 — Present',
    location: 'Remote',
  },
]

export const navSections = [
  { id: 'profile', number: '01', label: 'Profile' },
  { id: 'experience', number: '02', label: 'Experience' },
  { id: 'work', number: '03', label: 'Selected Work' },
  { id: 'skills', number: '04', label: 'Skills' },
  { id: 'education', number: '05', label: 'Education' },
  { id: 'contact', number: '06', label: 'Contact' },
]
