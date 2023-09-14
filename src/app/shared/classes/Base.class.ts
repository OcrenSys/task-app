import { Observable } from 'rxjs';

export abstract class IBaseService<T> {
  constructor() {}

  protected abstract _create(
    url: string,
    model: T,
    option: unknown
  ): Observable<unknown>;

  protected abstract _update(
    url: string,
    id: string,
    model: T,
    option: unknown
  ): Observable<unknown>;

  protected abstract _list(
    url: string,
    parameters: unknown
  ): Observable<unknown>;

  protected abstract _delete(
    url: string,
    parameters: unknown
  ): Observable<unknown>;
}
