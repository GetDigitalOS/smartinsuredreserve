import { DEFAULT_PROJECTION_INPUTS } from '../src/lib/defaults';

describe('DEFAULT_PROJECTION_INPUTS', () => {
  it('has the correct number of fields', () => {
    expect(Object.keys(DEFAULT_PROJECTION_INPUTS).length).toBe(14);
  });

  it('has correct years value', () => {
    expect(DEFAULT_PROJECTION_INPUTS.years).toBe(30);
  });

  it('has correct homeInflation value', () => {
    expect(DEFAULT_PROJECTION_INPUTS.homeInflation).toBe(22.5);
  });

  it('has correct autoCurrentDeductible value', () => {
    expect(DEFAULT_PROJECTION_INPUTS.autoCurrentDeductible).toBe(250);
  });

  it('has correct reserveReturn value', () => {
    expect(DEFAULT_PROJECTION_INPUTS.reserveReturn).toBe(4.5);
  });
});
