import { TestBed, inject } from '@angular/core/testing';

import { SubTasksService } from './sub-tasks.service';

describe('SubTasksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubTasksService]
    });
  });

  it('should be created', inject([SubTasksService], (service: SubTasksService) => {
    expect(service).toBeTruthy();
  }));
});
