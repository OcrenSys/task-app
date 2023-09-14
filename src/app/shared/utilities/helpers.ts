import { MatSnackBar } from '@angular/material/snack-bar';
import { Task } from '../classes/Task.class';

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

export function sorted(tasks: Task[]): Task[] {
  return tasks.sort(
    (prev: Task, next: Task) =>
      new Date(next.createdAt!).getTime() - new Date(prev.createdAt!).getTime()
  );
}
