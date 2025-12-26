import type { PlayerRepository } from "../repositories"
import type { FindManyOptions as ListPlayersOptions, Result } from "../helpers"
import type { Player } from "../entities"

interface ListPlayersDeps {
  playerRepository: PlayerRepository
}

interface ListPlayersPayload {
  options: ListPlayersOptions
}

type ListPlayersResult = Result<{ players: Player[] }, never>

export async function listPlayers (
  { playerRepository }: ListPlayersDeps, { options }: ListPlayersPayload
): Promise<ListPlayersResult> {
  const players = await playerRepository.findMany(options)

  return {
    success: true,
    value: { players },
  }
}