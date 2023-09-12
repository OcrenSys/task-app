import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Task } from 'src/app/shared/types/Task';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TaskService } from '../../services/task/task.service';
import { tap, takeUntil, Subject } from 'rxjs';

const TASK_DATA: Task[] = [
  {
    title: 'titulo 10',
    description: 'description',
    isCompleted: false,
  },

  {
    title: 'titulo 11',
    description: 'description',
    isCompleted: false,
  },
  {
    title: 'titulo 12',
    description: 'description',
    isCompleted: false,
  },
  {
    title: 'titulo 13',
    description: 'description',
    isCompleted: false,
  },
  {
    title: 'titulo 14',
    description: 'description',
    isCompleted: false,
  },
  {
    title: 'titulo 15',
    description: 'description',
    isCompleted: true,
  },
];

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatCheckboxModule],
})
export class TaskListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['title', 'description', 'status', 'option'];
  dataSource = TASK_DATA;
  protected stop$ = new Subject();

  constructor(public dialog: MatDialog, private taskService: TaskService) {}

  ngOnInit(): void {
    // this.getList();
  }

  ngOnDestroy(): void {
    this.stop$.next(null);
    this.stop$.complete();
  }

  private getList(): void {
    this.taskService
      .list()
      .pipe(
        takeUntil(this.stop$),
        tap((response) => console.log(response))
      )
      .subscribe();
  }

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

  protected handleToggle(task: Task): void {
    task.isCompleted = !task.isCompleted;
  }
}
