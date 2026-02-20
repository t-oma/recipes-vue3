# AGENTS.md - Backend Codebase Guide

Essential information for agentic coding agents working in this repository.

## Project Overview

REST API for recipes with authentication using Node.js + TypeScript + Express + MongoDB + Mongoose + Zod v4. Package manager: pnpm@10.24.0. ES Modules (`"type": "module"`).

## Build/Lint/Test Commands

```bash
pnpm dev              # Start dev server with hot reload
pnpm start            # Start server without reload
pnpm typecheck        # Run TypeScript type checking (tsc --noEmit)
pnpm build            # Compile TypeScript to dist/
pnpm lint             # Run ESLint on src/
pnpm lint:fix         # Run ESLint with auto-fix
pnpm format           # Check formatting with Prettier
pnpm format:fix       # Format code with Prettier
```

**Note**: No test framework configured. Pre-commit hooks run ESLint + Prettier automatically.

## Code Style Guidelines

### Imports

Sorted by Prettier plugin: built-in → third-party → `@/` alias → relative → types. Use `import type` for type-only imports. Use `import * as` for namespace imports.

```typescript
import express from "express";
import Recipe from "@/models/Recipe";

import { connectDatabase } from "./config/database";
import type { ObjectId } from "mongoose";
```

### Formatting

Print width: 60 chars (break lines frequently). Indentation: 4 spaces. Semicolons: required. Trailing commas: ES5.

### TypeScript

Strict mode with `noUncheckedIndexedAccess`. Handle `undefined` from array/object access. Use optional chaining (`?.`) and nullish coalescing (`??`). Explicit return types for exported functions.

### Path Aliases

Use `@/` prefix for imports from `src/`:

```typescript
import { createError } from "@/middleware/errorHandler";
```

### Naming Conventions

| Element                | Convention           | Example                |
| ---------------------- | -------------------- | ---------------------- |
| Files                  | camelCase            | `recipeService.ts`     |
| Classes/Models         | PascalCase           | `Recipe`, `User`       |
| Interfaces (documents) | `I` prefix           | `IRecipe`, `IUser`     |
| Type aliases           | PascalCase           | `RecipeResponse`       |
| Functions              | camelCase            | `getAll`, `getById`    |
| Constants              | SCREAMING_SNAKE_CASE | `RECIPE_DOCUMENT_NAME` |

### Error Handling

Use `createError` from `@/middleware/errorHandler`:

```typescript
if (!recipe) throw createError("Recipe not found", 404);
```

Controllers use try/catch with next():

```typescript
export const getById = async (req, res, next) => {
    try {
        res.json(
            await recipeService.getById(req.params.id)
        );
    } catch (error) {
        next(error);
    }
};
```

### Validation

Use Zod schemas in `src/schemas/`. Apply with `validate()` middleware:

```typescript
import * as z from "zod/v4";

export const createRecipeSchema = z.object({
    title: z.string().refine((val) => val.length >= 3, {
        error: "Too short!",
    }),
});
// router.post("/", validate(createRecipeSchema), controller.create);
```

### Middleware Pattern

Export const functions with explicit `: void` return type. Call `next()` on success or send response on error.

### Service Layer

Export async functions with explicit return types and response interfaces:

```typescript
export interface RecipeResponse {
    id: string;
    title: string;
}
export const getById = async (
    id: string
): Promise<RecipeResponse> => {
    /* ... */
};
```

### Database Models

Define types with `Prettify<T>` from `@/types/utility`. Export model with `RECIPE_DOCUMENT_NAME`:

```typescript
export type IRecipe = Prettify<{ title: string } & MongoID>;
const recipeSchema = new Schema<IRecipe>({
    /* ... */
});
export default model<IRecipe>(
    RECIPE_DOCUMENT_NAME,
    recipeSchema
);
```

### Type Guards

Use type guards for runtime checks:

```typescript
export function isUser(author: unknown): author is IUser {
    return (
        typeof author === "object" &&
        author !== null &&
        "_id" in author
    );
}
```

## Project Structure

```
src/
├── app.ts              # Express app entry point
├── config/             # Configuration (database)
├── controllers/        # Route handlers
├── middleware/         # auth, validate, errorHandler
├── models/             # Mongoose models and types
├── routes/             # Express routers
├── schemas/            # Zod validation schemas
├── services/           # Business logic layer
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## Environment Variables

Required: `JWT_SECRET`, `PORT` (default: 3000), `NODE_ENV`, `MONGODB_URI`

## Before Committing

Always run: `pnpm typecheck && pnpm lint`
