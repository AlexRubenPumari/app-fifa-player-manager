import { z as schema } from "zod";
import { createResult, createUseCase, FilterCondition } from "../../shared/core";
import { PlayerRepository } from "../../repositories";
import { ExportService } from "../../services";

interface ExportPlayersDependencies {
  playerRepository: PlayerRepository;
  exportService: ExportService;
}

type ExportPlayersResponse = string;

const filterConditionSchema: schema.ZodType<FilterCondition<any>> = schema.lazy(() =>
  schema.union([
    schema.object({
      equals: schema.any(),
      not: schema.any(),
      in: schema.array(schema.any()),
      contains: schema.string(),
      gt: schema.number(),
      gte: schema.number(),
      lt: schema.number(),
      lte: schema.number(),
    }),
    schema.any(),
  ])
);

const logicOperatorSchema: schema.ZodType<"AND" | "OR"> = schema.enum(["AND", "OR"]);

const exportPlayersSchema = {
  where: schema.record(schema.string(), schema.union([schema.any(), filterConditionSchema])).optional(),
  operator: logicOperatorSchema.optional(),
};

export const exportPlayers = createUseCase<
  ExportPlayersDependencies,
  ExportPlayersResponse,
  never
>()({
  isAuthRequired: true,
  requestSchema: exportPlayersSchema,
  handler: async ({ playerRepository, exportService }, request) => {
    const players = await playerRepository.findMany(request);

    const csv = exportService.generateCSV({ data: players });

    return createResult.ok(csv);
  }
});
