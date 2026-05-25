import { createResult, createUseCase, schema } from "../../shared/core";
import {
  ClubPosition,
  PlayerPosition,
  playerPositions,
  clubPositions,
} from "../../shared/players";
import { Player } from "../../entities";
import { PlayerRepository } from "../../repositories";

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
    longName: schema.string().min(1, "long name is required"),
    clubName: schema.string().min(1, "club name is required"),
    clubPosition: schema.enum(clubPositions),
    playerPositions: schema.array(schema.enum(playerPositions)).min(1, "player positions must contain at least one position"),
    overall: schema.number().int().min(0, "overall must be between 0 and 100").max(100, "overall must be between 0 and 100"),
    nationality: schema.string().min(1, "nationality is required"),
  },
  handler: async ({ playerRepository }, data) => {
    const player = await playerRepository.save({ data });

    return createResult.ok(player);
  }
});
