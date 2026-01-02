import { Routes } from "@angular/router"
import { ListPlayersView } from "./views"

export const routes: Routes = [
  { path: "players", component: ListPlayersView },
  { path: "skills", component: ListPlayersView },
  { path: "teams", component: ListPlayersView },
]
