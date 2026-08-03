# Carlos Aragon — Portfolio

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router) with [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/) with [daisyUI](https://daisyui.com/)
- [Biome](https://biomejs.dev/) for linting and formatting
- [pnpm](https://pnpm.io/) as the package manager
- [react-icons](https://react-icons.github.io/react-icons/)

## Getting Started

### Prerequisites

- Node.js 20.9+ (or the version required by your Next.js setup)
- [pnpm](https://pnpm.io/installation)

### Installation

```bash
pnpm install
```

### Development

Start the development server with hot reload:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production

Build and start the production server:

```bash
pnpm build
pnpm start
```

## Quality Tooling

All quality checks are powered by [Biome](https://biomejs.dev/):

| Command       | Description                    |
| ------------- | ------------------------------ |
| `pnpm lint`   | Run linting checks             |
| `pnpm format` | Format source files            |
| `pnpm check`  | Run lint + format + import sort |

## Project Structure

```
src/
├── app/          # Next.js App Router (pages, layout, global styles)
├── components/
│   ├── layout/   # Layout components (header, footer, hero, projects, etc.)
│   └── ui/       # Reusable UI components (project card, tech icons, etc.)
├── data/         # Site config and projects data
└── utils/        # Shared utilities (e.g. Tailwind class merging)
```

## Customization

Your name, role, and site-wide configuration live in
`src/data/config-data.ts`. Your projects live in `src/data/projects-data.ts`.

## License

[MIT](LICENSE)