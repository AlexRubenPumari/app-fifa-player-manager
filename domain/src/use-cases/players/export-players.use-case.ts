import type { ExportService } from "../../services/index.js";
import type { Player } from "../../entities/index.js";
import type { FindManyDTO } from "../../shared/core/index.js";
import type { PlayerRepository } from "../../repositories/index.js";
import { createResult, createUseCase, schema } from "../../shared/core/index.js";
import { whereSchema, orderBySchema } from "../../shared/core/schemas/index.js";

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
    take: schema.number().int().min(1).max(100),
    skip: schema.number().int().min(0),
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
