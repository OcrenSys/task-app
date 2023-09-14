import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormComponent } from 'src/app/core/components/form/form.component';
import { NavbarComponent } from 'src/app/core/components/navbar/navbar.component';
import { TableComponent as TaskTable } from 'src/app/core/components/table/table.component';
import { ListComponent as TaskList } from 'src/app/core/components/list/list.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    NavbarComponent,
    FormComponent,
    MatDialogModule,
    MatCardModule,
    TaskTable,
    TaskList,
  ],
})
export class ListComponent {
  constructor() {}
}
