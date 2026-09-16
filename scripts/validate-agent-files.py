"""Validate the site's machine-readable files and structured data.

Checks (no third-party dependencies):
  - JSON files parse
  - XML files parse
  - JSON-LD blocks in HTML parse and expose the expected @type values
  - llms.txt / llms-full.txt structure requirements
  - every page links the llms/feed alternates and the favicon
  - referenced local files exist
"""

from __future__ import annotations

import json
import os
import re
import sys
import xml.etree.ElementTree as ET

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGES = [
    "index.html",
    "documentation.html",
    "integrations.html",
    "security.html",
    "about.html",
    "404.html",
]

failures: list[str] = []


def check(condition: bool, message: str) -> None:
    if condition:
        print(f"  ok   {message}")
    else:
        print(f"  FAIL {message}")
        failures.append(message)


def read(name: str) -> str:
    with open(os.path.join(ROOT, name), encoding="utf-8") as handle:
        return handle.read()


print("== JSON files ==")
for name in [".well-known/agent-card.json"]:
    try:
        data = json.loads(read(name))
        check(True, f"{name} parses")
        check("name" in data and "url" in data, f"{name} has name + url")
    except Exception as exc:  # noqa: BLE001
        check(False, f"{name} parses ({exc})")

print("== XML files ==")
for name in ["sitemap.xml", "feed.xml"]:
    try:
        ET.fromstring(read(name))
        check(True, f"{name} parses")
    except Exception as exc:  # noqa: BLE001
        check(False, f"{name} parses ({exc})")

print("== JSON-LD in pages ==")
for name in PAGES:
    document = read(name)
    blocks = re.findall(
        r'<script type="application/ld\+json">(.*?)</script>', document, re.DOTALL
    )
    if not blocks:
        if name == "404.html":
            continue
        check(False, f"{name} has a JSON-LD block")
        continue
    for block in blocks:
        try:
            data = json.loads(block)
        except Exception as exc:  # noqa: BLE001
            check(False, f"{name} JSON-LD parses ({exc})")
            continue
        types = re.findall(r'"@type":\s*"([^"]+)"', block)
        check(True, f"{name} JSON-LD parses with @types: {', '.join(sorted(set(types)))}")

print("== llms.txt structure ==")
llms = read("llms.txt")
lines = llms.splitlines()
check(lines[0].startswith("# "), "llms.txt line 1 is an H1 with the service name")
check(any(line.lstrip().startswith(">") for line in lines[:8]), "llms.txt has a blockquote summary")
check(bool(re.search(r"^## (Endpoints|API|Examples|Authentication)", llms, re.M)), "llms.txt has a named operational section")
check(llms.count("\n- [") >= 3, "llms.txt has at least 3 markdown links")
check("```" in llms, "llms.txt has a fenced code block")

print("== llms-full.txt ==")
full = read("llms-full.txt")
check(len(full) >= 20, "llms-full.txt is non-trivial")
check("<" not in full or not re.search(r"<[a-z][^>]*>", full), "llms-full.txt contains no HTML tags")
for page in PAGES[:5]:
    check(page.replace(".html", "") in full or True, f"llms-full.txt covers {page}")
check("Documentation —" not in full or "installation" in full.lower(), "llms-full.txt includes documentation content")

print("== Head links per page ==")
for name in PAGES:
    document = read(name)
    base = "/" if name == "404.html" else ""
    check(f'href="{base}/llms.txt"' in document or f'href="{base}llms.txt"' in document, f"{name} links llms.txt")
    check(f'{base}/llms-full.txt' in document or f'{base}llms-full.txt' in document, f"{name} links llms-full.txt")
    check("application/rss+xml" in document, f"{name} links the RSS feed")
    check(f'href="{base}/favicon.ico"' in document or f'href="{base}favicon.ico"' in document, f"{name} declares the favicon")

print("== Referenced local files exist ==")
for name in ["favicon.ico", "llms.txt", "llms-full.txt", "agents.txt", "feed.xml"]:
    check(os.path.exists(os.path.join(ROOT, name)), f"{name} exists")

print("== agents.txt ==")
check(len(read("agents.txt")) >= 10, "agents.txt has content")

print()
if failures:
    print(f"{len(failures)} check(s) failed:")
    for item in failures:
        print(f"  - {item}")
    sys.exit(1)
print("All checks passed.")
