import { UI_MESSAGES } from '../src/lib/messages';

describe('UI_MESSAGES', () => {
  it('has exactly 5 keys', () => {
    expect(Object.keys(UI_MESSAGES).length).toBe(5);
  });

  it('errorTitle is a non-empty string', () => {
    expect(typeof UI_MESSAGES.errorTitle).toBe('string');
    expect(UI_MESSAGES.errorTitle.length).toBeGreaterThan(0);
  });

  it('errorBody is a non-empty string', () => {
    expect(typeof UI_MESSAGES.errorBody).toBe('string');
    expect(UI_MESSAGES.errorBody.length).toBeGreaterThan(0);
  });

  it('loading is a non-empty string containing "Loading"', () => {
    expect(typeof UI_MESSAGES.loading).toBe('string');
    expect(UI_MESSAGES.loading.length).toBeGreaterThan(0);
    expect(UI_MESSAGES.loading).toContain('Loading');
  });

  it('firstUse is a non-empty string', () => {
    expect(typeof UI_MESSAGES.firstUse).toBe('string');
    expect(UI_MESSAGES.firstUse.length).toBeGreaterThan(0);
  });

  it('noScenarios is a non-empty string', () => {
    expect(typeof UI_MESSAGES.noScenarios).toBe('string');
    expect(UI_MESSAGES.noScenarios.length).toBeGreaterThan(0);
  });
});
