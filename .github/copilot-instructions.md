# Virtual Engineer Website Development Guide

## Project
This is a static website built with plain HTML, CSS, and vanilla JavaScript. The public site is `https://virtual-engineer.dev/`; the custom domain is defined in [CNAME](../CNAME). There is no package manifest, build step, test runner, or linter in this repository.

The public pages are [index.html](../index.html), [documentation.html](../documentation.html), [integrations.html](../integrations.html), and [security.html](../security.html). Shared styles, scripts, and image assets live in [assets/](../assets/). Keep asset references relative because GitHub Pages serves this directory as the site root.

## Development
From the repository root, serve the site over HTTP:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000`. A browser smoke check is the available validation path: load all four pages, exercise navigation/theme controls, and check desktop and mobile layouts. No automated test or lint command is currently configured. See [README.md](../README.md) for the deployment and local-serving baseline.

## Ownership
- [assets/styles.css](../assets/styles.css) defines design tokens, fonts, global primitives, and dark/light theme variables. Dark mode is the default; light mode uses `html[data-theme="light"]`.
- [assets/site.css](../assets/site.css) owns shared page layout, responsive grids, navigation, animations, and `ve-*` component styles.
- [assets/site.js](../assets/site.js) owns theme persistence, smooth scrolling, sticky navigation/progress, reveal/count-up effects, magnetic and tilt interactions, pipeline state cycling, and reduced-motion handling.
- [assets/docs.css](../assets/docs.css) styles the documentation surface. [assets/docs.js](../assets/docs.js) owns hash routing and rendering, while [assets/docs-data.js](../assets/docs-data.js) is the source of documentation navigation and page content.

## Conventions
- Reuse existing `ve-*` classes and CSS variables. Put new shared or page-specific styling in the appropriate stylesheet instead of adding large inline style blocks.
- Preserve the existing responsive breakpoints around `1039px` and `679px`, semantic HTML structure, and relative asset paths.
- Preserve both CSS and JavaScript reduced-motion behavior when adding animation or scroll effects.
- Documentation routes are hash-based, such as `documentation.html#/start`. When changing a route or page ID, update the related section metadata, links, and content in [assets/docs-data.js](../assets/docs-data.js).
- The documentation page's "Edit source" link targets the upstream application repository. Website documentation content itself is edited in [assets/docs-data.js](../assets/docs-data.js).
- For visual fixes, inspect the complete page at desktop and mobile sizes, not only the first viewport. Verify grid gaps, card/row heights, and alignment together; also check that provider icons remain visible in both themes.

## Deployment
Pushes to `main` are documented as publishing through GitHub Pages; the exact Pages configuration is not stored in this repository. Do not change [CNAME](../CNAME), canonical URLs, [robots.txt](../robots.txt), or [sitemap.xml](../sitemap.xml) without considering the custom-domain setup. For redirect-loop problems, inspect GitHub Pages custom-domain/HTTPS settings and DNS records before changing application HTML or JavaScript.