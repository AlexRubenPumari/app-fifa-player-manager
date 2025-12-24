import express from "express"
import { MockPlayerRepository, findPlayer, listPlayers } from "../../../domain/dist"
const app = express()

const PORT: number = 3000

const playerRepository = new MockPlayerRepository([
  { id: 1, fullName: "Lionel Messi" },
  { id: 2, fullName: "Lionel Messi" },
  { id: 3, fullName: "Lionel Messi" },
  { id: 4, fullName: "Lionel Messi" },
])

app.get('/v1/players', (_, res) => {
  const players = listPlayers({ playerRepository }, { options: {} })
  res.json()
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
