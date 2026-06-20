# Agents Guide

This repository is a Docusaurus documentation site named `venus`. It uses pnpm, Docusaurus 3.10, React 19, Tailwind CSS v4, local search, French i18n, Renovate, and Docker/Nginx for production serving.

## Project Snapshot

- `package.json` defines the app scripts. Use `pnpm`, not npm or yarn.
- `docusaurus.config.ts` is the main site configuration: title, URL, navbar, footer, docs/blog presets, i18n, local search theme, Tailwind plugin, Docusaurus future flags, and Prism themes.
- `sidebars.ts` autogenerates the docs sidebar from `docs/`.
- `tsconfig.json` extends `@docusaurus/tsconfig`.
- `src/plugins/tailwind.cjs` wires Tailwind v4 into Docusaurus PostCSS.
- `src/pages/` contains custom pages, including the homepage.
- `src/components/` contains reusable React components.
- `src/css/custom.css` contains global Infima variable overrides and Tailwind directives.
- `docs/`, `blog/`, and `i18n/fr/` contain content and translations.
- `.docker/`, `Dockerfile`, and `docker-compose-*.yml` define production image build and Nginx serving.
- `.github/workflows/`, `.gitlab-ci.yml`, and `renovate.json` define CI build, audit, release verification, dependency grouping, Docker image publishing, scanning, and deploy flows.

## Required Tooling

- Node.js `>=20.0`; CI currently uses Node `22`.
- pnpm. The GitHub workflow uses pnpm `10`.
- Docker is only required for image/build/deploy work.

Install dependencies with:

```bash
pnpm install --frozen-lockfile
```

## Common Commands

Run these from the repository root:

```bash
pnpm start
pnpm build
pnpm serve
pnpm run start --locale fr
pnpm run write-translations --locale fr
```

Docker commands:

```bash
docker compose -f docker-compose-local.yml up --build -d
docker compose -f docker-compose-build.yml build website_ui
```

## Validation Expectations

Before handing off changes that affect source, config, content, translations, or Docker build behavior, run:

```bash
pnpm build
```

The build compiles both configured locales, `en` and `fr`. Current build output may warn that `onBrokenMarkdownLinks` is deprecated for Docusaurus v4, or that Browserslist/baseline-browser-mapping data is outdated; those warnings are maintenance noise unless the task is config or dependency maintenance.

For dependency or supply-chain changes, also run:

```bash
pnpm audit --audit-level=critical
```

## Coding Conventions

- Prefer the existing Docusaurus/React style: ES modules, JSX, functional components, and CSS modules for component/page-scoped CSS.
- Keep Docusaurus config in `docusaurus.config.ts`; do not move site metadata into ad hoc files.
- Keep sidebar behavior in `sidebars.ts` unless the task explicitly requires manual navigation.
- Use `@site/...` aliases for project-root imports where existing files already do.
- Use `clsx` for conditional class composition.
- Preserve Tailwind's integration through `src/plugins/tailwind.cjs` and `@tailwindcss/postcss`.
- Tailwind v4 is CSS-first. Do not reintroduce `tailwind.config.js` unless there is a concrete need.
- Keep `future.v4.useCssCascadeLayers` disabled unless Docusaurus and Tailwind cascade layers are verified together.
- Keep edits narrowly scoped. Avoid broad template cleanup unless the user asks for it.

## Content And I18n

- Docs live in `docs/`; blog posts live in `blog/`.
- The site supports `en` and `fr`; default locale is `en`.
- When adding user-visible UI text in React pages/components, wrap translatable text with Docusaurus `<Translate>` where appropriate.
- When adding or changing docs/blog content, consider whether `i18n/fr/` also needs updates.
- The local search package is registered under `themes`, indexes docs, supports `en` and `fr`, and does not index standalone pages.

## Styling Notes

- Global theme variables are in `src/css/custom.css`.
- Component/page-specific styles should use `*.module.css`.
- The project uses Docusaurus Infima classes such as `hero`, `container`, `row`, and `button` alongside custom CSS and Tailwind utilities.
- Preserve dark-mode compatibility by using Docusaurus theme variables or `[data-theme='dark']` overrides when adding global colors.

## Docker And Deployment

- `Dockerfile` builds the Docusaurus site with pnpm and serves `build/` from Nginx.
- Runtime Nginx config is in `.docker/nginx/default.conf`.
- `.docker/nginx/docker-entrypoint.sh` applies environment substitution to `config*.js`, `env*.js`, and `index.html` before starting Nginx.
- GitHub Actions validates with install, critical audit, and build before publishing `ayoub3bidi/venus:latest`; releases also build before creating a GitHub release.
- GitLab CI uses `ci/compute-env.sh`, `ci/deliver.sh`, `ci/scan.sh`, and `ci/deploy.sh` for registry delivery, Trivy scanning, and deployment.
- Renovate groups Docusaurus, Tailwind, React, Docker, and GitHub Actions updates to avoid incompatible split upgrades.

## Known Caveats

- `README.md` references `./static/img/venus.png`, but the README now uses `logo.svg`.
- `src/plugins/local-search.cjs` holds the search theme config; `solar.manifest.yaml` removes it when search is disabled via `sun`.
- Post-scaffold `editUrl` paths are rewritten by `solar.manifest.yaml` when using `sun create`.
- The repository has no dedicated test suite or source linter at the moment; `pnpm build` is the primary validation command.
- Generated folders such as `node_modules/`, `build/`, and `.docusaurus/` are ignored and should not be committed.

## Agent Workflow

1. Start by checking `git status --short` and avoid overwriting unrelated user changes.
2. Inspect relevant files before editing; prefer `rg` and `rg --files` for searches.
3. Use `apply_patch` for manual file edits.
4. Keep dependency changes lockfile-backed and explain why they are necessary.
5. Run `pnpm build` after meaningful changes.
6. Summarize changed files, validation performed, and any remaining caveats in the final response.
