---
name: test
description: Create comprehensive tests for specified code
user-invocable: true
---

# Generate Tests

Create comprehensive tests for: $ARGUMENTS

## Instructions

1. **Check existing patterns** — Read existing test files to match conventions. If no test framework is configured, suggest adding Vitest + @testing-library/react.

2. **Place test files** adjacent to source as `[filename].test.ts(x)`.

3. **Write tests covering:**
   - Happy path — expected behavior
   - Edge cases — empty inputs, boundary values, zero/negative numbers
   - Error states — API failures, invalid data, network errors
   - User interactions — form submissions, button clicks, navigation

4. **Mock external dependencies:**
   - API calls — mock fetch/axios with realistic responses
   - React Router — wrap in MemoryRouter
   - Browser APIs — mock localStorage, window.location

5. **Test isolation:** No shared mutable state between tests.

6. **Run tests** after writing:
   ```bash
   npm run test -- --run [test-file-path]
   ```
