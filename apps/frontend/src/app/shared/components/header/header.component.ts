import { Component, EventEmitter, Output } from "@angular/core"
import { BurgerMenu } from "../../icons"

@Component({
  selector: "app-header",
  standalone: true,
  imports: [BurgerMenu],
  templateUrl: "./header.component.html",
})
export class Header {
  @Output() menuToggle = new EventEmitter<boolean>()

  onMenuButtonClick(){
    this.menuToggle.emit(true)
  }
}