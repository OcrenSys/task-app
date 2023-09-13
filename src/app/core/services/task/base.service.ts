import {
  HttpClient,
  HttpContext,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBaseService } from 'src/app/shared/types/base.interface';

export class BaseService<T> extends IBaseService<T> {
  constructor(protected readonly _httpClient: HttpClient) {
    super();
  }

  protected _create<T>(
    url: string,
    model: T,
    options?: any
  ): Observable<unknown> {
    return this._httpClient.post<T>(url, JSON.stringify(model), options || {});
  }

  protected _update<T>(
    url: string,
    model: T | null,
    options?: any
  ): Observable<unknown> {
    return this._httpClient.patch(url, JSON.stringify(model), options || {});
  }

  protected _list<T>(url: string): Observable<unknown> {
    return this._httpClient.get(url);
  }

  protected _delete<T>(url: string): Observable<unknown> {
    return this._httpClient.delete(url);
  }
}
