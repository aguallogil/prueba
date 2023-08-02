import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarTemplateComponent } from './nav-bar-template.component';

describe('NavBarTemplateComponent', () => {
  let component: NavBarTemplateComponent;
  let fixture: ComponentFixture<NavBarTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavBarTemplateComponent]
    });
    fixture = TestBed.createComponent(NavBarTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
