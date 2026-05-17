import { describe, test, expect, vi } from "vitest";
import { z as schema } from "zod";
import { createUseCase } from "./create-use-case.shared";
import { DomainError } from "../../errors";

class TestError extends DomainError {
  readonly type = "DOMAIN" as const;
}

describe("create-use-case", () => {
  test("should create a use case with 'isAuthRequired' property", () => {
    const requestSchema = schema.object({ name: schema.string() });

    const useCase = createUseCase({
      isAuthRequired: true,
      requestSchema,
      handler: vi.fn(),
    });

    expect(useCase.isAuthRequired).toBe(true);
  });

  test("should return ok with validated data when request is valid", async () => {
    const requestSchema = schema.object({ name: schema.string() });
    const handler = vi.fn().mockResolvedValue({ ok: true, value: "success" });

    const useCase = createUseCase({
      isAuthRequired: false,
      requestSchema,
      handler,
    });

    const result = await useCase.execute({} as never, { name: "John" });

    expect(result).toEqual({
      ok: true,
      value: "success",
    });
    expect(handler).toHaveBeenCalledWith({} as never, { name: "John" });
  });

  test("should return error when request validation fails", async () => {
    const requestSchema = schema.object({ name: schema.string() });
    const handler = vi.fn();

    const useCase = createUseCase({
      isAuthRequired: false,
      requestSchema,
      handler,
    });

    const result = await useCase.execute({} as never, { name: 123 } as any);

    expect(result.ok).toBe(false);
    expect(handler).not.toHaveBeenCalled();
  });

  test("should pass validated data to handler instead of raw request", async () => {
    const requestSchema = schema.object({
      name: schema.string().transform((val) => val.toUpperCase()),
    });
    const handler = vi.fn().mockResolvedValue({ ok: true, value: "processed" });

    const useCase = createUseCase({
      isAuthRequired: false,
      requestSchema,
      handler,
    });

    await useCase.execute({} as never, { name: "john" });

    expect(handler).toHaveBeenCalledWith({} as never, { name: "JOHN" });
  });

  test("should return handler result when handler succeeds", async () => {
    const requestSchema = schema.object({ id: schema.number() });
    const handler = vi.fn().mockResolvedValue({
      ok: true,
      value: { id: 1, name: "user" },
    });

    const useCase = createUseCase({
      isAuthRequired: false,
      requestSchema,
      handler,
    });

    const result = await useCase.execute({} as never, { id: 1 });

    expect(result).toEqual({
      ok: true,
      value: { id: 1, name: "user" },
    });
  });

  test("should return handler error when handler fails", async () => {
    const requestSchema = schema.object({ id: schema.number() });
    const error = new TestError("handler failed");
    const handler = vi.fn().mockResolvedValue({
      ok: false,
      error,
    });

    const useCase = createUseCase({
      isAuthRequired: false,
      requestSchema,
      handler,
    });

    const result = await useCase.execute({} as never, { id: 1 });

    expect(result).toEqual({
      ok: false,
      error,
    });
  });

  test("should pass dependencies to handler", async () => {
    const requestSchema = schema.object({ id: schema.number() });
    const dependencies = { repository: { find: vi.fn() } };
    const handler = vi.fn().mockResolvedValue({ ok: true, value: "success" });

    const useCase = createUseCase({
      isAuthRequired: false,
      requestSchema,
      handler,
    });

    await useCase.execute(dependencies, { id: 1 });

    expect(handler).toHaveBeenCalledWith(dependencies, { id: 1 });
  });
});
