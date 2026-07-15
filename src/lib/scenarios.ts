import type { ProjectionInputs } from './types';

export type ScenarioMap = Record<string, ProjectionInputs>;

export const STORAGE_KEY = 'smartinsuredreserve:scenarios';

function getStorage(): Storage | null {
  const g = globalThis as { localStorage?: Storage };
  return g.localStorage ?? null;
}

export function loadScenarios(): ScenarioMap {
  const storage = getStorage();
  if (!storage) return {};
  const raw = storage.getItem(STORAGE_KEY);
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as ScenarioMap;
    }
    return {};
  } catch {
    return {};
  }
}

export function saveScenario(name: string, inputs: ProjectionInputs): void {
  const storage = getStorage();
  if (!storage) return;
  const scenarios = loadScenarios();
  scenarios[name] = inputs;
  storage.setItem(STORAGE_KEY, JSON.stringify(scenarios));
}

export function deleteScenario(name: string): void {
  const storage = getStorage();
  if (!storage) return;
  const scenarios = loadScenarios();
  if (!(name in scenarios)) return;
  delete scenarios[name];
  storage.setItem(STORAGE_KEY, JSON.stringify(scenarios));
}

export function exportScenarioAsJson(inputs: ProjectionInputs): string {
  return JSON.stringify(inputs, null, 2);
}

const projectionInputKeys: (keyof ProjectionInputs)[] = [
  'autoPremium250',
  'autoPremium500',
  'autoPremium1000',
  'autoInflation',
  'autoCurrentDeductible',
  'homePremium500',
  'homePremium1000',
  'homePremium5000',
  'homeInflation',
  'homeCurrentDeductible',
  'currentReserve',
  'reserveReturn',
  'reserveContribution',
  'years',
];

export function importScenarioFromJson(json: string): ProjectionInputs | null {
  try {
    const parsed: unknown = JSON.parse(json);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return null;

    const candidate = parsed as Record<string, unknown>;
    if (!projectionInputKeys.every((key) => typeof candidate[key] === 'number' && Number.isFinite(candidate[key]))) {
      return null;
    }

    return candidate as unknown as ProjectionInputs;
  } catch {
    return null;
  }
}
