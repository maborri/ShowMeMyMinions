import { TestBed, inject } from '@angular/core/testing';

import { GetUserIdService } from './get-user-id.service';

describe('GetUserIdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetUserIdService]
    });
  });

  it('should be created', inject([GetUserIdService], (service: GetUserIdService) => {
    expect(service).toBeTruthy();
  }));
});
