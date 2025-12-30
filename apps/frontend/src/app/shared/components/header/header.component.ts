import { Component, EventEmitter, Output } from "@angular/core"

@Component({
  selector: "app-header",
  standalone: true,
  imports: [],
  templateUrl: "./header.component.html",
})
export class Header {
  @Output() menuToggle = new EventEmitter<boolean>()

  onMenuButtonClick(){
    this.menuToggle.emit(true)
  }
}