import { describe, test, expect } from "vitest"
import { editPlayer } from "../use-cases"
import { MockPlayerRepository } from "../mocks/repositories"
import type { Updatable } from "../helpers"
import type { Player } from "../entities"

describe("edit-player", () => {
  const playerRepository = new MockPlayerRepository([
    { id: 1, fullName: "Lionel Scaloni" },
    { id: 2, fullName: "Julian Álvarez" },
  ])

  test("should edit player successfully", async () => {
    await editPlayer({ playerRepository }, { player: { id: 1, fullName: "Lionel Messi" } })

    const updatedPlayer = await playerRepository.findOne({ id: 1 })
    expect(updatedPlayer).toStrictEqual({
      id: 1,
      fullName: "Lionel Messi"
    } satisfies Player)
  })

  test("should not allow invalid payload", async () => {
    await expect(editPlayer(
      { playerRepository }, { player: { id: 0 } as Updatable<Player> }
    )).rejects.toThrow("Payload is invalid")
        await expect(editPlayer(
      { playerRepository }, { player: { id: 1 } as Updatable<Player> }
    )).rejects.toThrow("Payload is invalid")
    await expect(editPlayer(
      { playerRepository }, { player: { fullName: "Lionel Messi" } as Updatable<Player> }
    )).rejects.toThrow("Payload is invalid")
    await expect(editPlayer(
      { playerRepository }, { player: { id: 1, name: "Lionel Messi" } as unknown as Updatable<Player>}
    )).rejects.toThrow("Payload is invalid")
  })

  test("should throw error if player does not exist", async () => {
    await expect(editPlayer(
      { playerRepository }, { player: { id: 999, fullName: "Lionel Messi" } }
    )).rejects.toThrow("Player not found")
  })

  test("should not allow duplicate names", async () => {
    await expect(editPlayer(
      { playerRepository }, { player: { id: 1, fullName: "Julian Álvarez" } }
    )).rejects.toThrow("Player already exists")
  })
})
