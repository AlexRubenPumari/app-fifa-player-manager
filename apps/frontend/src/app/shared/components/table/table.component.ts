import { Component, Input } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-table",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./table.component.html",
})
export class Table {
  @Input() columns: Column[] = []
  @Input() data: Record<string, unknown>[] = []
}

interface Column {
  key: string,
  label: string,
}