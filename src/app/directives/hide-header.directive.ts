import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[hide-header]',
  host: {
    '(ionScroll)': 'onContentScroll($event)'
  }
})
export class HideHeaderDirective {

  @Input('header') header: HTMLElement;

  constructor() { 
    console.log("were here",this.header)
  }

  onContentScroll(event) {
    console.log(event);
  }
}
