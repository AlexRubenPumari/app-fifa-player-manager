import type { Optional } from "../../shared/index.js";
import type { PlayerRepository } from "../../repositories/index.js";
import type { Player } from "../../entities/index.js";
import { createResult, createUseCase, schema } from "../../shared/core/index.js";
import { playerPositions, clubPositions } from "../../shared/players/index.js";
import { PlayerNotFoundError } from "../../errors/index.js";

interface UpdatePlayerDependencies {
  playerRepository: PlayerRepository;
}

interface UpdatePlayerRequest {
  id: number;
  data: Optional<Omit<Player, "id">>;
}

export const updatePlayer = createUseCase<
  UpdatePlayerDependencies,
  UpdatePlayerRequest,
  void,
  PlayerNotFoundError
>({
  isAuthRequired: true,
  requestSchema: {
    id: schema.number().int().min(1),
    data: schema.object({
      longName: schema.string().min(1).optional(),
      clubName: schema.string().min(1).optional(),
      clubPosition: schema.enum(clubPositions).optional(),
      playerPositions: schema.array(schema.enum(playerPositions)).min(1).optional(),
      overall: schema.number().int().min(0).max(100).optional(),
      nationality: schema.string().min(1).optional(),
    }).nonEmpty()
  },
  handler: async ({ playerRepository }, { id, data }) => {
    const existingPlayer = await playerRepository.findOne({ where: { id } });

    if (!existingPlayer) return createResult.error(new PlayerNotFoundError());

    await playerRepository.update({ id, data });

    return createResult.ok();
  }
});
