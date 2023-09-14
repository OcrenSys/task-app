import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Task } from 'src/app/shared/classes/Task.class';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { TruncatePipe } from 'src/app/shared/pipes/truncate/truncate.pipe';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { AsyncPipe, NgFor } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { TaskStore } from '../../store/task.store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'task-list',
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
    MatListModule,
    NgFor,
    AsyncPipe,
  ],
  providers: [TaskStore<Task>],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit, OnDestroy, OnChanges {
  protected tasks$: Observable<Task[]> = new Observable<Task[]>();
  private subscription: Subscription | undefined;

  constructor(
    private taskStore: TaskStore<Task>,
    private cdr: ChangeDetectorRef
  ) {
    this.taskStore.store().subscribe({
      next: (tasks: Task[]) => {
        console.log('taskStore suscribed...', tasks);
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.log('taskStore suscribed error...', error);
      },
      complete: () => {
        console.log('taskStore suscribed completed...');
      },
    });
  }

  ngOnInit(): void {
    this.tasks$ = this.taskStore.store();
    // console.log(this.taskStore.state);
  }

  ngOnChanges() {}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}