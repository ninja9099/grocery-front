import {Pipe, PipeTransform} from '@angular/core';
import {DecimalPipe} from '@angular/common';

@Pipe({
  name: 'twodigit'
})
export class TwoDigitPipe implements PipeTransform {
  constructor(private decimalPipe: DecimalPipe) {}
  transform(value: number): string|null {
    if (typeof(value) === 'number') {
        if(value > 1e10) {
            return value.toPrecision(3);
          } else {
            return this.decimalPipe.transform(value, '1.2-2');
          }
    }
    return '';
  }
}
