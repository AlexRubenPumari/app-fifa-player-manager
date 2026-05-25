import { schema, createResult, createUseCase, FindManyDTO } from "../../shared";
import { PlayerRepository } from "../../repositories";
import { Player } from "../../entities";
import { whereSchema, orderBySchema } from "../../shared/core/schemas";

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
    take: schema.number().int().positive().max(100),
    skip: schema.number().int().nonnegative(),
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