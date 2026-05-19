import { createResult, createUseCase, schema } from "../../shared";
import { PlayerRepository } from "../../repositories";
import { PlayerNotFoundError } from "../../errors";

interface DeletePlayerDependencies {
  playerRepository: PlayerRepository;
}

type DeletePlayerResponse = void;

export const deletePlayerUseCase = createUseCase<
  DeletePlayerDependencies,
  DeletePlayerResponse,
  PlayerNotFoundError
>()({
  isAuthRequired: true,
  requestShape: { id: schema.number().int().positive("id must be a positive integer") },
  handler: async ({ playerRepository }, { id }) => {
    const existingPlayer = await playerRepository.findOne({ id });

    if (!existingPlayer) return createResult.error(new PlayerNotFoundError());

    await playerRepository.delete({ id });

    return createResult.ok();
  }
});
