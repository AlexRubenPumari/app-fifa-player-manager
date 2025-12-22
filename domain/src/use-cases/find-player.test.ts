import { describe, test, expect } from "vitest"
import { MockPlayerRepository } from "../mocks/repositories"
import { findPlayer } from "../use-cases"

describe("find-player", () => {
  const playerRepository = new MockPlayerRepository([
    { id: 1, fullName: "Lionel Andrés Messi Cuccittini" },
  ])

  test("should return player if exists", async () => {
    const player = await findPlayer({ playerRepository }, { options: { id: 1 } })

    expect(player).toEqual({
      id: 1,
      fullName: "Lionel Andrés Messi Cuccittini",
    })
  })

  test("should throw error if player does not exist", async () => {
    await expect(findPlayer({ playerRepository }, { options: { id: 99 } }))
      .rejects.toThrow("Player not found")
  })
})
