import type { Player } from "../../entities"
import type { PlayerRepository } from "../../repositories"
import type { FindOneOptions, FindManyOptions, New, Updatable } from "../../helpers"

export class MockPlayerRepository implements PlayerRepository {
  private players: Player[]

  constructor(initialPlayers: Player[] = []) {
    this.players = [...initialPlayers]
  }

  async findOne(options: FindOneOptions): Promise<Player | null> {
    return findPlayerIn(this.players, ["id", options.id])
  }

  async findMany(options: FindManyOptions): Promise<Player[]> {
    return [...this.players]
  }

  async save(player: New<Player>) {
    const playerFound = findPlayerIn(this.players, ["fullName", player.fullName])

    if (playerFound) throw new Error("Player already exists")

    const newId: number = this.players.length + 1
    const newPlayer: Player = { ...player, id: newId, }

    this.players.push(newPlayer)

    return newPlayer.id
  }

  async update(updatedPlayer: Updatable<Player>): Promise<void> {
    const index = this.players.findIndex(player => player.id === updatedPlayer.id)
    const playerExists = index >= 0
    if (!playerExists) throw new Error("Player not found")

    if (updatedPlayer.fullName) {
      const player = findPlayerIn(this.players, ["fullName", updatedPlayer.fullName])

      if (player) throw new Error("Player already exists")
    }

    this.players[index] = { ...this.players[index]!, ...updatedPlayer }
  }

  async delete(player: Player): Promise<void> {
    const index = this.players.findIndex(({ id }) => id === player.id)
    const playerExists = index >= 0

    if (!playerExists) throw new Error("Player not found")
    
      this.players.splice(index, 1)
  }
}

function findPlayerIn<PlayerKey extends keyof Player>(
  players: Player[], where: [key: PlayerKey, value: Player[PlayerKey]]
) {
  const [key, value] = where

  return players.find(p => p[key] === value) ?? null
}