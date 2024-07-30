import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(
    horizontalPosition: MatSnackBarHorizontalPosition,
    verticalPosition: MatSnackBarVerticalPosition,
    timeoutInSeconds: number = 5,
    message: string = 'Task Completed!',
    closeText: string = 'Close'
  ) {
    this._snackBar.open(message, closeText, {
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
    });

    setTimeout(() => this._snackBar.dismiss(), timeoutInSeconds * 1000);
  }
}
