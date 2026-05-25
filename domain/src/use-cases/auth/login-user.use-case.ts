import { createResult, createUseCase, schema } from "../../shared/core";
import { AuthSession, AuthCredentials } from "../../shared/auth";
import { AuthService } from "../../services";
import { InvalidCredentialsError } from "../../errors";

interface LoginUserDependencies {
  authService: AuthService;
}

type LoginUserResponse = AuthSession;

type LoginUserRequest = AuthCredentials;

export const loginUser = createUseCase<
  LoginUserDependencies,
  LoginUserRequest,
  LoginUserResponse,
  InvalidCredentialsError
>({
  isAuthRequired: false,
  requestSchema: {
    username: schema.string().min(1, "username is required"),
    password: schema.string().min(1, "password is required"),
  },
  handler: async ({ authService }, { username, password }) => {
    const session = await authService.login({ username, password });

    if (!session) return createResult.error(new InvalidCredentialsError());

    return createResult.ok(session);
  }
});
