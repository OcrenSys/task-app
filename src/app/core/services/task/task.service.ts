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

@Injectable({
  providedIn: 'root',
})
export class TaskService extends BaseService<any> {
  constructor(protected override readonly _httpClient: HttpClient) {
    super(_httpClient);
  }

  public create(model: Task): Observable<unknown> {
    return this._create(`${SERVER_DOMAIN}/${TASK_MODEL}`, model);
  }

  public update(model: Task): Observable<unknown> {
    return this._update(`${SERVER_DOMAIN}/${TASK_MODEL}`, model);
  }

  public list() {
    return this._list(`${SERVER_DOMAIN}/${TASK_MODEL}`);
  }

  public delete(id: number) {
    return this._delete(`${SERVER_DOMAIN}/${TASK_MODEL}/${id}`);
  }
}
