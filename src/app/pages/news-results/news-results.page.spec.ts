import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsResultsPage } from './news-results.page';

describe('HomeResultsPage', () => {
  let component: NewsResultsPage;
  let fixture: ComponentFixture<NewsResultsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsResultsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsResultsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
