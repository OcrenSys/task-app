import { OnInit } from '@angular/core';
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[strikethrough]',
  standalone: true,
})
export class StrikethroughDirective implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.elementRef.nativeElement.style.textDecoration = 'line-through';
  }
}
