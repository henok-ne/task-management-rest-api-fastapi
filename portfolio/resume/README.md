# Resume PDF

`Henok-Mesfin-Resume.pdf` — one page, ATS-safe text layer, tailored for the
AfterQuery *College Software Engineering Expert* contract role.

## Regenerate / edit

```bash
cd portfolio/resume
python3 -m venv ../../.venv && ../../.venv/bin/pip install reportlab fonttools brotli
../../.venv/bin/python make_resume.py
```

All copy lives in the content constants at the top of `make_resume.py`
(`SUMMARY`, `SKILLS`, `EXPERIENCE`, `PROJECTS`, `EDUCATION`) — edit those and
re-run; the script re-flows the page and warns if it stops fitting on one page
(`MEASURE=1 python3 make_resume.py` prints exact content vs. frame height).

Fonts (Fraunces, Inter, JetBrains Mono) are fetched from Google Fonts through
the GitHub API on first run and cached in `.fonts/`.
