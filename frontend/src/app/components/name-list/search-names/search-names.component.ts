import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-names',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-names.component.html'
})
export class SearchNamesComponent {
  @Output() searchButton = new EventEmitter<string>();
  @Output() resetButton = new EventEmitter();
  pattern: string = '';
  searchButtonPressed: boolean = false;

  searchNames(): void {
    this.searchButton.emit(this.pattern);
    this.searchButtonPressed = true;
  }

  reset(): void {
    this.resetButton.emit();
    this.pattern = '';
    this.searchButtonPressed = false;
  }
}
