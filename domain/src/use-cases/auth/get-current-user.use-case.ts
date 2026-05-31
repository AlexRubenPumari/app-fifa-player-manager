import type { SafeUser } from "../../shared/users/index.js";
import type { TokenService } from "../../services/index.js";
import type { UserRepository } from "../../repositories/index.js";
import { createResult, createUseCase, schema } from "../../shared/core/utils/index.js";
import { InvalidCredentialsError, UserNotFoundError } from "../../errors/index.js";

interface GetCurrentUserDependencies {
  tokenService: TokenService;
  userRepository: UserRepository;
}

type GetCurrentUserRequest = {
  accessToken: string;
};

type GetCurrentUserResponse = SafeUser;

export const getCurrentUser = createUseCase<
  GetCurrentUserDependencies,
  GetCurrentUserRequest,
  GetCurrentUserResponse,
  InvalidCredentialsError | UserNotFoundError
>({
  isAuthRequired: false,
  requestSchema: {
    accessToken: schema.string().min(1)
  },
  handler: async ({ tokenService, userRepository }, { accessToken }) => {
    const payload = await tokenService.verifyAccessToken(accessToken);

    if (!payload) return createResult.error(new InvalidCredentialsError());

    const user = await userRepository.findOne({ where: { id: payload.userId } });

    if (!user) return createResult.error(new UserNotFoundError());

    return createResult.ok<GetCurrentUserResponse>({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  }
});
