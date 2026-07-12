import fs from 'fs';
import path from 'path';

describe('ProjectionTable currency formatting source', () => {
  test('uses shared formatCurrency helper instead of inline locale formatting', () => {
    const source = fs.readFileSync(path.join(process.cwd(), 'src/components/ProjectionTable.tsx'), 'utf8');

    expect(source).toContain('formatCurrency');
    expect(source).toContain('../lib/format');
    expect(source).not.toContain('toLocaleString');
  });
});
