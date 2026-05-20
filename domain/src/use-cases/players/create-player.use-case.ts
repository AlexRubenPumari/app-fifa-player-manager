import { createResult, createUseCase, schema } from "../../shared/core";
import { clubPositionEnum, playerPositionEnum } from "../../shared/players";
import { Player } from "../../entities";
import { PlayerRepository } from "../../repositories";

interface CreatePlayerDependencies {
  playerRepository: PlayerRepository;
}

type CreatePlayerResponse = Player;

export const createPlayerUseCase = createUseCase<
  CreatePlayerDependencies,
  CreatePlayerResponse,
  never
>()({
  isAuthRequired: true,
  requestShape: {
    longName: schema.string().min(1, "long name is required"),
    clubName: schema.string().min(1, "club name is required"),
    clubPosition: clubPositionEnum,
    playerPositions: schema.array(playerPositionEnum).min(1, "player positions must contain at least one position"),
    overall: schema.number().int().min(0, "overall must be between 0 and 100").max(100, "overall must be between 0 and 100"),
    nationality: schema.string().min(1, "nationality is required"),
  },
  handler: async ({ playerRepository }, data) => {
    const player = await playerRepository.save({ data });

    return createResult.ok(player);
  }
});
