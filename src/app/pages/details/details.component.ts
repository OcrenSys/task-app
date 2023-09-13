import { Component, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Params } from '@angular/router';
import { Task } from 'src/app/shared/types/Task';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],

  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressBarModule,
    MatIconModule,
  ],
})
export class DetailsComponent implements OnInit {
  protected task: Task | undefined = undefined;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly location: Location
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.task = JSON.parse(params['task']) || null;
    });
  }

  protected onBack(): void {
    this.location.back();
  }

  protected onEdit(): void {}

  protected onDelete(): void {}
}
