import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Task } from 'src/app/types/Task';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

const TASK_DATA: Task[] | any = [
  {
    title: 'titulo 1',
    description: 'description',
    createdAt: '12/12/2023 4:00 pm',
    updatedAt: '12/12/2023 4:00 pm',
    status: 'activa',
  },

  {
    title: 'titulo 2',
    description: 'description',
    createdAt: '12/12/2023 4:00 pm',
    updatedAt: '12/12/2023 4:00 pm',
    status: 'activa',
  },
  {
    title: 'titulo 3',
    description: 'description',
    createdAt: '12/12/2023 4:00 pm',
    updatedAt: '12/12/2023 4:00 pm',
    status: 'activa',
  },
  {
    title: 'titulo 4',
    description: 'description',
    createdAt: '12/12/2023 4:00 pm',
    updatedAt: '12/12/2023 4:00 pm',
    status: 'activa',
  },
  {
    title: 'titulo 5',
    description: 'description',
    createdAt: '12/12/2023 4:00 pm',
    updatedAt: '12/12/2023 4:00 pm',
    status: 'activa',
  },
  {
    title: 'titulo 6',
    description: 'description',
    createdAt: '12/12/2023 4:00 pm',
    updatedAt: '12/12/2023 4:00 pm',
    status: 'activa',
  },
  {
    title: 'titulo 7',
    description: 'description',
    createdAt: '12/12/2023 4:00 pm',
    updatedAt: '12/12/2023 4:00 pm',
    status: 'activa',
  },
  {
    title: 'titulo 8',
    description: 'description',
    createdAt: '12/12/2023 4:00 pm',
    updatedAt: '12/12/2023 4:00 pm',
    status: 'activa',
  },
];

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule],
})
export class TaskListComponent {
  displayedColumns: string[] = [
    'createdAt',
    'title',
    'description',
    'updatedAt',
    'status',
    'option',
  ];
  dataSource = TASK_DATA;

  constructor(public dialog: MatDialog) {}

  protected onClick(row: Task) {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      data: {
        ...row,
      },
      panelClass: 'dialog-responsive',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result) console.log('Result', result);
    });
  }
}
