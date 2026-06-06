import {
  saveScenario,
  loadScenarios,
  deleteScenario,
  exportScenarioAsJson,
  STORAGE_KEY,
} from '../src/lib/scenarios';
import type { ProjectionInputs } from '../src/lib/types';

function baseInputs(overrides: Partial<ProjectionInputs> = {}): ProjectionInputs {
  return {
    autoPremium250: 1900,
    autoPremium500: 1473,
    autoPremium1000: 1140,
    autoInflation: 3.0,
    autoCurrentDeductible: 250,

    homePremium500: 2400,
    homePremium1000: 1860,
    homePremium5000: 1440,
    homeInflation: 22.5,
    homeCurrentDeductible: 500,

    currentReserve: 0,
    reserveReturn: 4.5,
    reserveContribution: 0,

    years: 30,
    ...overrides,
  };
}

function createMockStorage(): Storage {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string): string | null => (key in store ? store[key] : null),
    setItem: (key: string, value: string): void => {
      store[key] = String(value);
    },
    removeItem: (key: string): void => {
      delete store[key];
    },
    clear: (): void => {
      store = {};
    },
    key: (i: number): string | null => Object.keys(store)[i] ?? null,
    get length(): number {
      return Object.keys(store).length;
    },
  };
}

beforeEach(() => {
  (globalThis as { localStorage?: Storage }).localStorage = createMockStorage();
});

afterEach(() => {
  delete (globalThis as { localStorage?: Storage }).localStorage;
});

describe('scenarios', () => {
  test('save/load round-trip preserves the inputs', () => {
    const inputs = baseInputs({ years: 25, currentReserve: 1500 });
    saveScenario('baseline', inputs);
    const loaded = loadScenarios();
    expect(loaded.baseline).toEqual(inputs);
  });

  test('loadScenarios returns multiple saved entries', () => {
    saveScenario('a', baseInputs({ years: 10 }));
    saveScenario('b', baseInputs({ years: 20 }));
    const loaded = loadScenarios();
    expect(Object.keys(loaded).sort()).toEqual(['a', 'b']);
    expect(loaded.a.years).toBe(10);
    expect(loaded.b.years).toBe(20);
  });

  test('deleteScenario removes the named key', () => {
    saveScenario('keep', baseInputs());
    saveScenario('drop', baseInputs());
    deleteScenario('drop');
    const loaded = loadScenarios();
    expect(loaded.drop).toBeUndefined();
    expect(loaded.keep).toBeDefined();
  });

  test('exportScenarioAsJson produces parseable JSON matching the input', () => {
    const inputs = baseInputs({ reserveReturn: 5.25 });
    const json = exportScenarioAsJson(inputs);
    expect(typeof json).toBe('string');
    expect(() => JSON.parse(json)).not.toThrow();
    expect(JSON.parse(json)).toEqual(inputs);
  });

  test('loadScenarios returns empty object when storage is empty', () => {
    expect(loadScenarios()).toEqual({});
  });

  test('loadScenarios is resilient to corrupt JSON', () => {
    (globalThis as { localStorage?: Storage }).localStorage!.setItem(STORAGE_KEY, 'not-json');
    expect(loadScenarios()).toEqual({});
  });
});
