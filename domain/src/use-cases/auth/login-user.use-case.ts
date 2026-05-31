import type { AuthSession, Email } from "../../shared/index.js";
import type { CryptoService, TokenService } from "../../services/index.js";
import type { UserRepository } from "../../repositories/index.js";
import { createResult, createUseCase, schema } from "../../shared/core/index.js";
import { InvalidCredentialsError, UserNotFoundError } from "../../errors/index.js";

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
    email: schema.string().email(),
    password: schema.string().min(1),
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
