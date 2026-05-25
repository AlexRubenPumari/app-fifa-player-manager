import { PlayerNotFoundError } from "../../errors";
import { PlayerRepository } from "../../repositories";
import { Player } from "../../entities";
import { createUseCase, createResult, schema } from "../../shared";

interface GetPlayerByIdDependencies {
  playerRepository: PlayerRepository;
}

interface GetPlayerByIdRequest {
  id: number;
}

export const getPlayerByIdUseCase = createUseCase<
  GetPlayerByIdDependencies,
  GetPlayerByIdRequest,
  Player,
  PlayerNotFoundError
>({
  isAuthRequired: true,
  requestSchema: {
    id: schema.number(),
  },
  handler: async (dependencies, request) => {
    const player = await dependencies.playerRepository.findOne({ id: request.id });

    if (!player) return createResult.error(new PlayerNotFoundError());

    return createResult.ok(player);
  },
});