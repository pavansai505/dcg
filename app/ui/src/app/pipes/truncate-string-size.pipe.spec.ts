import { TruncateStringSizePipe } from './truncate-string-size.pipe';

describe('TruncateStringSizePipe', () => {
  it('create an instance', () => {
    const pipe = new TruncateStringSizePipe();
    expect(pipe).toBeTruthy();
  });
});
