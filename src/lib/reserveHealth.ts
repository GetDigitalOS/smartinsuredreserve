export function classifyReserveHealth(
  coverageRatio: number
): 'under' | 'adequate' | 'strong' {
  if (coverageRatio < 1) {
    return 'under';
  }

  if (coverageRatio < 2) {
    return 'adequate';
  }

  return 'strong';
}
