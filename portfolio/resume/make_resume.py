#!/usr/bin/env python3
"""
Builds Henok Mesfin's resume PDF (tailored for the AfterQuery
"College Software Engineering Expert" contract role).

Usage:
    python3 make_resume.py            # writes Henok-Mesfin-Resume.pdf

Fonts (Fraunces, Inter, JetBrains Mono) are fetched from Google Fonts via the
GitHub API and instanced to static weights with fontTools. Everything is cached
in .fonts/ so repeat runs are offline.
"""

import os
import shutil
import subprocess
import sys

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    HRFlowable,
    KeepTogether,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

HERE = os.path.dirname(os.path.abspath(__file__))
FONT_DIR = os.path.join(HERE, ".fonts")
INST_DIR = os.path.join(FONT_DIR, "inst")
OUT = os.path.join(HERE, "Henok-Mesfin-Resume.pdf")

# ---------------------------------------------------------------- palette
INK = colors.HexColor("#14140F")
INK_SOFT = colors.HexColor("#33322C")
MUTED = colors.HexColor("#5C574E")
ACCENT = colors.HexColor("#E0A458")
ACCENT_DEEP = colors.HexColor("#8A5A16")
RULE = colors.HexColor("#D8D2C6")
RULE_SOFT = colors.HexColor("#E7E2D8")

GH_FONTS = {
    "fraunces": ("ofl/fraunces/Fraunces%5BSOFT,WONK,opsz,wght%5D.ttf", "fraunces-var.ttf"),
    "fraunces-italic": (
        "ofl/fraunces/Fraunces-Italic%5BSOFT,WONK,opsz,wght%5D.ttf",
        "fraunces-italic-var.ttf",
    ),
    "inter": ("ofl/inter/Inter%5Bopsz,wght%5D.ttf", "inter-var.ttf"),
    "inter-italic": ("ofl/inter/Inter-Italic%5Bopsz,wght%5D.ttf", "inter-italic-var.ttf"),
    "mono": ("ofl/jetbrainsmono/JetBrainsMono%5Bwght%5D.ttf", "jetbrains-var.ttf"),
}

# axis values for each static instance we need
INSTANCES = {
    "Fraunces": ("fraunces", {"wght": 700, "opsz": 40, "SOFT": 0, "WONK": 0}),
    "Fraunces-Italic": ("fraunces-italic", {"wght": 600, "opsz": 40, "SOFT": 0, "WONK": 0}),
    "Inter": ("inter", {"wght": 400, "opsz": 16}),
    "Inter-Semi": ("inter", {"wght": 600, "opsz": 16}),
    "Inter-Bold": ("inter", {"wght": 700, "opsz": 16}),
    "Inter-Italic": ("inter-italic", {"wght": 400, "opsz": 16}),
    "Mono": ("mono", {"wght": 400}),
    "Mono-Semi": ("mono", {"wght": 600}),
}


def fetch_fonts():
    """Download the variable fonts through the GitHub API (raw.githubusercontent is blocked)."""
    os.makedirs(FONT_DIR, exist_ok=True)
    for key, (path, filename) in GH_FONTS.items():
        dest = os.path.join(FONT_DIR, filename)
        if os.path.exists(dest) and os.path.getsize(dest) > 50000:
            continue
        url = f"https://api.github.com/repos/google/fonts/contents/{path}"
        try:
            with open(dest, "wb") as fh:
                subprocess.run(
                    ["gh", "api", "-H", "Accept: application/vnd.github.raw", url],
                    stdout=fh,
                    stderr=subprocess.DEVNULL,
                    check=True,
                )
        except Exception as exc:  # pragma: no cover
            raise SystemExit(
                f"Could not download {filename} ({exc}).\n"
                f"Fetch it manually from https://github.com/google/fonts and place it in {FONT_DIR}/"
            )
        if os.path.getsize(dest) < 50000:
            os.remove(dest)
            raise SystemExit(f"Downloaded {filename} looks wrong — check your GitHub access.")


def build_instances():
    """Instance the variable fonts into static weights ReportLab can embed."""
    from fontTools.ttLib import TTFont as FTTTFont
    from fontTools.varLib import instancer

    os.makedirs(INST_DIR, exist_ok=True)
    paths = {}
    for name, (src_key, axes) in INSTANCES.items():
        out = os.path.join(INST_DIR, f"{name}.ttf")
        paths[name] = out
        if os.path.exists(out) and os.path.getsize(out) > 20000:
            continue
        src = os.path.join(FONT_DIR, GH_FONTS[src_key][1])
        font = FTTTFont(src)
        inst = instancer.instantiateVariableFont(font, axes, inplace=False)
        inst.save(out)
    return paths


def register(paths):
    for name, path in paths.items():
        pdfmetrics.registerFont(TTFont(name, path))

    pdfmetrics.registerFontFamily(
        "Inter", normal="Inter", bold="Inter-Bold", italic="Inter-Italic", boldItalic="Inter-Bold"
    )
    pdfmetrics.registerFontFamily("Fraunces", normal="Fraunces", italic="Fraunces-Italic")
    pdfmetrics.registerFontFamily("Mono", normal="Mono", bold="Mono-Semi")


# ---------------------------------------------------------------- styles
def styles():
    s = {}
    s["name"] = ParagraphStyle(
        "name", fontName="Fraunces", fontSize=21.5, leading=22, textColor=INK, alignment=TA_LEFT
    )
    s["role"] = ParagraphStyle(
        "role",
        fontName="Inter-Semi",
        fontSize=9.2,
        leading=11.8,
        textColor=ACCENT_DEEP,
        spaceBefore=4,
    )
    s["contact"] = ParagraphStyle(
        "contact", fontName="Mono", fontSize=7.5, leading=9.9, textColor=MUTED, alignment=TA_RIGHT
    )
    s["contact-plain"] = ParagraphStyle(
        "contact-plain", fontName="Mono", fontSize=7.5, leading=9.9, textColor=MUTED
    )
    s["label"] = ParagraphStyle(
        "label", fontName="Mono-Semi", fontSize=7.4, leading=9.2, textColor=ACCENT_DEEP
    )
    s["body"] = ParagraphStyle(
        "body", fontName="Inter", fontSize=8.7, leading=11.5, textColor=INK_SOFT
    )
    s["skill"] = ParagraphStyle(
        "skill", fontName="Inter", fontSize=8.5, leading=11.1, textColor=INK_SOFT, spaceAfter=1.1
    )
    s["job-head"] = ParagraphStyle(
        "job-head", fontName="Inter-Bold", fontSize=9.2, leading=11.6, textColor=INK
    )
    s["job-meta"] = ParagraphStyle(
        "job-meta", fontName="Mono", fontSize=7.4, leading=9.6, textColor=MUTED, alignment=TA_RIGHT
    )
    s["job-sub"] = ParagraphStyle(
        "job-sub", fontName="Inter-Italic", fontSize=8.2, leading=10.5, textColor=MUTED
    )
    s["bullet"] = ParagraphStyle(
        "bullet",
        fontName="Inter",
        fontSize=8.5,
        leading=10.8,
        textColor=INK_SOFT,
        leftIndent=11,
        bulletIndent=0,
        spaceAfter=1.1,
    )
    s["stack"] = ParagraphStyle(
        "stack", fontName="Mono", fontSize=7.1, leading=9.3, textColor=MUTED, spaceBefore=2
    )
    s["proj"] = ParagraphStyle(
        "proj", fontName="Inter", fontSize=8.5, leading=11.0, textColor=INK_SOFT, spaceAfter=1.7
    )
    return s


# ---------------------------------------------------------------- content
NAME = "Henok Mesfin"
ROLE = "Software Engineering Student &nbsp;·&nbsp; Python &amp; JavaScript &nbsp;·&nbsp; Full-Stack Developer &nbsp;·&nbsp; Addis Ababa"
CONTACT_LEFT = (
    "henokmesne@gmail.com<br/>"
    "linkedin.com/in/henok-mesfin-9341353b1<br/>"
    "github.com/henok-ne"
)
CONTACT_RIGHT = (
    "Addis Ababa, Ethiopia (UTC+3)<br/>"
    "Third-year BSc Software Engineering<br/>"
    "Open to remote contract work"
)

SUMMARY = (
    "Third-year software engineering student with three years of building across Python and JavaScript. I write and review "
    "code against precise specifications — Ethiopia\u2019s ERCA tax schedule as a payroll engine, tenant isolation with "
    "row-level security, and a 20-scenario behavioural test suite for AI assistants that runs on every commit. Comfortable "
    "debugging unfamiliar systems, designing REST APIs, and giving exacting, evidence-backed technical feedback."
)

SKILLS = [
    ("Languages", "Python, JavaScript, SQL, HTML/CSS (TypeScript in progress)"),
    ("Backend &amp; APIs", "FastAPI, Next.js route handlers, REST API design, SQLAlchemy 2.0, Mongoose, JWT/OAuth2, RBAC"),
    ("Data &amp; systems", "PostgreSQL, MongoDB, Supabase, SQLite, schema design, indexing, Row Level Security, tenant isolation"),
    ("Frontend", "React 19, Next.js 15 (App Router), Tailwind CSS, responsive UI"),
    ("Testing &amp; QA", "Behavioural test design, prompt-injection and hallucination evaluation, CI regression suites"),
    ("Tooling", "Git/GitHub, Docker &amp; Compose, GitHub Actions, Vercel, Linux/CLI, technical documentation"),
]

EXPERIENCE = [
    {
        "title": "EthioPayroll — Full-Stack Developer",
        "meta": "Self-directed, open source<br/>2026 — Present",
        "sub": "Payroll, HR and compliance SaaS for Ethiopian businesses",
        "bullets": [
            "Implemented Ethiopia\u2019s ERCA payroll engine — progressive tax across six brackets, a 7% / 11% pension split, four overtime multipliers — as one shared module, verified bracket-by-bracket against the published schedule.",
            "Designed a multi-tenant schema (12 models, 21 REST routes) with role-based access control, scoping every query by tenant so no request can cross a company boundary.",
            "Diagnosed a duplicate-query and duplicate-subscription pattern that fired on every dashboard navigation, and fixed it by lifting profile resolution into one React context provider.",
        ],
        "stack": "Next.js 15 · React 19 · MongoDB · Mongoose · NextAuth · Tailwind CSS · Recharts",
    },
    {
        "title": "Backend, Security &amp; AI Quality — Backend Developer",
        "meta": "Self-directed, open source<br/>2025 — 2026",
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
        "meta": "Self-directed<br/>2023 — 2025",
        "bullets": [
            "Learned Python and JavaScript from first principles — CLI tools with structured exception handling, framework-free HTML/CSS layouts, then React, async data fetching and relational schemas.",
        ],
        "stack": "Python · JavaScript · HTML &amp; CSS · React · Git",
    },
]

PROJECTS = [
    (
        "EthioPayroll",
        "Multi-tenant payroll and HR SaaS: 12 models, 21 REST routes, 25 RLS policies.",
        "Next.js · MongoDB · NextAuth",
    ),
    (
        "Task Management REST API",
        "JWT-authenticated FastAPI service; one codebase, local, Docker and serverless.",
        "Python · FastAPI · PostgreSQL · Docker",
    ),
    (
        "AgentProof Starter",
        "Behavioural QA kit for AI assistants: 20 scenarios in CI, published case study and rubric.",
        "Python · YAML · GitHub Actions",
    ),
    (
        "Pediatric Dose Reference",
        "Offline clinical calculator: 116 drugs, 164 dosing lines, weight-based dosing.",
        "JavaScript · HTML · CSS",
    ),
]

EDUCATION = [
    {
        "school": "HiLCoE School of Computer Science &amp; Technology",
        "detail": "BSc Software Engineering, third year. Coursework: data structures and algorithms, databases, web development.",
        "meta": "Addis Ababa, Ethiopia",
    },
    {
        "school": "Open source &amp; self-directed work",
        "detail": "Eight public repositories, each documented and deployed where it can be — not tutorial forks.",
        "meta": "2023 — Present",
    },
]


# ---------------------------------------------------------------- layout
def header_block(s):
    """Name and role run full width; contact details split into two columns."""
    table = Table(
        [[Paragraph(CONTACT_LEFT, s["contact-plain"]), Paragraph(CONTACT_RIGHT, s["contact"])]],
        colWidths=[3.66 * inch, 3.66 * inch],
    )
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    return [Paragraph(NAME, s["name"]), Paragraph(ROLE, s["role"]), Spacer(1, 3), table]


def section(title, s, first=False):
    return [
        Paragraph(title, s["label"]),
        HRFlowable(
            width="100%",
            thickness=0.9,
            color=ACCENT,
            spaceBefore=2,
            spaceAfter=0,
        ),
        HRFlowable(width="100%", thickness=0.4, color=RULE, spaceBefore=0.5, spaceAfter=4),
    ]


def skills_block(s):
    out = []
    for label, value in SKILLS:
        out.append(
            Paragraph(f"<b>{label}:</b>&nbsp; {value}", s["skill"])
        )
    return out


def experience_block(s):
    out = []
    for job in EXPERIENCE:
        head = Table(
            [[Paragraph(job["title"], s["job-head"]), Paragraph(job["meta"], s["job-meta"])]],
            colWidths=[5.1 * inch, 2.22 * inch],
        )
        head.setStyle(
            TableStyle(
                [
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 0),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                    ("TOPPADDING", (0, 0), (-1, -1), 0),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
                ]
            )
        )
        block = [head]
        if job.get("sub"):
            block += [Paragraph(job["sub"], s["job-sub"]), Spacer(1, 2.5)]
        else:
            block += [Spacer(1, 1.5)]
        for b in job["bullets"]:
            block.append(Paragraph(b, s["bullet"], bulletText="—"))
        block.append(Paragraph(job["stack"], s["stack"]))
        block.append(Spacer(1, 5))
        out.append(KeepTogether(block))
    return out


def projects_block(s):
    out = []
    for title, desc, stack in PROJECTS:
        out.append(
            Paragraph(
                f"<b>{title}</b> — {desc} <font face='Mono' size='7.3' color='#7A7367'>{stack}</font>",
                s["proj"],
            )
        )
    return out


def education_block(s):
    out = []
    for i, item in enumerate(EDUCATION):
        head = Table(
            [
                [
                    Paragraph(item["school"], s["job-head"]),
                    Paragraph(item["meta"], s["job-meta"]),
                ]
            ],
            colWidths=[5.1 * inch, 2.22 * inch],
        )
        head.setStyle(
            TableStyle(
                [
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 0),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                    ("TOPPADDING", (0, 0), (-1, -1), 0),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
                ]
            )
        )
        out.extend([head, Paragraph(item["detail"], s["body"])])
        if i < len(EDUCATION) - 1:
            out.append(Spacer(1, 5))
    return out


def build():
    fetch_fonts()
    register(build_instances())
    s = styles()

    doc = BaseDocTemplate(
        OUT,
        pagesize=LETTER,
        leftMargin=0.6 * inch,
        rightMargin=0.6 * inch,
        topMargin=0.4 * inch,
        bottomMargin=0.36 * inch,
        title="Henok Mesfin — Software Engineering Student",
        author="Henok Mesfin",
        subject="Resume for AfterQuery — College Software Engineering Expert",
    )
    frame = Frame(
        doc.leftMargin,
        doc.bottomMargin,
        doc.width,
        doc.height,
        id="body",
        leftPadding=0,
        rightPadding=0,
        topPadding=0,
        bottomPadding=0,
    )
    doc.addPageTemplates([PageTemplate(id="all", frames=[frame])])

    story = []
    story += header_block(s)
    story.append(Spacer(1, 3))

    story += section("PROFILE", s)
    story.append(Paragraph(SUMMARY, s["body"]))
    story.append(Spacer(1, 3))

    story += section("TECHNICAL SKILLS", s)
    story += skills_block(s)
    story.append(Spacer(1, 2.5))

    story += section("TECHNICAL EXPERIENCE", s)
    story += experience_block(s)

    story += section("SELECTED PROJECTS", s)
    story += projects_block(s)
    story.append(Spacer(1, 3.5))

    story += section("EDUCATION", s)
    story += education_block(s)
    story.append(Spacer(1, 4))

    story.append(
        Paragraph(
            "Amharic (native) · English (professional) · 8 public repositories at github.com/henok-ne · Code samples on request.",
            ParagraphStyle(
                "foot", fontName="Mono", fontSize=6.9, leading=8.6, textColor=MUTED
            ),
        )
    )

    if os.environ.get("MEASURE"):
        def h(f):
            if isinstance(f, KeepTogether):
                return sum(h(c) for c in f._content)
            sb = getattr(f, "spaceBefore", 0) or 0
            sa = getattr(f, "spaceAfter", 0) or 0
            try:
                return sb + f.wrap(doc.width, 100000)[1] + sa
            except Exception:
                return sb + sa
        total = sum(h(f) for f in story)
        print(f"MEASURE content={total:.1f} frame={doc.height:.1f} overflow={total-doc.height:+.1f}")

    doc.build(story)
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    sys.exit(build())
