"""Render the resume copy as plain text — for pasting into application forms."""

from resume_content import (
    CONTACT_RIGHT,
    EDUCATION,
    EMAIL,
    EXPERIENCE,
    FOOTER,
    GITHUB,
    LINKEDIN,
    NAME,
    PROJECTS,
    ROLE,
    SKILLS,
    SUMMARY,
)

WIDTH = 96


def wrap(text, indent="", width=WIDTH):
    words, lines, line = text.split(), [], indent
    for word in words:
        candidate = f"{line} {word}" if line.strip() else f"{line}{word}"
        if len(candidate) > width and line.strip():
            lines.append(line)
            line = f"{indent}{word}"
        else:
            line = candidate
    lines.append(line)
    return lines


def main():
    out = [NAME, ROLE, ""]
    out.append(f"Email:    {EMAIL}")
    out.append(f"LinkedIn: {LINKEDIN}")
    out.append(f"GitHub:   {GITHUB}")
    for line in CONTACT_RIGHT:
        out.append(line)
    out.append("")

    out += ["PROFILE", "-" * WIDTH]
    out += wrap(SUMMARY)
    out.append("")

    out += ["TECHNICAL SKILLS", "-" * WIDTH]
    for label, value in SKILLS:
        out += wrap(f"{label}: {value}")
    out.append("")

    out += ["TECHNICAL EXPERIENCE", "-" * WIDTH]
    for job in EXPERIENCE:
        out.append(f"{job['title']}  ({job['period']})")
        out.append(f"{job['context']}" + (f" — {job['sub']}" if job.get("sub") else ""))
        for bullet in job["bullets"]:
            out += wrap(f"- {bullet}", indent="  ")
        out.append(f"  Stack: {job['stack']}")
        out.append("")

    out += ["SELECTED PROJECTS", "-" * WIDTH]
    for title, desc, stack in PROJECTS:
        out += wrap(f"- {title} — {desc} ({stack})")
    out.append("")

    out += ["EDUCATION", "-" * WIDTH]
    for item in EDUCATION:
        out.append(f"{item['school']}  ({item['right']})")
        out += wrap(item["detail"], indent="  ")
        out.append("")

    out.append(FOOTER)

    text = "\n".join(out) + "\n"
    path = "/home/user/task-management-rest-api-fastapi/portfolio/resume/Henok-Mesfin-Resume.txt"
    with open(path, "w") as handle:
        handle.write(text)
    print(f"Wrote {path} ({len(text)} chars)")


if __name__ == "__main__":
    main()
