import { MatSnackBar } from '@angular/material/snack-bar';

export function showSnackBar(
  snackBar: MatSnackBar,
  message: string = '',
  duration: number = 1500
) {
  snackBar.open(message, 'Cerrar', {
    horizontalPosition: 'end',
    verticalPosition: 'bottom',
    duration: duration,
  });
}
