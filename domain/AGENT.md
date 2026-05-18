# Project Development Standards and Guidelines

This document contains instructions for generating Use Cases and Unit Tests. Follow these rules strictly.

---

## SECTION 1: Use Case Generation

### 1. File Naming and Location
*   **Format:** Lowercase with dashes (kebab-case). Example: `get-player-by-id.use-case.ts` (or matching your current directory naming convention).
*   **Zod Alias:** Always import and alias Zod as `schema`: `import { z as schema } from "zod";`.

### 2. Structure and Typing Order
Every Use Case file must follow this exact order:

1.  **Dependencies Interface:** Named `[UseCaseName]Dependencies`. It must type all injected repositories or services.
2.  **Response Type:** Named `[UseCaseName]Response`. It types the successful value payload.
3.  **Zod Request Schema:** Named `[useCaseName]Schema` (camelCase).
4.  **Schema Type Inference:** Named `[UseCaseName]Schema` (PascalCase), using `typeof [useCaseName]Schema`.
5.  **Exported Use Case:** Export a constant using `createUseCase` passing the 4 required generics:
    $$\text{createUseCase}<\text{Dependencies}, \text{SchemaType}, \text{ResponseType}, \text{ErrorTypes}>$$

### 3. Implementation Rules
*   **Authentication:** Explicitly set `isAuthRequired` as a boolean.
*   **Handler Arguments:** Destructure dependencies in the first argument, and validated request data in the second argument.
*   **Return Values:** Never return raw data or throw raw domain errors. Always wrap execution flows using:
    *   `createResult.ok(value)` for success.
    *   `createResult.error(new CustomError())` for expected domain failures.

---

## SECTION 2: Unit Test Generation

### 1. Tech Stack & Location
*   **Tools:** Always use TypeScript and `vitest` (import `describe`, `test`, `expect`, `vi`).
*   **Validation Library:** Use `zod` aliased as `schema` (`import { z as schema } from "zod";`).
*   **Location:** Test files must be created at the same level (same directory) as the file being tested.
*   **Naming Convention:** The test file must strictly follow the `[filename].test.ts` format.

### 2. Block Structure (`describe` and `test`)
*   **Root Level:** The root `describe` block must match exactly the name of the file or main function under test (e.g., `describe("create-result", () => { ... })`).
*   **Nesting:**
    *   **Single/Pure Functions:** Do not use extra nesting. `test` blocks should be placed directly inside the root `describe`.
    *   **Classes or Objects with multiple methods/properties:** You **must** group them using nested `describe` blocks named after the method or property (e.g., `describe("any-method", () => { ... })`, `describe("any-other-method", () => { ... })`).
*   **Test Syntax:** Always use `test(...)`. **Never** use `it(...)`.

### 3. Test Label Semantics and Formatting
*   All `test` labels must obligatorily start with the prefix `"should..."`.
*   Any mention of fields, types, properties, specific values, or booleans within the label must be wrapped in **single quotes** (e.g., `'isAuthRequired'`, `'ok=true'`, `'DomainError'`).

### 4. Mocking Rules and Test Data
*   **String Mocks:** All strings used as test data (mocks, names, inputs) must **always be written in lowercase** (e.g., use `"john"` or `"success"`, never `"John"` or `"Success"`), unless the test explicitly requires evaluating uppercase mutations.
*   **Mock Functions:** Use `vi.fn()` for spies and dependency mocking.
*   **Type Assertions in Mocks:** If forcing types is necessary to simulate empty dependencies or specific calls, use TypeScript assertions like `{} as never` or `as any` surgically.

### 5. Coverage and Edge Cases
*   Design the test suite to cover as many branches as possible (aim for high coverage).
*   It is mandatory to test success scenarios, controlled failures (e.g., Zod validation failures), custom error propagation (`DomainError`), and to assert whether dependency mocks were called or not with the correct arguments.

---

## Reference Examples

### Example 1: Use Case Standard Structure
```typescript
import { z as schema } from "zod";
import { createResult, createUseCase } from "../../shared/utils";
import { PlayerRepository } from "../../repositories";
import { Player } from "../../entities";
import { PlayerNotFoundError } from "../../errors";

interface GetPlayerByIdDependencies {
  playerRepository: PlayerRepository;
}

type GetPlayerByIdResponse = Player;

const getPlayerByIdSchema = schema.object({
  id: schema.number().int().positive("id must be a positive integer"),
});

type GetPlayerByIdSchema = typeof getPlayerByIdSchema;

export const getPlayerById = createUseCase<
  GetPlayerByIdDependencies,
  GetPlayerByIdSchema,
  GetPlayerByIdResponse,
  PlayerNotFoundError
>({
  isAuthRequired: true,
  requestSchema: getPlayerByIdSchema,
  handler: async ({ playerRepository }, { id }) => {
    const player = await playerRepository.findOne({ id });

    if (!player) return createResult.error(new PlayerNotFoundError());

    return createResult.ok(player);
  }
});
```

### Example 2: Single Function Test (Flat Structure)
```typescript
import { describe, test, expect, vi } from "vitest";
import { z as schema } from "zod";
import { createUseCase } from "./create-use-case.shared";

describe("create-use-case", () => {
  test("should create a use case with 'isAuthRequired' property", () => {
    const requestSchema = schema.object({ name: schema.string() });
    const useCase = createUseCase({ isAuthRequired: true, requestSchema, handler: vi.fn() });
    expect(useCase.isAuthRequired).toBe(true);
  });

  test("should return ok with validated data when request is valid", async () => {
    const requestSchema = schema.object({ name: schema.string() });
    const handler = vi.fn().mockResolvedValue({ ok: true, value: "success" });
    const useCase = createUseCase({ isAuthRequired: false, requestSchema, handler });

    const result = await useCase.execute({} as never, { name: "john" });

    expect(result).toEqual({ ok: true, value: "success" });
    expect(handler).toHaveBeenCalledWith({} as never, { name: "john" });
  });
});
```

### Example 3: Object/Class with Methods Test (Nested Structure)
```typescript
import { describe, expect, test } from "vitest";
import { createResult } from "./create-result.shared";
import { DomainError } from "../../errors";

class TestError extends DomainError {
  readonly type = "DOMAIN";
}

describe("create-result", () => {
  describe("ok", () => {
    test("should return a success object with 'ok=true' and the value", () => {
      const value = { id: 1, name: "john" };
      const response = createResult.ok(value);
      expect(response).toEqual({ ok: true, value });
    });
  });

  describe("error", () => {
    test("should return a failure object with 'ok=false' and the error", () => {
      const error = new TestError("something went wrong");
      const response = createResult.error(error);
      expect(response).toEqual({ ok: false, error });
    });
  });
});
```