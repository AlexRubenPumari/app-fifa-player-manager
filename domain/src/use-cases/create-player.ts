import { validatePayload, type CreatePlayerPayload } from "../request-model"
import type { PlayerRepository } from "../repositories"

interface CreatePlayerDeps {
  playerRepository: PlayerRepository
}

export async function createPlayer (
  { playerRepository }: CreatePlayerDeps, { player }: CreatePlayerPayload
) {
  if(!validatePayload({ player })) throw new Error("Payload is invalid")

  return await playerRepository.save(player) 
}