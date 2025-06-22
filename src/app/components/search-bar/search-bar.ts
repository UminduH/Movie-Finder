import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.html',
  styleUrls: ['./search-bar.css'],
})
export class SearchBarComponent {
  query: string = '';

  @Output() search = new EventEmitter<string>();
  @Output() clear = new EventEmitter<void>();

  submitSearch() {
    this.search.emit(this.query);
  }

  clearSearch() {
    this.query = '';
    this.clear.emit();
  }
}
