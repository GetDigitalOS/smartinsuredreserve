import { debounce } from '../src/lib/debounce';

describe('debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('does not call fn synchronously', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 100);
    debounced('a');
    expect(fn).not.toHaveBeenCalled();
  });

  it('calls fn once after waitMs has elapsed', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 100);
    debounced('a');
    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('coalesces multiple rapid calls into one invocation', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 100);
    debounced('a');
    debounced('b');
    debounced('c');
    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('calls fn with arguments from the most recent call', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 100);
    debounced('first');
    debounced('second');
    debounced('third');
    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledWith('third');
  });
});
