import { TestBed } from '@angular/core/testing';

import { NgShortcutsService } from './ng-shortcuts.service';

describe('NgShortcutsService', () => {
  let service: NgShortcutsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgShortcutsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
