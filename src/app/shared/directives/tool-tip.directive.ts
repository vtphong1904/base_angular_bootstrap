import {AfterViewInit, Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appToolTip]'
})
export class ToolTipDirective implements AfterViewInit{

  constructor(private elementRef: ElementRef<HTMLElement>) { }

  ngAfterViewInit(): void {
    const element = this.elementRef.nativeElement;
    element.style.display = 'block';
    element.style.textOverflow = 'ellipsis';
    element.style.whiteSpace = 'nowrap';
    element.style.overflow = 'hidden';
  }
  @HostListener('mouseenter', ['$event'])
  setTooltipState(): void {
    const element = this.elementRef.nativeElement;
    if (element.offsetWidth < element.scrollWidth) {
    }
  }

}
