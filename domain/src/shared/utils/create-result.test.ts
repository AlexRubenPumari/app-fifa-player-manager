import { describe, expect, test } from "vitest";
import { createResult } from "./create-result.shared";
import { ApplicationError } from "../../errors";

class TestError extends ApplicationError {}

describe("create-result", () => {
  describe("ok", () => {
    test("should return a success object with ok=true and the value", () => {
      const value = { id: 1, name: "john" };

      const response = createResult.ok(value);

      expect(response).toEqual({
        ok: true,
        value,
      });
    });

    test("should accept primitive values", () => {
      const response = createResult.ok("hello");

      expect(response.ok).toBe(true);
      expect(response.value).toBe("hello");
    });
  });

  describe("error", () => {
    test("should return a failure object with ok=false and the error", () => {
      const error = new TestError("something went wrong");

      const response = createResult.error(error);

      expect(response).toEqual({
        ok: false,
        error,
      });
    });

    test("should preserve the error instance", () => {
      const error = new TestError("test error");

      const response = createResult.error(error);

      expect(response.ok).toBe(false);
      expect(response.error).toBeInstanceOf(TestError);
      expect(response.error.message).toBe("test error");
    });
  });
});