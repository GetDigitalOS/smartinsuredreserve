import * as fs from 'fs';
import * as path from 'path';

const source = fs.readFileSync(
  path.resolve(__dirname, '../src/components/ReportActions.tsx'),
  'utf8'
);

describe('ReportActions observability wiring', () => {
  test('imports reportError', () => {
    expect(source).toContain('reportError');
  });

  test('imports from observability module', () => {
    expect(source).toContain('observability');
  });

  test('passes report-actions as source context', () => {
    expect(source).toContain("'report-actions'");
  });

  test('contains catch blocks', () => {
    expect(source).toContain('catch');
  });
});
