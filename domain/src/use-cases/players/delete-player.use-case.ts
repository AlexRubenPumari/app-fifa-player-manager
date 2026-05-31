import type { PlayerRepository } from "../../repositories/index.js";
import { createResult, createUseCase, schema } from "../../shared/index.js";
import { PlayerNotFoundError } from "../../errors/index.js";

interface DeletePlayerDependencies {
  playerRepository: PlayerRepository;
}

interface DeletePlayerRequest {
  id: number;
}

export const deletePlayerUseCase = createUseCase<
  DeletePlayerDependencies,
  DeletePlayerRequest,
  void,
  PlayerNotFoundError
>({
  isAuthRequired: true,
  requestSchema: { id: schema.number().int().min(1) },
  handler: async ({ playerRepository }, { id }) => {
    const existingPlayer = await playerRepository.findOne({ where: { id } });

    if (!existingPlayer) return createResult.error(new PlayerNotFoundError());

    await playerRepository.delete({ id });

    return createResult.ok();
  }
});
