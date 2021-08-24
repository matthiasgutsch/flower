import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartupListComponent } from './startuplist.component';

describe('FooterComponent', () => {
  let component: StartupListComponent;
  let fixture: ComponentFixture<StartupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartupListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
