import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { TaskService } from '../../services/task/task.service';
import { Task } from '../../../shared/classes/Task.class';
import { Observable, map, of, tap } from 'rxjs';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  const tasksMock: Task[] = [
    {
      id: 'LpWnRtlbUdc33o3Ih5ZY',
      createdAt: '1694674453597',
      description:
        'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.',
      title: 'Where does it come from?',
      isCompleted: false,
      updatedAt: '1694725216717',
    },
    {
      id: 'PJEMW8RYJHsFwBtZZi6z',
      createdAt: '1694674465536',
      description:
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
      title: 'Where can I get some?',
      isCompleted: true,
      updatedAt: '1694755029652',
    },
    {
      id: 'PQIc81GSgYwfrFh2U1IW',
      createdAt: '1694792186448',
      description: '',
      title: '',
      isCompleted: true,
      updatedAt: '1694792197288',
    },
    {
      id: 'nL69dRR9S1kcKJJoYhUU',
      createdAt: '1694710896986',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      title: 'What is Lorem Ipsum?',
      isCompleted: true,
      updatedAt: '1694731701362',
    },
  ];
  let tasks$: Observable<Task[]>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskService<Task>],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    tasks$ = of(tasksMock);

    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should match snapshot', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled).toMatchSnapshot();
  });

  test('should get task list', () => {
    tasks$.subscribe((data) => {
      expect(data).toBe(tasksMock);
    });

    tasks$
      .pipe(
        map((tasks) => tasks.filter((task: Task) => task.isCompleted)),
        tap((tasks: Task[]) =>
          tasks.forEach((task: Task) => {
            expect(task.isCompleted).toBeTruthy();
          })
        )
      )
      .subscribe();
  });

  test('should get a task list completed', () => {
    tasks$
      .pipe(
        map((tasks: Task[]) => tasks.filter((task: Task) => task.isCompleted)),
        tap((tasks: Task[]) =>
          tasks.forEach((task: Task) => expect(task.isCompleted).toBeTruthy())
        )
      )
      .subscribe();
  });
});
