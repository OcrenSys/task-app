import {
  Component,
  Inject,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { Task } from 'src/app/shared/types/Task';
import { FormBuilder } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '../../services/task/task.service';
import { Observable, tap, take } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { showSnackBar } from 'src/app/shared/utilities/helpers';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
  standalone: true,
  imports: [
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  providers: [TaskService<Task>],
})
export class TaskFormComponent implements OnInit, OnChanges {
  private _snackbarMessage = '';
  protected form = this.fb.group({
    title: [''],
    description: [''],
    isCompleted: [false],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Task,
    @Inject(TaskService) private taskService: TaskService<Task>,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskFormComponent>,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form.patchValue(this.data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
  protected onCancel(): void {
    this.dialogRef.close();
  }

  protected onSubmit(): void {
    this.dialogRef.close(this.form.value);

    this.handleAction(this.form.value as Task)
      .pipe(
        take(1),
        tap(() => {
          showSnackBar(this.snackBar, this._snackbarMessage);
          this._snackbarMessage = '';
        }),
        tap(() => this.dialogRef.close({ ...this.data, ...this.form.value }))
      )
      .subscribe();
  }

  private handleAction(task: Task): Observable<unknown> {
    if (this.data.id) {
      this._snackbarMessage = '¡Tarea Actualizada!';
      return this.taskService.update<Task>(this.data.id, task);
    } else {
      this._snackbarMessage = '¡Tarea Agregada!';
      return this.taskService.create<Task>(task);
    }
  }
}
