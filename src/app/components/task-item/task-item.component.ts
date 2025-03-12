import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../Task';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgStyle } from '@angular/common';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [FontAwesomeModule, NgStyle, NgClass, FormsModule], 
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'] 
})
export class TaskItemComponent {

  constructor(private taskService: TaskService) {}

  @Input() task!: Task;
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onToggleReminder: EventEmitter<Task> = new EventEmitter();
  @Output() onEditTask: EventEmitter<Task> = new EventEmitter();
  @Output() taskCompleted: EventEmitter<Task> = new EventEmitter();

  faTimes = faTimes;
  faEdit = faEdit; //icons

  onDelete(task: any){
    this.onDeleteTask.emit(task);
  }
  
  onToggle(task: any){
    this.onToggleReminder.emit(task);
  }

  onCheckbox() {
    this.task.completed = !this.task.completed;
    this.taskService.updateTask(this.task).subscribe(updatedTask => {
      this.task = updatedTask;
    });
  }
  
  onEdit() {
    this.onEditTask.emit(this.task);
  }

  onPriorityChange(task: Task) {
    this.taskService.updateTask(task).subscribe();
  }
  
}
