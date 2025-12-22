import type { PlayerRepository } from "../repositories"
import type { FindOneOptions as FindPlayerOptions } from "../helpers"

interface FindPlayerDeps {
  playerRepository: PlayerRepository
}

interface FindPlayerPayload {
  options: FindPlayerOptions
}

export async function findPlayer(
  { playerRepository }: FindPlayerDeps, { options }: FindPlayerPayload
) {
  const player = await playerRepository.findOne(options)

  if (!player) throw new Error("Player not found");

  return player
}