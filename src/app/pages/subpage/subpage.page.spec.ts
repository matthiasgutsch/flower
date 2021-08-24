import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubpagePage } from './subpage.page';

describe('SubpagePage', () => {
  let component: SubpagePage;
  let fixture: ComponentFixture<SubpagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubpagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
