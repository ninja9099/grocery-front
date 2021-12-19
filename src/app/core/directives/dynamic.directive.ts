import { Directive, ViewContainerRef } from '@angular/core';
export interface ControlData {
  name?: string;
  type?: string;
  default?: string;
  comment?: string;
  options?: string[];
}
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[control]'
})

export class ControlDirective {
  constructor(
    public vcr: ViewContainerRef
  ) {
  }
}
