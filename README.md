# Virtual Engineer Website

Static site (plain HTML/CSS/JS, no build step) published via GitHub Pages at
https://savoirfairelinux.github.io/virtual-engineer-website/

## Structure

- `index.html` — landing page
- `documentation.html` — documentation page
- `integrations.html` — integrations page
- `security.html` — security page
- `assets/` — stylesheets, scripts, and images shared across pages

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
