import type { PlayerRepository } from "../../repositories/index.js";
import type { Player } from "../../entities/index.js";
import { PlayerNotFoundError } from "../../errors/index.js";
import { createUseCase, createResult, schema } from "../../shared/index.js";

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
    const player = await dependencies.playerRepository.findOne({ where: { id: request.id } });

    if (!player) return createResult.error(new PlayerNotFoundError());

    return createResult.ok(player);
  },
});