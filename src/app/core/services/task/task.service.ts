import { Injectable } from '@angular/core';
import { IBaseService } from '../../../shared/types/base.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import {
  SERVER_DOMAIN,
  TASK_MODEL,
} from 'src/app/shared/constants/urls.constants';
import { Task } from 'src/app/shared/types/Task';
import { API_V1 } from '../../../shared/constants/urls.constants';

@Injectable({
  providedIn: 'root',
})
export class TaskService<T> extends BaseService<T> {
  constructor(protected override readonly _httpClient: HttpClient) {
    super(_httpClient);
  }

  public create<T>(model: T): Observable<unknown> {
    return this._create<T>(`${SERVER_DOMAIN}/${API_V1}/${TASK_MODEL}`, model);
  }

  public update<T>(model: T): Observable<unknown> {
    return this._update<T>(`${SERVER_DOMAIN}/${API_V1}/${TASK_MODEL}`, model);
  }

  public list<T>() {
    return this._list<T>(`${SERVER_DOMAIN}/${API_V1}/${TASK_MODEL}`);
  }

  public delete<T>(id: number) {
    return this._delete<T>(`${SERVER_DOMAIN}/${API_V1}/${TASK_MODEL}/${id}`);
  }
}
