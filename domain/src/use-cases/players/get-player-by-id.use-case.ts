import { PlayerNotFoundError } from "../../errors";
import { PlayerRepository } from "../../repositories";
import { Player } from "../../entities";
import { createUseCase, createResult, schema } from "../../shared";

interface GetPlayerByIdDependencies {
  playerRepository: PlayerRepository;
}

type GetPlayerByIdResponse = Player;

const getPlayerByIdUseCase = createUseCase<
  GetPlayerByIdDependencies,
  GetPlayerByIdResponse,
  PlayerNotFoundError
>()({
  isAuthRequired: true,
  requestShape: {
    id: schema.number(),
  },
  handler: async ({ playerRepository }, request) => {
    const player = await playerRepository.findOne({ id: request.id });

    if (!player) return createResult.error(new PlayerNotFoundError());

    return createResult.ok(player);
  },
});