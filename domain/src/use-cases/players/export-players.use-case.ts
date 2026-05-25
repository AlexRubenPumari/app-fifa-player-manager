import { createResult, createUseCase, FindManyDTO, schema } from "../../shared/core";
import { whereSchema, orderBySchema } from "../../shared/core/schemas";
import { PlayerRepository } from "../../repositories";
import { ExportService } from "../../services";
import { Player } from "../../entities";

interface ExportPlayersDependencies {
  playerRepository: PlayerRepository;
  exportService: ExportService;
}

type ExportPlayersRequest = FindManyDTO<Player>;

type ExportPlayersResponse = string;

export const exportPlayers = createUseCase<
  ExportPlayersDependencies,
  ExportPlayersRequest,
  ExportPlayersResponse,
  never
>({
  isAuthRequired: true,
  requestSchema: {
    where: whereSchema.optional(),
    take: schema.number().int().positive().max(100),
    skip: schema.number().int().nonnegative(),
    orderBy: orderBySchema.optional(),
  },
  handler: async ({ playerRepository, exportService }, request) => {
    const { where, skip, take, orderBy } = request;
    
    const paginatedPlayers = await playerRepository.findMany({
      where,
      skip,
      take,
      orderBy,
    });

    const csv = exportService.generateCSV({ data: paginatedPlayers.data });

    return createResult.ok(csv);
  }
});
