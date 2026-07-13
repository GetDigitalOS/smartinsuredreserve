import * as fs from 'fs';
import * as path from 'path';

describe('App Entrypoint Source', () => {
  it('should wire global error handlers', () => {
    const appSourcePath = path.join(__dirname, '../pages/_app.tsx');
    const source = fs.readFileSync(appSourcePath, 'utf-8');
    
    expect(source).toContain('installGlobalErrorHandlers');
    expect(source).toContain('observability');
    expect(source).toContain('useEffect');
  });
});
