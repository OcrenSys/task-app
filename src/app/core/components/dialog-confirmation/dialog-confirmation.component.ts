import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.css'],
  standalone: true,
  imports: [MatCardModule, MatDividerModule, MatButtonModule, MatIconModule],
})
export class DialogConfirmationComponent {
  constructor(private dialogRef: MatDialogRef<DialogConfirmationComponent>) {}

  protected onCancel(): void {
    this.dialogRef.close({ confirmed: false });
  }

  protected onDelete(): void {
    this.dialogRef.close({ confirmed: true });
  }
}
