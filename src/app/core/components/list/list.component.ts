import { Component, OnInit } from '@angular/core';
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
import { Observable } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';

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
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  protected tasks$: Observable<Task[]> = new Observable<Task[]>();

  constructor(private taskStore: TaskStore<Task>) {}

  ngOnInit(): void {
    this.tasks$ = this.taskStore.store();
  }
}
