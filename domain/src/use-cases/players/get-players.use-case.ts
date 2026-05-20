import { schema, createResult, createUseCase, WhereClause, OrderByType } from "../../shared";
import { filterConditionSchema, orderDirectionSchema } from "../../shared";
import {z} from "zod";
import { PlayerRepository } from "../../repositories";
import { Player } from "../../entities";

interface GetPlayersDependencies {
  playerRepository: PlayerRepository;
}

interface GetPlayersResponse {
  data: Player[];
  total: number;
}

const whereClauseSchema: z.ZodType<WhereClause<Player>> = z.lazy(() =>
  schema.record(schema.string(), schema.union([schema.any(), filterConditionSchema])).and(
    schema.object({
      AND: schema.union([whereClauseSchema, schema.array(whereClauseSchema)]).optional(),
      OR: schema.array(whereClauseSchema).optional(),
    })
  )
);

const orderBySchema: z.ZodType<OrderByType<Player> | OrderByType<Player>[]> = schema.union([
  schema.record(schema.string(), orderDirectionSchema),
  schema.array(schema.record(schema.string(), orderDirectionSchema))
]);

export const getPlayers = createUseCase<
  GetPlayersDependencies,
  GetPlayersResponse,
  never
>()({
  isAuthRequired: true,
  requestShape: {
    where: whereClauseSchema.optional(),
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