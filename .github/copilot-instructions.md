# Copilot Instructions

## Project

- This repository is a static GitHub Pages site for Voices of Democracy; keep changes compatible with static hosting.
- The site uses semantic HTML, CSS, and vanilla JavaScript. There is no package manager, build step, or test suite configured.
- The home page is `index.html`; `app.js` renders and filters the story catalog in the `STORIES` array, and `style.css` contains shared responsive styles and design tokens.
- Published articles live in `posts/` and link back to the home page with relative paths. When adding an article, add its metadata and relative URL to `STORIES` in `app.js`.
- `script.js` contains quote and poll interactions but is not loaded by `index.html`. Check page script references before changing it or assuming it runs on the home page.

## Implementation

- Preserve the existing lightweight, dependency-free architecture; do not add frameworks, packages, or build tooling unless requested.
- Follow the existing two-space indentation and browser-native DOM APIs. Keep story content as data in `STORIES`, and use `textContent` for user-facing text.
- Put shared presentation in `style.css`; retain the existing CSS custom properties and responsive breakpoints. Avoid adding new page-specific inline styles.
- Use relative asset and page links so the site works when hosted from a GitHub Pages subpath.
- Preserve semantic markup, keyboard focus visibility, responsive layouts, and meaningful image `alt` text.
- Keep publication copy accessible and nonpartisan. Verify factual claims and cite reliable sources in article content.

## Validation

- No automated build or test command is configured. For changes, inspect affected pages in a browser at desktop and mobile widths, and check links, images, and interactive behavior.
- If changing story metadata or article paths, confirm every catalog URL resolves and category names match the filters in `index.html`.
- Use `.github/agents/javascript-pr-reviewer.agent.md` for a read-only review of JavaScript pull request changes; invoke it with the PR diff or changed-file context.
