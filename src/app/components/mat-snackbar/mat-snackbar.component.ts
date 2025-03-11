import { Component, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-mat-snackbar',
  templateUrl: './mat-snackbar.component.html',
  styleUrls: ['./mat-snackbar.component.css']
})
export class MatSnackbarComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<MatSnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: { message: string, actionText: string }
  ) {}

  onUndo() {
    this.snackBarRef.dismissWithAction(); 
  }
}
