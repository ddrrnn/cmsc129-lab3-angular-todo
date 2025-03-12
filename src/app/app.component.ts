import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { Router } from 'express';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';



@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [HeaderComponent, RouterOutlet,
            TasksComponent, TaskItemComponent, FontAwesomeModule,
            HttpClientModule, FormsModule, MatDialogModule,
            MatDatepickerModule, MatFormFieldModule, MatInputModule,
            CommonModule, MatSnackBarModule, NgxMatTimepickerModule

  ]
})
export class AppComponent {
  title = 'my-to-do';
}
