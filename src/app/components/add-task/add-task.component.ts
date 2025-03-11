import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../Task';
import { NgClass } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-add-task',
  providers: [provideNativeDateAdapter()],
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    TaskFormComponent 
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();

  taskData: Task = {
    id: '',
    text: '',
    day: '',
    completed: false,
    priority: 'Low',
    time: ''
  };

  onSubmit(task: Task) {
    if (!task.text) {
      alert('Please enter a task!');
      return;
    }

      const newTask: Task = {
        id: Math.floor(Math.random() * 10000).toString(), 
        text: this.taskData.text,
        day: this.taskData.day,
        time: this.taskData.time,
        completed: false,
        priority: this.taskData.priority
      };
 
  
    
    this.onAddTask.emit(task);

    this.taskData = {
      id: '',
      text: '',
      day: '',
      completed: false,
      priority: 'Low',
      time: ''
    };
  }
}
