import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionMainComponent } from './session-main.component';

describe('SessionMainComponent', () => {
  let component: SessionMainComponent;
  let fixture: ComponentFixture<SessionMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
