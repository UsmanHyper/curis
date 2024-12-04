import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencySymbol',
  standalone: true // Mark the pipe as standalone
})
export class StandaloneCurrencySymbolPipe implements PipeTransform {
  private currencySymbols: { [key: string]: string } = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    INR: '₹',
    // Add more currencies if needed
  };

  transform(value: number, currencyCode: string = 'USD', symbolPosition: 'before' | 'after' = 'before'): string {
    const symbol = this.currencySymbols[currencyCode] || currencyCode;
    return symbolPosition === 'after' ? `${value}${symbol}` : `${symbol}${value}`;
  }
}
