import * as z from "zod"
import type { Player } from "../entities"
import type { New, Validator } from "../helpers"

export interface CreatePlayerPayload {
  player: New<Player>
}

const PlayerSchema = z.object({
  fullName: z.string().min(1),
  nationality: z.string().optional(),
})

export const validateCreatePlayerPayload: Validator<CreatePlayerPayload> = ({ player }) => {
  return PlayerSchema.safeParse(player).success
}
