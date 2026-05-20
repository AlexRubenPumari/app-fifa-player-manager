import { createResult, createUseCase, schema } from "../../shared/core";
import { playerPositionEnum, clubPositionEnum } from "../../shared/players";
import { PlayerRepository } from "../../repositories";
import { PlayerNotFoundError } from "../../errors";

interface UpdatePlayerDependencies {
  playerRepository: PlayerRepository;
}

type UpdatePlayerResponse = void;

export const updatePlayer = createUseCase<
  UpdatePlayerDependencies,
  UpdatePlayerResponse,
  PlayerNotFoundError
>()({
  isAuthRequired: true,
  requestShape: {
    id: schema.number().int().positive("id must be a positive integer"),
    data: schema.object({
      longName: schema.string().min(1, "long name cannot be empty").optional(),
      clubName: schema.string().min(1, "club name cannot be empty").optional(),
      clubPosition: clubPositionEnum.optional(),
      playerPositions: schema.array(playerPositionEnum).min(1, "player positions must contain at least one position").optional(),
      overall: schema.number().int().min(0, "overall must be between 0 and 100").max(100, "overall must be between 0 and 100").optional(),
      nationality: schema.string().min(1, "nationality cannot be empty").optional(),
    }).refine(data => Object.keys(data).length > 0, { message: "at least one field must be provided to update" })
  },
  handler: async ({ playerRepository }, { id, data }) => {
    const existingPlayer = await playerRepository.findOne({ id });

    if (!existingPlayer) return createResult.error(new PlayerNotFoundError());

    await playerRepository.update({ id, data });

    return createResult.ok();
  }
});
