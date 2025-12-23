import { describe, test, expect } from "vitest"
import { createPlayer } from "../use-cases"
import { MockPlayerRepository } from "../mocks/repositories"
import type { Player } from "../entities"

describe("create-player", () => {
  const playerRepository = new MockPlayerRepository([
    { id: 1, fullName: "Julian Álvarez" }
  ])

  test("should create player successfully", async () => {
    const player = { fullName: "Lionel Andrés Messi Cuccittini" }
    const result = await createPlayer({ playerRepository }, { player })

    expect(result).toBeTypeOf("number")
  })

  test("should not allow invalid payload", async () => {
    await expect(createPlayer(
      { playerRepository }, { player: {} as Player }
    )).rejects.toThrow("Payload is invalid")
    await expect(createPlayer(
      { playerRepository }, { player: { name: "Lionel Andrés Messi Cuccittini" } as unknown as Player }
    )).rejects.toThrow("Payload is invalid")
  })

  test("should not allow duplicate names", async () => {
    const player = { fullName: "Julian Álvarez" }

    await expect(createPlayer({ playerRepository }, { player }))
      .rejects.toThrow("Player already exists")
  })
})