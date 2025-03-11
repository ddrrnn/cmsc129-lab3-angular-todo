import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackbarComponent } from '../components/mat-snackbar/mat-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  showMessage(message: string, duration: number = 3000) {
    this.snackBar.openFromComponent(MatSnackbarComponent, {
      data: { message },
      duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
