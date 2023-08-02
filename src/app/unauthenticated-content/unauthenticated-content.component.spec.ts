import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthenticatedContentComponent } from './unauthenticated-content.component';

describe('UnauthenticatedContentComponent', () => {
  let component: UnauthenticatedContentComponent;
  let fixture: ComponentFixture<UnauthenticatedContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnauthenticatedContentComponent]
    });
    fixture = TestBed.createComponent(UnauthenticatedContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
