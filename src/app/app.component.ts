import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from './core/components/task-form/task-form.component';
import { Task } from './types/Task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'taskApp';

  constructor(public dialog: MatDialog) {}

  protected openDialog() {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      data: {
        title: 'title 0',
        description: 'description ',
        createdAt: '01/01/2000 1:00 am',
        updatedAt: '01/01/2000 1:00 am',
        status: 'activa',
      },
      panelClass: 'dialog-responsive',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result) console.log('Result', result);
    });
  }
}
