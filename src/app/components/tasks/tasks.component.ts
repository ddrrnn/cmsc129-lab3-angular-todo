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
import { SortTasksComponent } from '../sort-tasks/sort-tasks.component';


@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    FormsModule, 
    CommonModule, 
    TaskItemComponent, 
    AddTaskComponent, 
    MatDialogModule,
    SortTasksComponent
  ],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  tasks: Task[] = [];
  deletedTask: Task | null = null;
  showToast: boolean = false;

  constructor(private taskService: TaskService, private dialog: MatDialog, private snackbarService: SnackbarService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks)); //update once data is received
  }

  deleteTask(task: Task) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, { //deletion modal
      width: '400px',
      data: { message: 'Are you sure you want to delete this task?' }
    });
  
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.taskService.deleteTask(task.id).subscribe(() => {
          this.tasks = this.tasks.filter(t => t.id !== task.id);
  
          const snackBarRef = this.snackBar.openFromComponent(MatSnackbarComponent, { //snackbar
            duration: 3000,
            data: { message: 'Task deleted', actionText: 'Undo' }
          }); 
  
          snackBarRef.onAction().subscribe(() => { //runs when undo is clicked
            this.taskService.addTask(task).subscribe((restoredTask) => {
              this.tasks.push(restoredTask);
            });
          });
        });
      }
    });
  }
  
  toggleComplete(task: Task) {
    task.completed = !task.completed;
    this.taskService.updateTask(task).subscribe();
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

  onSortChange(sortBy: string) {
    if (sortBy === 'dateAdded') {
      this.tasks.sort((a, b) => new Date(a.dateAdded!).getTime() - new Date(b.dateAdded!).getTime());
    } else if (sortBy === 'dueDate') {
      this.tasks.sort((a, b) => new Date(a.day!).getTime() - new Date(b.day!).getTime());
    } else if (sortBy === 'priority') {
      const priorityOrder: { [key: string]: number } = { high: 3, medium: 2, low: 1 };
  
      this.tasks.sort((a, b) => 
        (priorityOrder[b.priority?.toLowerCase() || 'low'] - priorityOrder[a.priority?.toLowerCase() || 'low'])
      );
    }
  }
  
}
