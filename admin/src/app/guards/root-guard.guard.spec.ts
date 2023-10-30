import { TestBed } from '@angular/core/testing';

import { RootGuardGuard } from './root-guard.guard';

describe('RootGuardGuard', () => {
  let guard: RootGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RootGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
