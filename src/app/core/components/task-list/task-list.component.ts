import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Task } from 'src/app/shared/types/Task';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TaskService } from '../../services/task/task.service';
import { Subject, take, takeUntil, tap } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';
import { TruncatePipe } from 'src/app/shared/pipes/truncate/truncate.pipe';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { showSnackBar } from '../../../shared/utilities/helpers';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

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
    MatCardModule,
    MatSnackBarModule,
  ],
  providers: [TaskService<Task>],
})
export class TaskListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['title', 'description', 'status', 'option'];
  dataSource: Task[] = [];
  protected stop$ = new Subject();

  constructor(
    @Inject(TaskService) private taskService: TaskService<Task>,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  ngOnDestroy(): void {
    this.stop$.next(null);
    this.stop$.complete();
  }

  private getList(): void {
    this.taskService
      .list<Task>()
      .pipe(
        takeUntil(this.stop$),
        tap((response) => (this.dataSource = response as Task[]))
      )
      .subscribe();
  }

  protected openEditModal($event: Event, task: Task) {
    if ($event) $event.stopPropagation();

    const dialogRef = this.dialog.open(TaskFormComponent, {
      data: {
        ...task,
      },
      panelClass: 'dialog-responsive',
    });

    dialogRef.afterClosed().subscribe(() => this.getList());
  }

  protected handleToggle({ isCompleted, ..._task }: Task): void {
    this.taskService
      .update<Task>(_task.id!, { isCompleted: !isCompleted, ..._task })
      .pipe(
        take(1),
        tap(() => showSnackBar(this.snackBar, '¡Tarea actualizada!'))
      )
      .subscribe();
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
