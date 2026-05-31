import type { ClubPosition, PlayerPosition } from "../../shared/players/index.js";
import type { Player } from "../../entities/index.js";
import type { PlayerRepository } from "../../repositories/index.js";
import { createResult, createUseCase, schema } from "../../shared/core/index.js";
import { playerPositions, clubPositions } from "../../shared/players/index.js";

interface CreatePlayerDependencies {
  playerRepository: PlayerRepository;
}

interface CreatePlayerRequest {
  longName: string;
  clubName: string;
  clubPosition: ClubPosition;
  playerPositions: PlayerPosition[];
  overall: number;
  nationality: string;
}

export const createPlayerUseCase = createUseCase<
  CreatePlayerDependencies,
  CreatePlayerRequest,
  Player,
  never
>({
  isAuthRequired: true,
  requestSchema: {
    longName: schema.string().min(1),
    clubName: schema.string().min(1),
    clubPosition: schema.enum(clubPositions),
    playerPositions: schema.array(schema.enum(playerPositions)).min(1),
    overall: schema.number().int().min(0),
    nationality: schema.string().min(1),
  },
  handler: async ({ playerRepository }, data) => {
    const player = await playerRepository.save(data);

    return createResult.ok(player);
  }
});
