import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    NgxMatTimepickerModule
  ]
})
export class TaskFormComponent {
  @Input() taskData: any = {};  
  @Output() submitTask = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  @Input() showCancelButton: boolean = false;

  onSubmit() {
    if (this.taskData.day instanceof Date) {
      const selectedDate = this.taskData.day;
      this.taskData.day = `${selectedDate.getMonth() + 1}-${selectedDate.getDate()}-${selectedDate.getFullYear()}`; //formatting date
    }

    console.log("Task Data Before Emitting:", this.taskData); //for debugging

    this.submitTask.emit(this.taskData);
  }

  
}
