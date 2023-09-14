import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.css'],
  standalone: true,
  imports: [MatCardModule, MatDividerModule, MatButtonModule],
})
export class DialogConfirmationComponent {
  constructor(private dialogRef: MatDialogRef<DialogConfirmationComponent>) {}

  protected onCancel(): void {
    this.dialogRef.close(null);
  }

  protected onAccept(): void {
    this.dialogRef.close({confirmed: true});
  }
}
