import { validateCreatePlayerPayload, type CreatePlayerPayload } from "../request-model/create-player"
import type { PlayerRepository } from "../repositories"

interface CreatePlayerDeps {
  playerRepository: PlayerRepository
}

export async function createPlayer(
  { playerRepository }: CreatePlayerDeps, { player }: CreatePlayerPayload
) {
  if (!validateCreatePlayerPayload({ player })) throw new Error("Payload is invalid")

  return await playerRepository.save(player)
}
