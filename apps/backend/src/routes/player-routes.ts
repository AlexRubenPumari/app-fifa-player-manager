import { MockPlayerRepository, Player, findPlayer, listPlayers } from "@fifa-player-manager/domain"
import express, { Response } from "express"
import { ApiResponse } from "../types"

type FindPlayerApiResponse = ApiResponse<{ player: Player }>
type ListPlayersApiResponse = ApiResponse<{ players: Player[] }>

const playerRepository = new MockPlayerRepository([
  { id: 1, fullName: "Lionel Messi" },
  { id: 2, fullName: "Julian Álvarez" },
  { id: 3, fullName: "Enzo Fernandez" },
  { id: 4, fullName: "Lautaro Martinez" },
])

export const playersRouter = express.Router()

playersRouter.route("/")
  .get(async (_, res: Response<ListPlayersApiResponse>) => {
    const result = await listPlayers({ playerRepository }, { options: {} })

    if (result.success) {
      res.status(200).json({
        data: { players: result.value.players },
        message: "Players fetched successfully",
      })
    }
  })

playersRouter.route("/:id")
  .get(async (req, res: Response<FindPlayerApiResponse>) => {
    const id: number = Number(req.params.id)

    const result = await findPlayer({ playerRepository }, { options: { id } })

    if (result.success) {
      res.status(200).json({
        data: { player: result.value.player },
        message: "Player fetched successfully",
      })
    } else {
      res.status(404).json({
        message: result.error,
      })
    }
  })