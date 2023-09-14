import { Injectable } from '@angular/core';
import { Store } from './store';

@Injectable({
  providedIn: 'root',
})
export class TaskStore<T> extends Store<T> {
  constructor() {
    super([]);
  }

  public init(t: T[]): void {
    this.setState({ tasks: [] });
  }

  public reAssign(t: T[]): void {
    this.setState({
      ...this.state,
      tasks: t,
    });
  }

  public reset(): void {
    this.setState({ tasks: [] });
  }
}
