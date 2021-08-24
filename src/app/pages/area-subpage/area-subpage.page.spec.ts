import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaSubPage } from './area-subpage.page';

describe('AboutPage', () => {
  let component: AreaSubPage;
  let fixture: ComponentFixture<AreaSubPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaSubPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaSubPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
