# AGENTS.md - AI Coding Assistant Guidelines

## Project Overview

Vue 3 + TypeScript SPA with Vite, Pinia, Vue Router, and Tailwind CSS.

## Build/Test/Lint Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Type-check + build for production
pnpm preview          # Preview production build

# Testing
pnpm test:unit        # Run all Vitest unit tests
pnpm test:unit -- --run src/path/to/file.spec.ts   # Run single test file
pnpm test:e2e         # Run Playwright E2E tests

# Linting & Formatting
pnpm lint             # Run all linters (oxlint + eslint)
pnpm lint:check       # Check without fixing
pnpm lint:fix         # Run linters with auto-fix
pnpm format           # Format with Prettier

# Type Checking
pnpm type-check       # Run TypeScript checks only
pnpm build-only       # Build without type-checking
```

## Code Style Guidelines

### TypeScript & Vue

- Use `<script setup lang="ts">` for all Vue components
- Define props with `type Props = {...}` + `withDefaults(defineProps<Props>(), {...})`
- Prefer explicit types over `any`
- Use `as const` for constant objects

### Imports

Order (enforced by Prettier):

1. Vue imports
2. Built-in modules
3. Third-party modules
4. `@/` aliases
5. Relative imports
6. Type imports (grouped separately)

### Formatting

- **Indent**: 2 spaces
- **Quotes**: Double quotes
- **Semicolons**: Required
- **Print width**: 60 characters
- **Max line length**: 100 characters (EditorConfig)
- **Line endings**: LF

### Naming Conventions

- **Components**: PascalCase (e.g., `AtomButton.vue`, `MoleculeCard.vue`)
- **Files**: PascalCase for components, camelCase for utilities
- **Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE or `as const`
- **Types/Interfaces**: PascalCase

### Component Architecture

Follow Atomic Design methodology:

- `atoms/` - Basic building blocks (buttons, inputs)
- `molecules/` - Groups of atoms (cards, forms)
- `views/` - Page-level components

### Styling

- Use Tailwind CSS utility classes
- Classes are auto-sorted by Prettier
- Custom variants defined as `const variants = { ... } as const`

### Error Handling

- Use strict TypeScript checks (`strict: true`)
- Handle undefined/null explicitly
- Use optional chaining (`?.`) and nullish coalescing (`??`)

### Testing

- **Unit**: Vitest + Vue Test Utils
- Test files: `__tests__/*.spec.ts`
- Use `mount()` from `@vue/test-utils`
- E2E: Playwright tests in `e2e/` directory

## Project Structure

```
src/
├── app/              # App-level (layouts, router)
├── modules/          # Feature modules
│   └── [feature]/
│       ├── components/
│       │   ├── atoms/
│       │   ├── molecules/
│       │   └── __tests__/
│       ├── models/   # Types/interfaces
│       └── views/    # Page views
├── shared/           # Shared code
│   ├── components/
│   ├── stores/       # Pinia stores
│   └── utils/        # Utilities
└── assets/           # Static assets
```

## Aliases

- `@/` maps to `./src/`
- Use for all imports from src/

## Node Version

Requires Node.js `^20.19.0 || >=22.12.0`
