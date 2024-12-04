import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencySymbol',
  
})
export class CurrencySymbolPipe implements PipeTransform {
  private currencySymbols: { [key: string]: string } = {
    USD: '$ ',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    INR: '₹',
    // Add more currency codes and symbols as needed
  };

  transform(value: number, currencyCode: string = 'USD'): string {
    const symbol = this.currencySymbols[currencyCode] || currencyCode;
    return `${symbol}${value}`;
  }

  // transform(value: number, currencyCode: string = 'USD', symbolPosition: 'before' | 'after' = 'before'): string {
  //   const symbol = this.currencySymbols[currencyCode] || currencyCode;

  //   // Place symbol before or after value
  //   return symbolPosition === 'after' ? `${value}${symbol}` : `${symbol}${value}`;
  // }
}
