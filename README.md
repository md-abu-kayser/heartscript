# HeartScript — Love Letter

![Build Status](https://img.shields.io/badge/status-ready-brightgreen.svg) ![License](https://img.shields.io/badge/license-MIT-blue.svg) ![Platform](https://img.shields.io/badge/platform-web-lightgrey.svg)

One-line elevator pitch

HeartScript is a small, elegant, and fast static web experience that lets visitors send playful, animated "love letters" rendered as interactive heart visuals. Built as a single-page, progressive web app (PWA) with minimal assets and an optional service worker for offline access, it ships a delightful front-end demo suitable for portfolios, landing pages, and small campaigns.

Table of contents

- Features
- Demo
- Project structure
- Quick start (run locally)
- PWA & Offline
- Customization
- Contract (inputs / outputs)
- Edge cases & accessibility
- Contributing
- License

## Features

- Tiny, dependency-free front-end (HTML, CSS, vanilla JS).
- Animations and simple forms to create/share a short "love letter".
- Progressive Web App support (service worker in `sw.js`) for basic offline behavior.
- Mobile-friendly, accessible UI with focus/keyboard support.
- Easy to customize visuals from `css/style.css`.

## Live demo

You can try a live demo (if deployed) here: https://<your-username>.github.io/HeartScript-Love-Letter

Replace the placeholder above with your GitHub Pages URL after deployment.

## Project structure

```
index.html        # Single-page UI and markup
css/style.css     # Visual styles and theme tokens
js/script.js      # Interaction, form handling, animations
sw.js             # Optional service-worker for offline caching
LICENSE
README.md
```

## Quick start — run locally (PowerShell)

You only need a static server. From the project root run one of the commands below:

Using Python (if installed):

```powershell
python -m http.server 8000
# Open the site
Start-Process http://localhost:8000
```

Using Node (npx http-server):

```powershell
npx http-server -p 8000
Start-Process http://localhost:8000
```

Or simply open `index.html` in a browser for local previews (note: service worker and PWA features require serving over HTTP/HTTPS or localhost).

## PWA & Offline

`sw.js` includes a basic service-worker registration and caching strategy to allow the demo to work offline for common browsing flows. To test PWA installability:

- Serve the project over `http://localhost` or `https`.
- Open DevTools → Application → Service Workers to inspect and unregister.

Notes:

- For production, expand the cache manifest and implement cache invalidation strategies.

## Customization

Visuals and theme tokens are centralized in `css/style.css`. Suggested edit points:

- Primary color / accent: `--accent` variable.
- Typography: adjust `body` font-family and sizes.
- Heart animation durations and easing are controlled as CSS keyframes and JS timeouts in `js/script.js`.

## Contract (short)

- Inputs: user-provided short message (text), optional sender name, optional styling choices.
- Outputs: an animated heart visual plus sharable/printable representation; data is processed only client-side (no server required by default).
- Error modes: invalid/empty input is validated client-side; messages are retained in-memory unless you add remote storage.

## Edge cases & accessibility

- Empty message: form shows inline validation and prevents submission.
- Large messages: UI constrains visible text and enables scroll/clipboard copy for long content.
- Keyboard navigation: form controls and primary actions are focusable and operable via Enter/Space.
- Reduced motion: respects `prefers-reduced-motion` media query to minimize animations.

Make sure to test on low-resource devices and small viewports.

## Contributing

Contributions are welcome. Small suggestions that improve accessibility, visuals, or add tests are appreciated.

Suggested workflow:

1. Fork the repo.
2. Create a feature branch: `git checkout -b feat/your-feature`.
3. Make changes and run in local server.
4. Submit a PR describing the change and include before/after screenshots if visual.

If you want to add automated deployment, consider adding a GitHub Actions workflow to publish to GitHub Pages.

## Deployment (GitHub Pages)

For a quick deploy to GitHub Pages, you can use `gh-pages` or GitHub Actions. One quick way with `gh-pages` (Node.js required):

```powershell
npx gh-pages -d .
```

This will publish the repository root to `gh-pages` branch. Adjust as needed.

## Security & Privacy

- This project collects no data by default. If you add remote backends, secure them and document how data is handled.

## Tests & Quality gates

- Build: N/A (static site)
- Lint / Typecheck: N/A (vanilla JS/CSS) — consider adding ESLint/Stylelint in future.
- Tests: No automated tests included; adding visual regression tests (Percy/Playwright) is a recommended next step.

#### License

- This project is licensed under the terms of the **[MIT License](./LICENSE)**.
- You may replace or update the license as needed for client or proprietary projects.

---

#### Contact and Maintainer

**Maintainer:** [md-abu-kayser](https://github.com/md-abu-kayser)  
**Name:** Md Abu Kayser - Full-Stack Engineer

- **GitHub:** [github.com/abu.kayser-official](https://github.com/md-abu-kayser)
- **Project:** _*HeartScript*-*Love_letter*_
- **Email:** [abu.kayser.official@gmail.com](mailto:abu.kayser.official@gmail.com)

If you’d like this README tailored for a specific purpose — such as **hiring managers**, **open-source contributors**, or **client deliverables** — feel free to request a custom tone or format.

---

## Credits

Created by the project author.

This project is licensed under the MIT License — see `LICENSE` for details.

---

If you'd like, I can also:

- Add a GitHub Actions workflow to automatically deploy to GitHub Pages on push.
- Add screenshots and an animated GIF to the `docs/` folder and reference them in this README.

If you want me to proceed with either of the above, tell me which and I'll create the necessary files and workflows.

---

Summary: a small, elegant static PWA demo for sharing playful messages; designed to be drop-in to portfolios or landing pages.
