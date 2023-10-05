import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Subject, take, takeUntil, tap, map } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { showSnackBar, sorted } from '../../../shared/utilities/helpers';
import { FormComponent } from '../form/form.component';
import { TaskStore } from '../../store/task.store';
import { HighlightDirective } from '../../directives/highlight/highlight.directive';
import { StrikethroughDirective } from '../../directives/strikethrough/strikethrough.directive';
import { TaskService } from '../../services/task/task.service';
import { TruncatePipe } from '../../../shared/pipes/truncate/truncate.pipe';
import { Task } from '../../../shared/classes/Task.class';

@Component({
  selector: 'task-table',
  standalone: true,
  imports: [
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    TruncatePipe,
    MatCardModule,
    MatSnackBarModule,
    HighlightDirective,
    StrikethroughDirective,
  ],
  providers: [TaskService<Task>],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['title', 'description', 'status', 'option'];
  dataSource: Task[] = [];
  protected unsuscribe$ = new Subject();

  constructor(
    @Inject(TaskService) private taskService: TaskService<Task>,
    private taskStore: TaskStore<Task>,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  ngOnDestroy(): void {
    this.unsuscribe$.next(null);
    this.unsuscribe$.complete();
  }

  private getList(): void {
    this.taskService
      .list<Task>()
      .pipe(
        takeUntil(this.unsuscribe$),
        map((response) => sorted(response as Task[])),
        tap((response) => (this.dataSource = response as Task[]))
      )
      .subscribe({
        next: () => {},
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this.reAsssigningCompletedTasks();
        },
      });
  }

  protected openCreateModal() {
    const dialogRef = this.dialog.open(FormComponent, {
      data: {
        title: '',
        description: '',
      },
      panelClass: 'dialog-responsive',
    });

    dialogRef.afterClosed().subscribe(() => this.getList());
  }

  protected openEditModal($event: Event, task: Task) {
    if ($event) $event.stopPropagation();

    const dialogRef = this.dialog.open(FormComponent, {
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
      .subscribe({
        next: () => {
          this.getList();
        },
      });
  }

  protected navigateToDetails(task: Task): void {
    const extras: NavigationExtras = {
      queryParams: {
        task: JSON.stringify(task),
      },
    };
    this.router.navigate(['details'], extras);
  }

  private reAsssigningCompletedTasks(): void {
    const _tasks: Task[] = this.dataSource;
    this.taskStore.reAssign(_tasks);
  }
}
