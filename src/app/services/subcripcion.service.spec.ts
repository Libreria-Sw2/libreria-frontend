import { TestBed } from '@angular/core/testing';

import { SubcripcionService } from './subcripcion.service';

describe('SubcripcionService', () => {
  let service: SubcripcionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubcripcionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
