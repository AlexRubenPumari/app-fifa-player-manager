import { describe, test, expect, vi } from "vitest";
import { createUseCase } from "./create-use-case.shared.js";
import { DomainError } from "../../../errors/index.js";
import { schema } from "../utils/schema/index.js";

class TestError extends DomainError {
  readonly type = "DOMAIN" as const;
}

describe("create-use-case", () => {
  test("should expose the auth requirement flag", () => {
    const useCase = createUseCase({
      isAuthRequired: true,
      requestSchema: { name: schema.string() },
      handler: vi.fn(),
    });

    expect(useCase.isAuthRequired).toBe(true);
  });

  test("should execute handler with validated request", async () => {
    const handler = vi.fn().mockResolvedValue({ ok: true, value: "success" });

    const useCase = createUseCase({
      isAuthRequired: false,
      requestSchema: { name: schema.string() },
      handler,
    });

    const result = await useCase.execute({} as never, { name: "john" });

    expect(result).toEqual({
      ok: true,
      value: "success",
    });
    expect(handler).toHaveBeenCalledWith({} as never, { name: "john" });
  });

  test("should return error when request validation fails", async () => {
    const handler = vi.fn();

    const useCase = createUseCase({
      isAuthRequired: false,
      requestSchema: { name: schema.string() },
      handler,
    });

    const result = await useCase.execute({} as never, { name: 123 } as any);

    expect(result.ok).toBe(false);
    expect(handler).not.toHaveBeenCalled();
  });

  test("should propagate successful handler result", async () => {
    const handler = vi.fn().mockResolvedValue({
      ok: true,
      value: { id: 1, name: "user" },
    });

    const useCase = createUseCase({
      isAuthRequired: false,
      requestSchema: { id: schema.number() },
      handler,
    });

    const result = await useCase.execute({} as never, { id: 1 });

    expect(result).toEqual({
      ok: true,
      value: { id: 1, name: "user" },
    });
  });

  test("should propagate failed handler result", async () => {
    const error = new TestError("handler failed");
    const handler = vi.fn().mockResolvedValue({
      ok: false,
      error,
    });

    const useCase = createUseCase({
      isAuthRequired: false,
      requestSchema: { id: schema.number() },
      handler,
    });

    const result = await useCase.execute({} as never, { id: 1 });

    expect(result).toEqual({
      ok: false,
      error,
    });
  });

  test("should pass dependencies to handler", async () => {
    const dependencies = { repository: { find: vi.fn() } };
    const handler = vi.fn().mockResolvedValue({ ok: true, value: "success" });

    const useCase = createUseCase({
      isAuthRequired: false,
      requestSchema: { id: schema.number() },
      handler,
    });

    await useCase.execute(dependencies, { id: 1 });

    expect(handler).toHaveBeenCalledWith(dependencies, { id: 1 });
  });
});
