import { Pipe, PipeTransform } from '@angular/core';
import { isEmpty } from '../utils/utils';

@Pipe({
  name: 'indianCurrency'
})
export class IndiancurrencyPipe implements PipeTransform {

  transform(value: number, args?: string[]): any {

    if (!isNaN(value) && !isEmpty(value)) {
      var currencySymbol = '₹ ';
      //var output = Number(input).toLocaleString('en-IN');   <-- This method is not working fine in all browsers!           
      var result = value.toString().split('.');
      var lastThree = result[0].substring(result[0].length - 3);
      var otherNumbers = result[0].substring(0, result[0].length - 3);
      if (otherNumbers != '')
        lastThree = ',' + lastThree;
      var output = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

      if (result.length > 1) {
        output += "." + result[1];
      } else {
        output += ".00";
      }

      return currencySymbol + output;
    }

  }

}
