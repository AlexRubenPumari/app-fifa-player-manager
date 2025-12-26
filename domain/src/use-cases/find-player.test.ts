import { describe, test, expect } from "vitest"
import { MockPlayerRepository } from "../mocks/repositories"
import { findPlayer } from "../use-cases"

describe("find-player", () => {
  const playerRepository = new MockPlayerRepository([
    { id: 1, fullName: "Lionel Andrés Messi Cuccittini" },
  ])

  test("should return player if exists", async () => {
    const result = await findPlayer({ playerRepository }, { options: { id: 1 } })

    expect(result.value?.player).toEqual({
      id: 1,
      fullName: "Lionel Andrés Messi Cuccittini",
    })
  })

  test("should return an error if player does not exist", async () => {
    const result = await findPlayer({ playerRepository }, { options: { id: 99 } })

    expect(result).toEqual({ success: false, error: "Player not found" })
  })
})
