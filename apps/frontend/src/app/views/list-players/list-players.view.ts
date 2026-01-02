import { Component } from "@angular/core"
import { Table, Title } from "../../shared/components";

@Component({
  selector: "app-list-players",
  standalone: true,
  imports: [Title, Table],
  templateUrl: "./list-players.view.html",
})
export class ListPlayersView {
  tableColumns = [
    { key: "id", label: "Nro" },
    { key: "name", label: "Nombre" },
    { key: "pos", label: "Posicion" },
    { key: "age", label: "Edad" },
  ]
  tableData = [
    { id: 1, name: "Lionel Messi", pos: "MCD", age: 32 },
    { id: 2, name: "Julian Álvarez", pos: "DEL", age: 24 },
  ]
}
