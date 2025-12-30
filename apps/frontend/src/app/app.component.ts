import { Component } from "@angular/core"
import { RouterOutlet } from "@angular/router"
import { Header, AsideMenu, Title, Table, Footer } from "./shared/components"

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, Header, AsideMenu, Title, Footer, Table],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css"
})
export class App {
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
  isMenuOpen: boolean = false

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen
  }
}
