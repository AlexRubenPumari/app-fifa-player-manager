import { validatePayload, type EditPlayerPayload } from "../request-model/edit-player"
import type { PlayerRepository } from "../repositories"

interface EditPlayerDeps {
  playerRepository: PlayerRepository
}

export async function editPlayer (
  { playerRepository }: EditPlayerDeps, { player }: EditPlayerPayload
) {
  if(!validatePayload({ player })) throw new Error("Payload is invalid")

  await playerRepository.update(player)
}