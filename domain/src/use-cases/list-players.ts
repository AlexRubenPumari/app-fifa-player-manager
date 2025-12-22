import type { PlayerRepository } from "../repositories"
import type { FindManyOptions as ListPlayersOptions } from "../helpers"

interface ListPlayersDeps {
  playerRepository: PlayerRepository
}

interface ListPlayersPayload {
  options: ListPlayersOptions
}

export async function listPlayers (
  { playerRepository }: ListPlayersDeps, { options }: ListPlayersPayload
) {
  return await playerRepository.findMany(options)
}