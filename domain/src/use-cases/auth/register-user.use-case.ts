import { createResult, createUseCase, Email, schema } from "../../shared/core";
import { AuthSession } from "../../shared/auth";
import { UserRepository } from "../../repositories";
import { CryptoService, TokenService } from "../../services";
import { UserAlreadyExistsError } from "../../errors";

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
    email: schema.email("invalid email format"),
    password: schema.string().min(8, "password must be at least 8 characters"),
    username: schema.string().min(1, "username is required"),
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
