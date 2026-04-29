# Python OSS contribution candidates

Curated shortlist of well-known, reasonably-sized Python projects that accept public contributions — good fits for a senior Python engineer looking to build a visible OSS track record. Open-issue snapshots were pulled on **2026-04-15** via the GitHub API; issue state drifts fast, so re-check before starting work.

**How to use this list:** pick a project, open its issue tracker, filter by `good first issue` / `help wanted` / `documentation`, and look for threads where a maintainer has commented recently — that's the strongest signal a PR will actually get merged. Claim the issue in a comment before coding.

---

## 1. [tqdm/tqdm](https://github.com/tqdm/tqdm)

Progress-bar library that almost every Python developer has imported at least once. Small core, minimal ceremony, low churn — great first-PR target.

**Sample open issues:**

- [#1745 — [Feature] Add estimated clock time of completion in CLI](https://github.com/tqdm/tqdm/issues/1745)
- [#1744 — [Feature] initialize from first entry in CLI](https://github.com/tqdm/tqdm/issues/1744)
- [#1743 — feat: migrate linting/formatting from flake8 + isort + yapf to Ruff](https://github.com/tqdm/tqdm/issues/1743)
- [#1735 — Support for Progress Bar with Estimated Disk I/O](https://github.com/tqdm/tqdm/issues/1735)

---

## 2. [Textualize/rich](https://github.com/Textualize/rich)

Terminal formatting library (tables, progress, traceback rendering). The Textualize team is one of the most responsive in Python OSS; expect fast review cycles.

**Sample open issues:**

- [#4071 — [BUG] Legacy Windows layer always uses stdout handle, even when stderr stream is used](https://github.com/Textualize/rich/issues/4071)
- [#4050 — [Typo] Standardize library name to "Rich" in README.ja.md](https://github.com/Textualize/rich/issues/4050)
- [#4036 — VSCode Remote SSH: Rich traceback links point to local filesystem instead of remote server](https://github.com/Textualize/rich/issues/4036)
- [#4028 — [BUG] Failure to propagate formatting overrides via ConsoleOptions](https://github.com/Textualize/rich/issues/4028)

---

## 3. [pallets/click](https://github.com/pallets/click)

CLI framework by the Flask team. Stable, well-structured codebase — the Pallets maintainers actively curate a `good first issue` backlog, including doc/tutorial work that's easy to pick up.

**Sample open issues (`good first issue`):**

- [#3081 — Add Screenshot workflow](https://github.com/pallets/click/issues/3081)
- [#3077 — Add glossary of terms to click reference docs](https://github.com/pallets/click/issues/3077)
- [#3076 — Introduction to the command line tutorial](https://github.com/pallets/click/issues/3076)
- [#2886 — Move current docs to myst](https://github.com/pallets/click/issues/2886)

---

## 4. [httpie/cli](https://github.com/httpie/cli)

The HTTPie command-line HTTP client. Friendly CONTRIBUTING guide and a `help wanted` label that's actively tagged.

**Sample open issues (`help wanted`):**

- [#912 — fish shell completions](https://github.com/httpie/cli/issues/912)
- [#799 — --pretty=all piped to a pager does not work on Windows](https://github.com/httpie/cli/issues/799)
- [#428 — Compact help](https://github.com/httpie/cli/issues/428)

---

## 5. [encode/httpx](https://github.com/encode/httpx)

Modern sync+async HTTP client. **⚠ Issues are disabled on this repo** — contributions happen through PRs only (usually triggered by discussion on the Encode community channels or spotting a bug yourself). Smaller and cleaner codebase than `requests`.

**Sample open PRs (to see what active work looks like):**

- [#3785 — Bump cryptography from 45.0.7 to 46.0.6](https://github.com/encode/httpx/pull/3785)
- [#3783 — Add option to keep the same method for 301/302 redirects](https://github.com/encode/httpx/pull/3783)
- [#3778 — Refactor `map_httpcore_exceptions` to not be a context manager](https://github.com/encode/httpx/pull/3778)
- [#3777 — Add real async iterator for ByteStreams](https://github.com/encode/httpx/pull/3777)

---

## 6. [pypa/pipx](https://github.com/pypa/pipx)

Install and run Python CLIs in isolated environments. Narrow scope, focused codebase, official PyPA project (CV-worthy org).

**Sample open issues (`good first issue`):**

- [#1650 — Disable auto-upgrading shared libraries](https://github.com/pypa/pipx/issues/1650)
- [#1535 — `help` subcommand as an alias for `--help`](https://github.com/pypa/pipx/issues/1535)

---

## 7. [pallets/jinja](https://github.com/pallets/jinja)

Template engine (also Pallets). Mature and low-churn — bug fixes and typing improvements are the typical entry points.

**Sample open issues:**

- [#2145 — `test_elif_deep` fails on s390x with `RecursionError`](https://github.com/pallets/jinja/issues/2145)
- [#2133 — Tracking colno in AST nodes](https://github.com/pallets/jinja/issues/2133)
- [#2120 — Missing type annotation for FILTERS](https://github.com/pallets/jinja/issues/2120)
- [#2118 — Slice returns one extra item when slice count is a divisor of iterable length and fill_with not none](https://github.com/pallets/jinja/issues/2118)

---

## 8. [psf/black](https://github.com/psf/black)

The opinionated code formatter. Large user base = high-visibility contributions. Core is complex, but the `T: bug` backlog contains lots of isolated formatting-edge-case fixes that are ideal PR targets.

**Sample open issues (`T: bug`):**

- [#5083 — Black silently fails with exit code 1 when passed in too many files in the Python 3.14.2 on Linux](https://github.com/psf/black/issues/5083)
- [#4733 — Internal error: producing different code on second pass of the formatter](https://github.com/psf/black/issues/4733)
- [#4730 — `# fmt: skip` ignored inside multi-part if-clause](https://github.com/psf/black/issues/4730)
- [#4723 — strange wrapping with long PEP 695 type and long signature](https://github.com/psf/black/issues/4723)

---

## 9. [python-poetry/poetry](https://github.com/python-poetry/poetry)

Dependency manager you already use daily. Active triage, responsive maintainers, and a dedicated first-timer issue (#3061) with onboarding tips.

**Sample open issues (`good first issue`):**

- [#9161 — Add test coverage for tests/helpers.py](https://github.com/python-poetry/poetry/issues/9161)
- [#8864 — `poetry init --author` doesn't seem to allow multiple authors on Windows](https://github.com/python-poetry/poetry/issues/8864)
- [#3155 — 🧹 Test Suite Cleanup: Permanent Issue](https://github.com/python-poetry/poetry/issues/3155)
- [#3061 — ❤️ First time contributors](https://github.com/python-poetry/poetry/issues/3061) *(start here)*

---

## 10. [pydantic/pydantic](https://github.com/pydantic/pydantic)

V2 core is Rust, but the Python-side codebase still has plenty of pure-Python work: typing, serialisation, error messages, docs. Enormous downstream ecosystem = strong CV signal.

**Sample open issues:**

- [#13077 — `model_copy(deep=True, update=...)` unnecessarily deepcopies fields that will be replaced by `update`](https://github.com/pydantic/pydantic/issues/13077)
- [#13075 — Support JSON Pointers (RFC 6901) in Serialization](https://github.com/pydantic/pydantic/issues/13075)
- [#13073 — Versioned intersphinx mappings disappearing](https://github.com/pydantic/pydantic/issues/13073)
- [#13024 — `__pydantic_extra__` ignored if `extra = 'forbid'` at model level, overridden at runtime](https://github.com/pydantic/pydantic/issues/13024)

---

## 11. [python-trio/trio](https://github.com/python-trio/trio)

Structured-concurrency async library. Probably the most welcoming community in Python OSS — they have explicit mentorship for newcomers. Async/concurrency is already on your CV, so this doubles as a chance to deepen that story.

**Sample open issues (`good first issue`):**

- [#3226 — Some publicly exposed functions/properties have no documentation](https://github.com/python-trio/trio/issues/3226)
- [#3221 — Some functions and properties in the documentation have no docstring](https://github.com/python-trio/trio/issues/3221)

---

## 12. [pallets/flask](https://github.com/pallets/flask)

The web framework you already know intimately. **⚠ Caveat:** Pallets closes stale issues aggressively, so Flask currently has **zero open non-PR issues**. That makes it hard to pick up a ticket, but it's still a great target if you:

- Spot a real bug while using Flask and file-then-fix it yourself
- Contribute documentation improvements (always welcome)
- Work on the related Pallets stack instead: [click](https://github.com/pallets/click), [jinja](https://github.com/pallets/jinja), [werkzeug](https://github.com/pallets/werkzeug), [quart](https://github.com/pallets/quart)

---

## Prioritised shortlist for fastest time-to-merge

Given your background (senior Python backend, Flask/FastAPI/Django fluency, async experience), the highest-signal / lowest-friction picks are:

1. **pallets/click** — you already know the Pallets style; `good first issue` backlog is curated.
2. **python-poetry/poetry** — large welcoming backlog, #3061 is literally a first-timer onboarding issue.
3. **Textualize/rich** — fast maintainer reviews, broad issue variety.
4. **psf/black** — isolated bug tickets, huge visibility when merged.
5. **python-trio/trio** — leverages your async expertise, community mentors newcomers.

Once a PR is merged, add the repo to `OPEN_SOURCE` in [src/data/index.ts](src/data/index.ts) using the existing `{ name, desc, stars, github, tags }` shape.
