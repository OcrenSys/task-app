import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import { Task } from 'src/app/shared/classes/Task.class';

describe('TaskService', () => {
  let service: TaskService<Task>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
