import { TestBed, inject } from '@angular/core/testing';

import { MemosService } from './memos.service';

describe('MemosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemosService]
    });
  });

  it('should be created', inject([MemosService], (service: MemosService) => {
    expect(service).toBeTruthy();
  }));
});
