import { TestBed } from '@angular/core/testing';

import { CreacionLibroService } from './creacion-libro.service';

describe('CreacionLibroService', () => {
  let service: CreacionLibroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreacionLibroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
