import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { TableComponent } from './table.component';
import { TaskService } from '../../services/task/task.service';
import { Task } from '../../../shared/classes/Task.class';
import { HttpClientModule } from '@angular/common/http';
import { tap } from 'rxjs';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let taskService: TaskService<Task>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, HttpClientModule],
      providers: [TaskService<Task>, MatDialog],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should created service', () => {
    expect(taskService).toBeTruthy();
  });

  test('should every task instance of Task Entity', async () => {
    taskService
      .list<Task[]>()
      .pipe(
        tap((_tasks: Task[]) => {
          expect(_tasks.every((e) => e instanceof Task)).toBeTruthy();
        })
      )
      .subscribe();
  });

  test('should get task list with limit number', () => {
    const limit: number = 5;
    taskService
      .list<Task[]>()
      .pipe(
        tap((_tasks: Task[]) => _tasks.slice(0, limit)),
        tap((_tasks: Task[]) => {
          expect(_tasks.length).toBe(limit);
        })
      )
      .subscribe();
  });
});
