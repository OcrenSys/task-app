import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBaseService } from '../../../shared/classes/Base.class';

export class BaseService<T> extends IBaseService<T> {
  constructor(protected readonly _httpClient: HttpClient) {
    super();
  }

  protected _create<T>(
    url: string,
    model: T,
  ): Observable<unknown> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );

    return this._httpClient.post<T>(
      url,
      JSON.stringify(model),
      {
        headers,
      } || {}
    );
  }

  protected _update<T>(
    url: string,
    id: string,
    model: T,
  ): Observable<unknown> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );

    return this._httpClient.put(
      `${url}/${id}`,
      JSON.stringify(model),
      {
        headers,
      } || {}
    );
  }

  protected _list<T>(url: string): Observable<unknown> {
    return this._httpClient.get(url);
  }

  protected _delete<T>(url: string): Observable<unknown> {
    return this._httpClient.delete(url);
  }
}
