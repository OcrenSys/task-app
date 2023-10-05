import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Observable, take } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TaskService } from '../../services/task/task.service';
import { Task } from '../../../shared/classes/Task.class';
import { showSnackBar } from '../../../shared/utilities/helpers';

@Component({
  selector: 'app-form',
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
  providers: [TaskService<Task>, MatDialogModule, MatDialogRef<FormComponent>],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
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
    private dialogRef: MatDialogRef<FormComponent>,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form.patchValue(this.data);
  }

  protected onCancel(): void {
    this.dialogRef.close();
  }

  protected onSubmit(): void {
    this.handleAction(this.form.value as Task)
      .pipe(take(1))
      .subscribe({
        next: () => {
          showSnackBar(this.snackBar, this._snackbarMessage);
          this._snackbarMessage = '';
        },
        error: () => {
          showSnackBar(this.snackBar, 'Ocurrio un error');
          this._snackbarMessage = '';
        },
        complete: () => {
          this.dialogRef.close();
        },
      });
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
