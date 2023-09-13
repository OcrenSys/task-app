import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Task } from 'src/app/shared/types/Task';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TaskService } from '../../services/task/task.service';
import { Subject } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';
import { TruncatePipe } from 'src/app/shared/pipes/truncate/truncate.pipe';

const TASK_DATA: Task[] = [
  {
    title: 'Lorem Ipsum',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    isCompleted: false,
  },

  {
    title: 'Lorem Ipsum',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    isCompleted: false,
  },
  {
    title: 'Lorem Ipsum',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    isCompleted: false,
  },
  {
    title: 'Lorem Ipsum',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    isCompleted: false,
  },
  {
    title: 'Lorem Ipsum',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    isCompleted: false,
  },
  {
    title: 'Lorem Ipsum',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    isCompleted: true,
  },
];

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  standalone: true,
  imports: [
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    TruncatePipe,
  ],
  providers: [TaskService],
})
export class TaskListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['title', 'description', 'status', 'option'];
  dataSource = TASK_DATA;
  protected stop$ = new Subject();

  constructor(
    public dialog: MatDialog,
    private taskService: TaskService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    // this.getList();
  }

  ngOnDestroy(): void {
    this.stop$.next(null);
    this.stop$.complete();
  }

  private getList(): void {
    // this.taskService
    //   .list()
    //   .pipe(
    //     takeUntil(this.stop$),
    //     tap((response) => console.log(response))
    //   )
    //   .subscribe();
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

  protected navigateToDetails(task: Task): void {
    const extras: NavigationExtras = {
      queryParams: {
        task: JSON.stringify(task),
      },
    };
    this.router.navigate(['details'], extras);
  }
}
