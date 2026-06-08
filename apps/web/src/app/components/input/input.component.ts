import { Component, ExistingProvider, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const INPUT_VALUE_ACCESSOR: ExistingProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputComponent),
  multi: true
};

@Component({
  selector: 'app-input',//todo: resolver con q nomenclatura usar los nombres
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  providers: [INPUT_VALUE_ACCESSOR],
})
export class InputComponent implements ControlValueAccessor {
  @Input() placeholder: string = "";
  @Input({ required: true }) label: string = "";

  value: string = "";
  disabled: boolean = false;

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }
}
