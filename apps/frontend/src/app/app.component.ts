import { Component } from "@angular/core"
import { RouterOutlet } from "@angular/router"
import { Header, AsideMenu, Footer } from "./shared/components"

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, Header, AsideMenu, Footer],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css"
})
export class App {
  isMenuOpen: boolean = false

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen
  }
}
