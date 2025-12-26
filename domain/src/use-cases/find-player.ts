import type { PlayerRepository } from "../repositories"
import type { FindOneOptions as FindPlayerOptions, Result } from "../helpers"
import type { Player } from "../entities"

interface FindPlayerDeps {
  playerRepository: PlayerRepository
}

interface FindPlayerPayload {
  options: FindPlayerOptions
}

type FindPlayerResult = Result<{ player: Player }, "Player not found">

export async function findPlayer(
  { playerRepository }: FindPlayerDeps, { options }: FindPlayerPayload
): Promise<FindPlayerResult> {
  const player = await playerRepository.findOne(options)

  if (!player) return { success: false, error: "Player not found" }

  return { success: true, value: { player } }
}