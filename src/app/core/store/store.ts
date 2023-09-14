import { BehaviorSubject, Observable } from 'rxjs';

export class Store<T> {
  observable: Observable<T[]>;
  public state$: BehaviorSubject<T[]>;

  constructor(initialState: T[]) {
    this.state$ = new BehaviorSubject<T[]>(initialState);
    this.observable = this.state$.asObservable();
  }

  public get state(): T[] {
    return this.state$.getValue();
  }

  protected setState(nextState: any): void {
    this.state$.next(nextState);
  }

  public store(): Observable<T[]> {
    return this.observable;
  }
}
