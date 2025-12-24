import * as z from "zod"
import type { Player } from "../entities"
import type { Updatable, Validator } from "../helpers"

export interface EditPlayerPayload {
  player: Updatable<Player>
}

const hasUpdatableField = (data: Record<string, unknown>) =>
  data.fullName || data.nationality

const UpdatablePlayerSchema = z.object({
  id: z.number().gte(1),
  fullName: z.string().min(1).optional(),
  nationality: z.string().min(1).optional(),
}).refine(hasUpdatableField)

export const validateEditPlayerPayload: Validator<EditPlayerPayload> = ({ player }) => {
  return UpdatablePlayerSchema.safeParse(player).success
}
