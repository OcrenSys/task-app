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
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '../../services/task/task.service';
import { Observable, tap, take, Subject } from 'rxjs';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
  ],
})
export class TaskFormComponent implements OnInit, OnChanges {
  protected form = this.fb.group({
    title: [''],
    description: [''],
    isCompleted: [true],
  });

  constructor(
    private dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private fb: FormBuilder,
    private taskService: TaskService
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
    this.handleAction(this.form.value as Task)
      .pipe(
        take(1),
        tap((response) => console.log(response)),
        tap(() => this.dialogRef.close(this.form.value))
      )
      .subscribe();
  }

  private handleAction(task: Task): Observable<unknown> {
    if (this.data.id) {
      return this.taskService.update(task);
    } else {
      return this.taskService.create(task);
    }
  }
}
