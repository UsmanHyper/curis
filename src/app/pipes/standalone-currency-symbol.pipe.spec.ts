import { StandaloneCurrencySymbolPipe } from './standalone-currency-symbol.pipe';

describe('StandaloneCurrencySymbolPipe', () => {
  it('create an instance', () => {
    const pipe = new StandaloneCurrencySymbolPipe();
    expect(pipe).toBeTruthy();
  });
});
