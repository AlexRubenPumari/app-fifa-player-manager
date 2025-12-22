import type { Player } from "../../entities"
import type { PlayerRepository } from "../../repositories"
import type { FindOneOptions, FindManyOptions, New, Updatable } from "../../helpers"

export class MockPlayerRepository implements PlayerRepository {
  private players: Player[]

  constructor(initialPlayers: Player[] = []) {
    this.players = [...initialPlayers]
  }

  async findOne(options: FindOneOptions): Promise<Player | null> {
    const player = this.players.find(({ id }) => {
      return id === options.id
    })

    return player ?? null
  }

  async findMany(options: FindManyOptions): Promise<Player[]> {
    return [...this.players]
  }

  async save(player: New<Player>) {
    const newId: number = this.players.length + 1
    const newPlayer: Player = { ...player, id: newId, }

    this.players.push(newPlayer)
    
    return newPlayer.id
  }

  async update(updatedPlayer: Updatable<Player>): Promise<void> {
    const index = this.players.findIndex(player => player.id === updatedPlayer.id)

    if (index >= 0) {
      this.players[index] = {...this.players[index]!, ...updatedPlayer}
    } else {
      throw new Error("Player not found")
    }
  }

  async delete(player: Player): Promise<void> {
    const index = this.players.findIndex(({ id }) => id === player.id)
    if (index !== -1) {
      this.players.splice(index, 1)
    } else {
      throw new Error("Player not found")
    }
  }
}