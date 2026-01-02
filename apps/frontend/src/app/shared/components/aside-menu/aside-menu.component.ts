import { Component, Input } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterLink, RouterLinkActive } from "@angular/router"

@Component({
  selector: "app-aside-menu",
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: "./aside-menu.component.html",
})
export class AsideMenu {
  @Input() isOpen: boolean = false

  asideMenuItems: AsideMenuItem[] = [
    { label: "Jugadores", route: "/players" },
    { label: "Habilidades", route: "/skills" },
    { label: "Equipos", route: "/teams" },
  ]
}

interface AsideMenuItem {
  label: string,
  route: string,
}