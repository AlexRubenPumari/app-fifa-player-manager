import type { FindManyDTO } from "../../shared/index.js";
import type { PlayerRepository } from "../../repositories/index.js";
import type { Player } from "../../entities/index.js";
import { schema, createResult, createUseCase } from "../../shared/index.js";
import { whereSchema, orderBySchema } from "../../shared/core/schemas/index.js";

interface GetPlayersDependencies {
  playerRepository: PlayerRepository;
}

type GetPlayersRequest = FindManyDTO<Player>;

interface GetPlayersResponse {
  data: Player[];
  total: number;
}
  
export const getPlayers = createUseCase<
  GetPlayersDependencies,
  GetPlayersRequest,
  GetPlayersResponse,
  never
>({
  isAuthRequired: true,
  requestSchema: {
    where: whereSchema.optional(),
    take: schema.number().int().min(1).max(100),
    skip: schema.number().int().min(0),
    orderBy: orderBySchema.optional(),
  },
  handler: async ({ playerRepository }, request) => {
    const { where, take, skip, orderBy } = request;

    const paginatedPlayers = await playerRepository.findMany({ 
      where,
      take,
      skip,
      orderBy,
    });

    return createResult.ok(paginatedPlayers);
  }
});