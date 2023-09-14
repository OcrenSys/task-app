import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[highlight]',
  standalone: true,
})
export class HighlightDirective {
  @Input('highlightColor') highlightColor: string = '#ffffff';
  private defaultBackground: string = '#ffffff';

  constructor(private elementRef: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor || this.defaultBackground);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(this.defaultBackground);
  }

  private highlight(color: string) {
    this.elementRef.nativeElement.style.backgroundColor = color;
    this.elementRef.nativeElement.style.cursor = 'pointer';
  }
}
