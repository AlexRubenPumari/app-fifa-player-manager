import { createResult, createUseCase, schema } from "../../shared/core";
import { playerPositions, clubPositions, ClubPosition, PlayerPosition } from "../../shared/players";
import { PlayerRepository } from "../../repositories";
import { PlayerNotFoundError } from "../../errors";
import { Player } from "../../entities";

interface UpdatePlayerDependencies {
  playerRepository: PlayerRepository;
}

interface UpdatePlayerRequest {
  id: number;
  data: Partial<Omit<Player, "id">>;
}

export const updatePlayer = createUseCase<
  UpdatePlayerDependencies,
  UpdatePlayerRequest,
  void,
  PlayerNotFoundError
>({
  isAuthRequired: true,
  requestSchema: {
    id: schema.number().int().positive("id must be a positive integer"),
    data: schema.object({
      longName: schema.string().min(1, "long name is required"),
      clubName: schema.string().min(1, "club name is required"),
      clubPosition: schema.enum(clubPositions),
      playerPositions: schema.array(schema.enum(playerPositions)).min(1, "player positions must contain at least one position"),
      overall: schema.number().int().min(0, "overall must be between 0 and 100").max(100, "overall must be between 0 and 100"),
      nationality: schema.string().min(1, "nationality is required"),
    }).partial()
  },
  handler: async ({ playerRepository }, { id, data }) => {
    const existingPlayer = await playerRepository.findOne({ id });

    if (!existingPlayer) return createResult.error(new PlayerNotFoundError());

    await playerRepository.update({ id, data });

    return createResult.ok();
  }
});
