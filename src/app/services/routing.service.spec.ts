import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';

import { RoutingService } from './routing.service';

describe('RoutingService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule]
  }));

  it('should be created', () => {
    const service: RoutingService = TestBed.get(RoutingService);
    expect(service).toBeTruthy();
  });
});
