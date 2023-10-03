import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmationComponent } from './dialog-confirmation.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef } from '@angular/material/dialog';

describe('DialogConfirmationComponent', () => {
  let component: DialogConfirmationComponent;
  let fixture: ComponentFixture<DialogConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DialogConfirmationComponent,
        MatCardModule,
        MatDividerModule,
        MatButtonModule,
        MatIconModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfirmationComponent);
    component = fixture?.componentInstance;
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should match with snapshot', () => {
    const compile = fixture?.nativeElement as HTMLElement;
    expect(compile).toMatchSnapshot();
  });
});
