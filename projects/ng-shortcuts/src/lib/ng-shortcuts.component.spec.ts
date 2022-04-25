import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgShortcutsComponent } from './ng-shortcuts.component';

describe('NgShortcutsComponent', () => {
  let component: NgShortcutsComponent;
  let fixture: ComponentFixture<NgShortcutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgShortcutsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgShortcutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
