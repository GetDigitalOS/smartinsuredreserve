import { ProjectionRow } from './types';
import { findReserveMilestones } from './reserveMilestones';

export function describeReserveMilestones(rows: ProjectionRow[], targets: number[]): string {
    const hits = findReserveMilestones(rows, targets);
    return targets.map(t => {
        if (hits[t] === null) {
            return `Target ${t}: not reached`;
        }
        return `Target ${t}: year ${hits[t]}`;
    }).join('; ');
}
