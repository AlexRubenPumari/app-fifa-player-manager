import { z as schema } from "zod";
import { createResult, createUseCase } from "../../shared/core/utils";
import { SafeUser } from "../../shared/users";
import { AuthService } from "../../services";
import { SessionNotFoundError } from "../../errors";

interface GetCurrentUserDependencies {
  authService: AuthService;
}

type GetCurrentUserResponse = SafeUser;

type GetCurrentUserRequest = void;

export const getCurrentUser = createUseCase<
  GetCurrentUserDependencies,
  GetCurrentUserRequest,
  GetCurrentUserResponse,
  SessionNotFoundError
>({
  isAuthRequired: false,
  handler: async ({ authService }) => {
    const user = authService.getCurrentUser();

    if (!user) return createResult.error(new SessionNotFoundError());

    return createResult.ok(user);
  }
});
