import type { Email, AuthSession } from "../../shared/index.js";
import type { UserRepository } from "../../repositories/index.js";
import type { CryptoService, TokenService } from "../../services/index.js";
import { createResult, createUseCase, schema } from "../../shared/core/index.js";
import { UserAlreadyExistsError } from "../../errors/index.js";

interface RegisterUserDependencies {
  userRepository: UserRepository;
  cryptoService: CryptoService;
  tokenService: TokenService;
}

type RegisterUserResponse = AuthSession;

interface RegisterUserRequest {
  username: string;
  email: Email;
  password: string;
}

export const registerUser = createUseCase<
  RegisterUserDependencies,
  RegisterUserRequest,
  RegisterUserResponse,
  UserAlreadyExistsError
>({
  isAuthRequired: false,
  requestSchema: {
    email: schema.string().email(),
    password: schema.string().min(8),
    username: schema.string().min(1),
  },
  handler: async ({ userRepository, cryptoService, tokenService }, { email, password, username }) => {
    const existingUser = await userRepository.findOne({ where: { email } });

    if (existingUser) return createResult.error(new UserAlreadyExistsError());

    const passwordHash = await cryptoService.hash(password);

    const user = await userRepository.save({ email, passwordHash, username });

    const accessToken = await tokenService.signAccessToken({ userId: user.id, email: user.email });

    return createResult.ok<RegisterUserResponse>({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      accessToken
    });
  }
});
