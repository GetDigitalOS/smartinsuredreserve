---
name: review
description: Review code for quality, accessibility, and security
user-invocable: true
---

# Code Review

Review the following code: $ARGUMENTS

## Checklist

### Accessibility
- [ ] Form inputs have associated labels and error messages
- [ ] Color contrast meets WCAG AA (4.5:1 text, 3:1 large)
- [ ] Interactive elements are keyboard accessible
- [ ] Images have descriptive alt text
- [ ] Focus management is correct for modals and dynamic content

### Security
- [ ] No hardcoded API keys or secrets
- [ ] User input is sanitized before display (no XSS via dangerouslySetInnerHTML)
- [ ] Form data validated before submission
- [ ] External API calls use HTTPS

### Performance
- [ ] No unnecessary re-renders on input changes
- [ ] Expensive calculations memoized (useMemo/useCallback)
- [ ] Images optimized and lazy loaded where appropriate
- [ ] Bundle size reasonable (no oversized dependencies)

### Code Quality
- [ ] Components follow single responsibility principle
- [ ] No unused imports or dead code
- [ ] Naming is clear and consistent
- [ ] Error states handled gracefully with user feedback
- [ ] Loading states shown during async operations

## Output Format
For each issue:
- **Severity:** Critical / Warning / Suggestion
- **Location:** file:line
- **Issue:** What is wrong
- **Fix:** How to resolve it
