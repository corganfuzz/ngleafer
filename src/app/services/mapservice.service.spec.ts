import { TestBed, inject } from '@angular/core/testing';

import { MapserviceService } from './mapservice.service';

describe('MapserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapserviceService]
    });
  });

  it('should be created', inject([MapserviceService], (service: MapserviceService) => {
    expect(service).toBeTruthy();
  }));
});
