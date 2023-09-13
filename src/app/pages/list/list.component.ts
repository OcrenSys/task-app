import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NavigationExtras, Router } from '@angular/router';
import { NavbarComponent } from 'src/app/core/components/navbar/navbar.component';
import { TaskFormComponent } from 'src/app/core/components/task-form/task-form.component';
import { TaskListComponent } from 'src/app/core/components/task-list/task-list.component';
import { Task } from 'src/app/shared/types/Task';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    NavbarComponent,
    TaskListComponent,
    TaskFormComponent,
    MatDialogModule,
    MatCardModule,
  ],
})
export class ListComponent {
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
