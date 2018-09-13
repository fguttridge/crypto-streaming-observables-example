import { TestBed } from '@angular/core/testing';

import { MarketUpdatesService } from './market-updates.service';

describe('MarketUpdatesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MarketUpdatesService = TestBed.get(MarketUpdatesService);
    expect(service).toBeTruthy();
  });
});
