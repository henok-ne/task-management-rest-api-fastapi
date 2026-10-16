"""
Single source of truth for resume copy.

Plain text only (no HTML/markup) — each renderer escapes or marks up as it
needs to. Edit here and re-run make_resume.py (PDF) and make_docx.py (Word).
"""

NAME = "Henok Mesfin"
ROLE = "Software Engineering Student · Python & JavaScript · Full-Stack Developer"

EMAIL = "henokmesne@gmail.com"
LINKEDIN = "https://www.linkedin.com/in/henok-mesfin-9341353b1/"
GITHUB = "https://github.com/henok-ne"
LOCATION = "Addis Ababa, Ethiopia (UTC+3)"
CONTACT_RIGHT = [
    "Addis Ababa, Ethiopia (UTC+3)",
    "Third-year BSc Software Engineering",
    "Open to remote contract work",
]

SUMMARY = (
    "Third-year software engineering student with three years of building across Python and "
    "JavaScript. I write and review code against precise specifications — Ethiopia’s ERCA tax "
    "schedule as a payroll engine, tenant isolation with row-level security, and a 20-scenario "
    "behavioural test suite for AI assistants that runs on every commit. Comfortable debugging "
    "unfamiliar systems, designing REST APIs, and giving exacting, evidence-backed technical feedback."
)

SKILLS = [
    ("Languages", "Python, JavaScript, SQL, HTML/CSS (TypeScript in progress)"),
    ("Backend & APIs", "FastAPI, Next.js, REST API design, SQLAlchemy 2.0, Mongoose, JWT/OAuth2, RBAC"),
    ("Data & systems", "PostgreSQL, MongoDB, Supabase, SQLite, schema design, indexing, Row Level Security"),
    ("Frontend", "React 19, Next.js 15 (App Router), Tailwind CSS, responsive UI"),
    ("Testing & QA", "Behavioural test design, prompt-injection and hallucination evaluation, CI regression suites"),
    ("Tooling", "Git/GitHub, Docker & Compose, GitHub Actions, Vercel, Linux/CLI, technical documentation"),
]

EXPERIENCE = [
    {
        "title": "EthioPayroll — Full-Stack Developer",
        "period": "2026 — Present",
        "context": "Self-directed, open source",
        "sub": "Payroll, HR and compliance SaaS for Ethiopian businesses",
        "bullets": [
            "Implemented Ethiopia’s ERCA payroll engine — progressive tax across six brackets, a 7% / 11% pension split, four overtime multipliers — as one shared module, verified bracket-by-bracket against the published schedule.",
            "Designed a multi-tenant schema (12 models, 21 REST routes) with role-based access control, scoping every query by tenant so no request can cross a company boundary.",
            "Diagnosed a duplicate-query and duplicate-subscription pattern that fired on every dashboard navigation, and fixed it by lifting profile resolution into one React context provider.",
        ],
        "stack": "Next.js 15 · React 19 · MongoDB · Mongoose · NextAuth · Tailwind CSS · Recharts",
    },
    {
        "title": "Backend, Security & AI Quality — Backend Developer",
        "period": "2025 — 2026",
        "context": "Self-directed, open source",
        "sub": "Authenticated APIs, hardened deployments, behavioural evaluation of AI assistants",
        "bullets": [
            "Built a JWT-authenticated CRUD API in FastAPI with bcrypt hashing and ownership checks in every query — 47 commits, one codebase running locally, in Docker, and serverless on Vercel.",
            "Authored a 20-scenario behavioural suite for AI assistants — hallucination, prompt injection, privacy leaks, ambiguity, unauthorised actions — run in CI on every push.",
            "Reviewed a 16/20 first pass, isolated four failure modes, and documented each fix in a written case study with a reusable evaluation rubric.",
        ],
        "stack": "Python · FastAPI · SQLAlchemy 2.0 · PostgreSQL · Docker · GitHub Actions · Vercel",
    },
    {
        "title": "Full-Stack Foundations — Self-taught Developer",
        "period": "2023 — 2025",
        "context": "Self-directed",
        "sub": None,
        "bullets": [
            "Learned Python and JavaScript from first principles — CLI tools with structured exception handling, framework-free HTML/CSS layouts, then React, async data fetching and relational schemas.",
        ],
        "stack": "Python · JavaScript · HTML & CSS · React · Git",
    },
]

PROJECTS = [
    (
        "EthioPayroll",
        "Payroll and HR SaaS: 12 models, 21 REST routes, 25 RLS policies.",
        "Next.js · MongoDB",
    ),
    (
        "Task Management REST API",
        "JWT-authenticated FastAPI service; local, Docker and serverless.",
        "FastAPI · Docker",
    ),
    (
        "AgentProof Starter",
        "Behavioural QA kit for AI assistants: 20 scenarios in CI, case study and rubric.",
        "Python · YAML",
    ),
    (
        "Pediatric Dose Reference",
        "Offline clinical calculator: 116 drugs, 164 dosing lines.",
        "JavaScript · HTML",
    ),
]

EDUCATION = [
    {
        "school": "HiLCoE School of Computer Science & Technology",
        "detail": "BSc Software Engineering, third year. Coursework: data structures and algorithms, databases, web development.",
        "right": "Addis Ababa, Ethiopia",
    },
    {
        "school": "Open source & self-directed work",
        "detail": "Eight public repositories, each documented and deployed where it can be — not tutorial forks.",
        "right": "2023 — Present",
    },
]

FOOTER = "Amharic (native) · English (professional) · 8 public repositories at github.com/henok-ne · Code samples on request."
