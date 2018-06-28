import { TestBed, inject } from '@angular/core/testing';

import { MascotaService } from './mascota.service';

describe('MascotaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MascotaService]
    });
  });

  it('should be created', inject([MascotaService], (service: MascotaService) => {
    expect(service).toBeTruthy();
  }));
});
