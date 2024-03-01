import { Directive, AfterViewInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]',
  standalone: true
})
export class AutofocusDirective implements AfterViewInit {

  constructor(private element: ElementRef<HTMLInputElement>) { }

  ngAfterViewInit(): void {
    this.element.nativeElement.focus();
  }
}
