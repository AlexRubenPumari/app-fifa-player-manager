import { createResult, createUseCase } from "../../shared/core";
import { AuthService } from "../../services";

interface LogoutUserDependencies {
  authService: AuthService;
}

type LogoutUserResponse = void;

type LogoutUserRequest = void;

export const logoutUser = createUseCase<
  LogoutUserDependencies,
  LogoutUserRequest,
  LogoutUserResponse,
  never
>({
  isAuthRequired: true,
  handler: async ({ authService }) => {
    authService.logout();

    return createResult.ok();
  }
});
