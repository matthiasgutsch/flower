import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaProductsPage } from './area-products.page';

describe('AboutPage', () => {
  let component: AreaProductsPage;
  let fixture: ComponentFixture<AreaProductsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaProductsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
