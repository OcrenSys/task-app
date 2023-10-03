import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { AsyncPipe, NgFor } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { Observable, map, tap } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StrikethroughDirective } from '../../directives/strikethrough/strikethrough.directive';
import { TruncatePipe } from '../../../shared/pipes/truncate/truncate.pipe';
import { TaskStore } from '../../store/task.store';
import { Task } from '../../../shared/classes/Task.class';

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
    MatDividerModule,
    NgFor,
    AsyncPipe,
    StrikethroughDirective,
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  protected tasks$: Observable<Task[]> = new Observable<Task[]>();
  protected count: number = 0;
  protected total: number = 0;

  constructor(private taskStore: TaskStore<Task>) {}

  ngOnInit(): void {
    this.tasks$ = this.taskStore.store().pipe(
      tap((task) => (this.total = task.length)),
      map((tasks) => tasks.filter((task: Task) => task.isCompleted)),
      tap((task) => (this.count = task.length))
    );
  }

  taskTrackBy(index: number, task: Task) {
    return task.id;
  }
}
