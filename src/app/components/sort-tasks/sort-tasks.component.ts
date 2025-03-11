import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-sort-tasks',
  standalone: true,
  templateUrl: './sort-tasks.component.html',
  styleUrls: ['./sort-tasks.component.css'],
  imports: [CommonModule, MatFormFieldModule, MatSelectModule]
})
export class SortTasksComponent {
  @Output() sortChange = new EventEmitter<string>();

  sortOptions = [
    { value: 'dateAdded', label: 'Date Added' },
    { value: 'dueDate', label: 'Due Date' },
    { value: 'priority', label: 'Priority' }
  ];

  onSortChange(value: string) {
    this.sortChange.emit(value);
  }
}
