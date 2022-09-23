import { TestBed } from '@angular/core/testing';

import { DeviceIdInterceptorService } from './device-id-interceptor.service';

describe('DeviceIdInterceptorService', () => {
  let service: DeviceIdInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceIdInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
