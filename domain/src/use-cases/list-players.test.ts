import { describe, test, expect } from "vitest"
import { listPlayers } from "../use-cases"
import { MockPlayerRepository } from "../mocks/repositories"

describe("list-players", () => {
  test("should return empty array when no players", async () => {
    const playerRepository = new MockPlayerRepository()
    const result = await listPlayers({ playerRepository }, { options: { page: 1, pageSize: 10 } })

    expect(result).toEqual([])
  })

  test("should return players list with pagination options", async () => {
    const playerRepository = new MockPlayerRepository([
      { id: 1, fullName: "Lionel Andrés Messi Cuccittini" },
      { id: 2, fullName: "Andrey Eshchenko" },
    ])
    const result = await listPlayers({ playerRepository }, { options: { page: 1, pageSize: 1 } })

    expect(result.length).toBe(2)
  })
})
