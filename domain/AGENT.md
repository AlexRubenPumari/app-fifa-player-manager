# Project Development Standards and Guidelines

This document contains instructions for generating Use Cases and Unit Tests. Follow these rules strictly.

---

## SECTION 1: Use Case Generation

### 1. File Naming and Location

* **Format:** Lowercase with dashes (kebab-case). Example: `get-player-by-id.use-case.ts` (or matching your current directory naming convention).
* **Utilities Import:** Prefer importing shared helpers from the shared utilities module:

  ```typescript
  import { createUseCase, createResult, schema } from "../../shared/utils";
  ```

### 2. Structure and Typing Order

Every Use Case file must follow this exact order:

1. **Dependencies Interface:** Named `[UseCaseName]Dependencies`. It must type all injected repositories or services.
2. **Response Type or Interface:** Named `[UseCaseName]Response`.

   * Use a `type` alias when the response is simple or directly maps to an existing entity/value.
   * Use an `interface` when the response is a structured object with multiple fields.
3. **Exported Use Case:** Export a constant using `createUseCase` passing the required generics:

$$
\text{createUseCase}<\text{Dependencies}, \text{ResponseType}, \text{ErrorTypes}>()(...)
$$

### 3. Implementation Rules

* **Authentication:** Explicitly set `isAuthRequired` as a boolean.
* **Handler Arguments:**

  * First argument: destructured dependencies.
  * Second argument: validated and transformed request inferred from `requestShape`.
* **Request Access:**

  * Prefer destructuring validated request fields directly in the handler argument whenever possible.
  * Use a named `request` object only when it improves readability.
* **Return Values:** Never return raw data or throw raw domain errors. Always wrap execution flows using:

  * `createResult.ok(value)` for success.
  * `createResult.error(new CustomError())` for expected domain failures.

---

## SECTION 2: Unit Test Generation

### 1. Tech Stack & Location

* **Tools:** Always use TypeScript and `vitest` (import `describe`, `test`, `expect`, `vi`).
* **Utilities Import:** Prefer importing shared utilities from the shared module:

  ```typescript
  import { schema } from "../../shared/utils";
  ```
* **Location:** Test files must be created at the same level (same directory) as the file being tested.
* **Naming Convention:** The test file must strictly follow the `[filename].test.ts` format.

### 2. Block Structure (`describe` and `test`)

* **Root Level:** The root `describe` block must match exactly the name of the file or main function under test (e.g., `describe("create-result", () => { ... })`).
* **Nesting:**

  * **Single/Pure Functions:** Do not use extra nesting. `test` blocks should be placed directly inside the root `describe`.
  * **Classes or Objects with multiple methods/properties:** You must group them using nested `describe` blocks named after the method or property (e.g., `describe("any-method", () => { ... })`, `describe("any-other-method", () => { ... })`).
* **Test Syntax:** Always use `test(...)`. Never use `it(...)`.

### 3. Test Label Semantics and Formatting

* All `test` labels must obligatorily start with the prefix `"should..."`.
* Any mention of fields, types, properties, specific values, or booleans within the label must be wrapped in single quotes (e.g., `'isAuthRequired'`, `'ok=true'`, `'DomainError'`).

### 4. Mocking Rules and Test Data

* **String Mocks:** All strings used as test data (mocks, names, inputs) must always be written in lowercase (e.g., use `"john"` or `"success"`, never `"John"` or `"Success"`), unless the test explicitly requires evaluating uppercase mutations.
* **Mock Functions:** Use `vi.fn()` for spies and dependency mocking.
* **Type Assertions in Mocks:** If forcing types is necessary to simulate empty dependencies or specific calls, use TypeScript assertions like `{} as never` or `as any` surgically.

### 5. Coverage and Edge Cases

* Design the test suite to cover as many branches as possible (aim for high coverage).
* It is mandatory to test:

  * Success scenarios.
  * Validation failures.
  * Custom error propagation (`DomainError`).
  * Request transformations.
  * Dependency invocation with correct arguments.
  * Early exits when validation fails.

---

# Reference Examples

## Example 1: Use Case Standard Structure

```typescript
import { PlayerNotFoundError } from "../../errors";
import { PlayerRepository } from "../../repositories";
import { Player } from "../../entities";
import { createUseCase, createResult, schema } from "../../shared/utils";

interface GetPlayerByIdDependencies {
  playerRepository: PlayerRepository;
}

type GetPlayerByIdResponse = Player;

export const getPlayerByIdUseCase = createUseCase<
  GetPlayerByIdDependencies,
  GetPlayerByIdResponse,
  PlayerNotFoundError
>()({
  isAuthRequired: true,
  requestShape: {
    id: schema.number(),
  },
  handler: async ({ playerRepository }, { id }) => {
    const player = await playerRepository.findOne({ id });

    if (!player) {
      return createResult.error(new PlayerNotFoundError());
    }

    return createResult.ok(player);
  },
});
```

## Example 2: Structured Response Interface

```typescript
interface GetPlayerProfileResponse {
  player: Player;
  team: Team;
  stats: PlayerStats;
}
```

## Example 3: Single Function Test (Flat Structure)

```typescript
import { describe, test, expect, vi } from "vitest";
import { createUseCase, schema } from "../../shared/utils";

describe("create-use-case", () => {
  test("should expose the 'isAuthRequired' property", () => {
    const useCase = createUseCase()({
      isAuthRequired: true,
      requestShape: {
        name: schema.string(),
      },
      handler: vi.fn(),
    });

    expect(useCase.isAuthRequired).toBe(true);
  });

  test("should execute handler with validated request", async () => {
    const handler = vi.fn().mockResolvedValue({
      ok: true,
      value: "success",
    });

    const useCase = createUseCase()({
      isAuthRequired: false,
      requestShape: {
        name: schema.string(),
      },
      handler,
    });

    const result = await useCase.execute(
      {} as never,
      { name: "john" },
    );

    expect(result).toEqual({
      ok: true,
      value: "success",
    });

    expect(handler).toHaveBeenCalledWith(
      {} as never,
      { name: "john" },
    );
  });
});
```

## Example 4: Object/Class with Methods Test (Nested Structure)

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

      expect(response).toEqual({
        ok: true,
        value,
      });
    });
  });

  describe("error", () => {
    test("should return a failure object with 'ok=false' and the error", () => {
      const error = new TestError("something went wrong");

      const response = createResult.error(error);

      expect(response).toEqual({
        ok: false,
        error,
      });
    });
  });
});
```
