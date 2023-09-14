import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import {
  SERVER_DOMAIN,
  TASK_MODEL,
} from 'src/app/shared/constants/urls.constants';
import { Task } from 'src/app/shared/classes/Task.class';

@Injectable({
  providedIn: 'root',
})
export class TaskService<T extends Task> extends BaseService<T> {
  constructor(protected override readonly _httpClient: HttpClient) {
    super(_httpClient);
  }

  public create<T>(model: T): Observable<unknown> {
    return this._create<T>(`${SERVER_DOMAIN}/${TASK_MODEL}`, model);
  }

  public update<T>(id: string, model: T): Observable<unknown> {
    return this._update(`${SERVER_DOMAIN}/${TASK_MODEL}`, id, model);
  }

  public list<T>() {
    return this._list<T>(`${SERVER_DOMAIN}/${TASK_MODEL}`);
  }

  public delete<T>(id: string) {
    return this._delete<T>(`${SERVER_DOMAIN}/${TASK_MODEL}/${id}`);
  }
}
