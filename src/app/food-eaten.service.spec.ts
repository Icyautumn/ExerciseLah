import { TestBed } from '@angular/core/testing';

import { FoodEatenService } from './food-eaten.service';

describe('FoodEatenService', () => {
  let service: FoodEatenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodEatenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
