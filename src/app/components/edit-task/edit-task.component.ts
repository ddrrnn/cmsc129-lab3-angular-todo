import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../../Task';
import { TaskService } from '../../services/task.service'; 
import { FormsModule } from '@angular/forms';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [FormsModule, TaskFormComponent],
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent {
  task: Task;

  constructor(
    public dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task },
    private taskService: TaskService 
  ) {
    this.task = { ...data.task }; //hods copy of task
  }

  onSave(updatedTask: Task) {
    console.log("Saving Task:", updatedTask);
  //for debugging
    if (!updatedTask.id) {
      console.error("Task ID is missing!", updatedTask);
      return;
    }
  
    this.taskService.updateTask(updatedTask).subscribe({
      next: (response) => {
        this.dialogRef.close(updatedTask); 
      },
      error: (error) => {
        console.error("Update Task Error:", error);
      }
    });
  }    
  

  onCancel() {
    this.dialogRef.close();
  }
}
