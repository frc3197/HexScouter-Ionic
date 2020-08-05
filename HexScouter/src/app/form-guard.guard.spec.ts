import { TestBed } from '@angular/core/testing';

import { FormGuardGuard } from './form-guard.guard';

describe('FormGuardGuard', () => {
  let guard: FormGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FormGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
