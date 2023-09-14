import { Component, Inject, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Params } from '@angular/router';
import { Task } from 'src/app/shared/classes/Task.class';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, Location } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormComponent } from 'src/app/core/components/form/form.component';
import { showSnackBar } from '../../shared/utilities/helpers';
import { DialogConfirmationComponent } from 'src/app/core/components/dialog-confirmation/dialog-confirmation.component';
import { TaskService } from 'src/app/core/services/task/task.service';
import { tap } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  standalone: true,
  imports: [
    HttpClientModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressBarModule,
    MatIconModule,
    CommonModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  providers: [TaskService<Task>],
})
export class DetailsComponent implements OnInit {
  protected task: Task | undefined = undefined;

  constructor(
    @Inject(TaskService) private readonly taskService: TaskService<Task>,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
    private readonly activatedRoute: ActivatedRoute,
    private readonly location: Location
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.task = JSON.parse(params['task']) || null;
    });
  }

  protected openDeleteConfirmationDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(({ confirmed }) => {
      if (confirmed) {
        this.onDelete();
      }
    });
  }

  private onDelete(): void {
    this.taskService
      .delete<Task>(this.task?.id!)
      .pipe(tap(() => showSnackBar(this.snackBar, '¡Tarea eliminada!')))
      .pipe(tap(() => this.onBack()))
      .subscribe();
  }

  protected onBack(): void {
    this.location.back();
  }

  protected openEditModal($event: Event) {
    if ($event) $event.stopPropagation();

    const dialogRef = this.dialog.open(FormComponent, {
      data: {
        ...this.task,
      },
      panelClass: 'dialog-responsive',
    });

    dialogRef.afterClosed().subscribe((task) => {
      if (task) {
        this.task = task;
        showSnackBar(this.snackBar, '¡Tarea actualizada!');
      }
    });
  }
}
