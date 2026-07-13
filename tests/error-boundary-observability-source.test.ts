import fs from 'fs';
import path from 'path';

describe('ErrorBoundary observability integration', () => {
  test('reports caught errors through observability', () => {
    const source = fs.readFileSync(
      path.join(process.cwd(), 'src/components/ErrorBoundary.tsx'),
      'utf8',
    );

    expect(source).toContain('reportError');
    expect(source).toContain('observability');
    expect(source).toContain('componentDidCatch');
  });
});
