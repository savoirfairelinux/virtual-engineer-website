#!/usr/bin/env python3
"""Build llms-full.txt from the site's HTML pages and documentation data.

llms-full.txt is the companion to llms.txt: the full concatenated text of the
site, so non-browsing LLMs (RAG pipelines, embedded agents) can ingest the whole
site in one fetch. See https://llmstxt.org/.

There is no build step in this repository, so run this script manually after
changing page content and commit the regenerated file:

    python3 scripts/build-llms-full.py

It reads the top-level HTML pages and assets/docs-data.js (the source of the
documentation page content), strips markup, and writes ./llms-full.txt.
"""

from __future__ import annotations

import html
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTPUT = os.path.join(ROOT, "llms-full.txt")

# Ordered: the landing page first, then the deeper pages.
PAGES = [
    ("index.html", "Virtual Engineer — home"),
    ("documentation.html", "Virtual Engineer — documentation"),
    ("integrations.html", "Virtual Engineer — integrations"),
    ("security.html", "Virtual Engineer — security"),
    ("about.html", "Virtual Engineer — about us"),
]

HEADER = """# Virtual Engineer — full site text

> Complete concatenated text of https://virtual-engineer.dev/ for LLM ingestion.
> Generated from the site's HTML pages and documentation data by
> scripts/build-llms-full.py. Do not edit by hand.
"""

# Elements whose contents carry no meaning for an LLM.
DROP_ELEMENTS = re.compile(
    r"<(script|style|svg|noscript)\b[^>]*>.*?</\1\s*>",
    re.IGNORECASE | re.DOTALL,
)

BLOCK_BREAK = re.compile(
    r"</(p|div|section|article|li|ul|ol|tr|h[1-6]|header|footer|main|nav|blockquote|pre)\s*>",
    re.IGNORECASE,
)
BREAK_TAGS = re.compile(r"<(br|hr)\s*/?>", re.IGNORECASE)
LI_OPEN = re.compile(r"<li\b[^>]*>", re.IGNORECASE)
HEADING_OPEN = re.compile(r"<h([1-6])\b[^>]*>", re.IGNORECASE)
ALL_TAGS = re.compile(r"<[^>]+>")


def strip_tags(fragment: str) -> str:
    """Convert an HTML fragment to readable plain text."""
    text = DROP_ELEMENTS.sub(" ", fragment)
    text = LI_OPEN.sub("\n- ", text)
    text = HEADING_OPEN.sub(lambda m: "\n\n" + "#" * int(m.group(1)) + " ", text)
    text = BREAK_TAGS.sub("\n", text)
    text = BLOCK_BREAK.sub("\n\n", text)
    text = ALL_TAGS.sub(" ", text)
    text = html.unescape(text)
    text = text.replace("\u00a0", " ").replace("\u2009", " ").replace("\u200a", " ")
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n[ \t]+", "\n", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def extract_body(document: str) -> str:
    """Return the inner HTML of <body>, minus navigation and footer chrome."""
    match = re.search(r"<body\b[^>]*>(.*?)</body\s*>", document, re.IGNORECASE | re.DOTALL)
    body = match.group(1) if match else document
    # Navigation and footers repeat on every page; llms.txt already lists the
    # site structure, so keep the page-specific content only.
    body = re.sub(r"<nav\b[^>]*>.*?</nav\s*>", " ", body, flags=re.IGNORECASE | re.DOTALL)
    body = re.sub(
        r"<footer\b[^>]*>.*?</footer\s*>", " ", body, flags=re.IGNORECASE | re.DOTALL
    )
    return body


def page_sections() -> list[tuple[str, str]]:
    """Yield (heading, text) for each page and each documentation route."""
    sections: list[tuple[str, str]] = []

    for filename, heading in PAGES:
        path = os.path.join(ROOT, filename)
        if not os.path.exists(path):
            print(f"warning: {filename} not found, skipping", file=sys.stderr)
            continue
        with open(path, encoding="utf-8") as handle:
            document = handle.read()
        text = strip_tags(extract_body(document))
        if text:
            sections.append((heading, text))

    # The documentation page renders its content from assets/docs-data.js at
    # runtime, so the HTML body alone is nearly empty. Pull the page content
    # straight out of the data file.
    data_path = os.path.join(ROOT, "assets", "docs-data.js")
    if os.path.exists(data_path):
        with open(data_path, encoding="utf-8") as handle:
            data = handle.read()
        for route_id, body in re.findall(
            r"id:\s*'([^']+)'\s*,\s*title:\s*'([^']*)'.*?body:\s*`(.*?)`",
            data,
            re.DOTALL,
        ):
            text = strip_tags(body)
            if text:
                sections.append((f"Documentation — {route_id}", text))

    return sections


def main() -> int:
    sections = page_sections()
    if not sections:
        print("error: no content extracted", file=sys.stderr)
        return 1

    parts = [HEADER]
    for heading, text in sections:
        parts.append(f"\n\n{'=' * 72}\n{heading}\n{'=' * 72}\n\n{text}")

    output = "".join(parts).rstrip() + "\n"
    with open(OUTPUT, "w", encoding="utf-8") as handle:
        handle.write(output)

    print(f"wrote {OUTPUT} ({len(output)} bytes, {len(sections)} sections)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
