import { createResult, createUseCase, schema } from "../../shared/core/utils";
import { SafeUser } from "../../shared/users";
import { InvalidCredentialsError, UserNotFoundError } from "../../errors";
import { TokenService } from "../../services";
import { UserRepository } from "../../repositories";

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
