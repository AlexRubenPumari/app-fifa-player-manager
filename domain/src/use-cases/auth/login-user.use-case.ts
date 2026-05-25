import { createResult, createUseCase, Email, schema } from "../../shared/core";
import { AuthSession } from "../../shared/auth";
import { CryptoService, TokenService } from "../../services";
import { InvalidCredentialsError, UserNotFoundError } from "../../errors";
import { UserRepository } from "../../repositories";

interface LoginUserDependencies {
  userRepository: UserRepository
  tokenService: TokenService;
  cryptoService: CryptoService;
}

type LoginUserResponse = AuthSession;

type LoginUserRequest = {
  email: Email;
  password: string;
};

export const loginUser = createUseCase<
  LoginUserDependencies,
  LoginUserRequest,
  LoginUserResponse,
  InvalidCredentialsError | UserNotFoundError
>({
  isAuthRequired: false,
  requestSchema: {
    email: schema.email("invalid email format"),
    password: schema.string().min(1, "password is required"),
  },
  handler: async ({ tokenService, cryptoService, userRepository }, { email, password }) => {
    const user = await userRepository.findOne({ where: { email } });

    if (!user) return createResult.error(new UserNotFoundError());

    const isValidPassword = await cryptoService.verify(password, user.passwordHash);

    if (!isValidPassword) return createResult.error(new InvalidCredentialsError());

    const accessToken = await tokenService.signAccessToken({ userId: user.id, email: user.email });

    return createResult.ok<LoginUserResponse>({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      accessToken,
    });
  }
});
