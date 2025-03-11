import { FormsModule } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { Task } from '../../Task';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskService } from '../../services/task.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { SnackbarService } from '../../services/snackbar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackbarComponent } from '../mat-snackbar/mat-snackbar.component';


@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    FormsModule, 
    CommonModule, 
    TaskItemComponent, 
    AddTaskComponent, 
    MatDialogModule
  ],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  tasks: Task[] = [];
  deletedTask: Task | null = null;
  deletedTaskIndex: number | null = null;
  showToast: boolean = false;

  constructor(private taskService: TaskService, private dialog: MatDialog, private snackbarService: SnackbarService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id);
  
      const snackBarRef = this.snackBar.openFromComponent(MatSnackbarComponent, {
        duration: 3000,
        data: { message: 'Task deleted', actionText: 'Undo' }
      });
  
      snackBarRef.onAction().subscribe(() => {
        this.taskService.addTask(task).subscribe((restoredTask) => {
          this.tasks.push(restoredTask);
        });
      });
    });
  }
  


  toggleReminder(task: Task) {
    task.completed = !task.completed;
    this.taskService.updateTaskReminder(task).subscribe();
  }

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe((newTask) => this.tasks.push(newTask));
  }

  updateTask(updatedTask: Task) {
    this.taskService.updateTask(updatedTask).subscribe(() => {
      this.tasks = this.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
    });
  }

  editTask(task: Task) {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      width: '550px',
      data: { task },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateTask(result);
      }
    });
  }
  
}
