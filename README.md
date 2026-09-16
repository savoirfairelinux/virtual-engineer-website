# Virtual Engineer Website

Static site (plain HTML/CSS/JS, no build step) published via GitHub Pages at
https://virtual-engineer.dev/

## Structure

- `index.html` — landing page
- `documentation.html` — documentation page
- `integrations.html` — integrations page
- `security.html` — security page
- `about.html` — about page
- `404.html` — not-found page, served by GitHub Pages for unknown paths
- `robots.txt` and `sitemap.xml` — crawler discovery
- `favicon.ico` and `favicon.svg` — site favicon
- `assets/` — stylesheets, scripts, and images shared across pages

### Agent-readable resources

These files make the site legible to AI agents and answer machine-readable
discovery checks (see https://agentgrade.com/):

- `llms.txt` — content index and operating manual for agents
- `llms-full.txt` — full concatenated text of the site, for non-browsing LLMs
- `agents.txt` — agent access policy (what agents may and may not do here)
- `feed.xml` — RSS feed of site updates
- `.well-known/agent-card.json` — A2A agent card
- `scripts/build-llms-full.py` — regenerates `llms-full.txt` (see below)

## Developing locally

No dependencies or build step are required. Serve the folder with any static
HTTP server from the repo root, for example:

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000 in a browser.

Opening the HTML files directly via `file://` also works for most changes,
but a local server is recommended since some browsers restrict local script
loading over `file://`.

## Deploying

Pushes to `main` are published automatically to GitHub Pages.

The custom domain should have GitHub Pages' **Enforce HTTPS** setting enabled,
which also makes `http://` requests redirect to `https://`.

## Regenerating `llms-full.txt`

`llms-full.txt` is generated, not hand-written. It concatenates the readable
text of every page, plus the documentation content from `assets/docs-data.js`.
After changing page content or documentation data, run:

```sh
python3 scripts/build-llms-full.py
```

The script needs Python 3.8+ and no third-party packages. Commit the regenerated
`llms-full.txt` along with the content change.

## Validating

There is no automated test suite. For a visual smoke check, load every page over
`http://localhost:8000`, exercise navigation and the theme toggle, and check
desktop and mobile layouts. For the agent-readiness checks, scan the published
site:

```sh
curl "https://agentgrade.com/api/scan?url=https://virtual-engineer.dev"
```
